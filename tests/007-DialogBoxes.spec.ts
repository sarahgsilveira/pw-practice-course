/* 
To run the tests, please initialize Playwright:
Initialize the Terminal > Run Task > and select NPM: START NG SERVE
*/

/*This imports Playwright's test and assertion library, enabling test case definitions and validation of expected outcomes.*/
import { test, expect } from '@playwright/test';

/**
 * Test Suite: Precondition Setup for All Tests
 * 
 * Preconditions:
 * - The webpage 'http://localhost:4200/' should be accessible and available for testing.
 * 
 * Actions:
 * - Navigate to the homepage for each test.
 * 
 * Expected Results:
 * - Each test begins at the homepage without errors.
 */
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
});

/**
 * Test Suite: Dialog Boxes
 * 
 * Actions:
 * - Interact with dialog boxes that belong to the browser.
 * 
 * Expected Results:
 * - Dialog boxes should display correctly and interactions (like deletion) should work as expected.
 */
test('Dialog Boxes', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    // Action: Handle dialog box confirmation for deletion
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?');
        dialog.accept();
    });
    await page.getByRole('table').locator('tr', { hasText: "mdo@gmail.com" }).locator('.nb-trash').click();

    // Expected Results: Verify that the row containing "mdo@gmail.com" is deleted
    await expect(page.locator('table tr').first()).not.toHaveText("mdo@gmail.com");
});

/**
 * Test Suite: Web Tables
 * 
 * Actions:
 * - Edit rows and validate table data.
 * 
 * Expected Results:
 * - Table rows should be editable and display the correct data after updates.
 */
test('Web Tables', async ({ page }) => {
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    // Action: Edit a row by email
    const targetRow = page.getByRole('row', { name: "twitter@outlook.com" });
    await targetRow.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder('Age').clear();
    await page.locator('input-editor').getByPlaceholder('Age').fill('35');
    await page.locator('.nb-checkmark').click();

    // Action: Validate edits made to rows
    const targetRowById = page.getByRole('row', { name: "11" }).filter({ has: page.locator('td').nth(1).getByText("11") });
    await targetRowById.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder('E-mail').clear();
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com');
    await page.locator('.nb-checkmark').click();

    // Expected Results: Verify email update in the row
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com');

    // Action: Filter table by ages and validate displayed data
    const ages = ["20", "30", "40", "200"];
    for (let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear();
        await page.locator('input-filter').getByPlaceholder('Age').fill(age);
        await page.waitForTimeout(500);

        const ageRows = page.locator('tbody tr');
        for (let row of await ageRows.all()) {
            const cellValue = await row.locator('td').last().textContent();
            if (age == "200") {
                expect(await page.getByRole('table').textContent()).toContain('No data found');
            } else {
                expect(cellValue).toEqual(age);
            }
        }
    }
});

/**
 * Test Suite: Datepicker
 * 
 * Actions:
 * - Select specific dates in the date picker.
 * 
 * Expected Results:
 * - The correct dates should be selectable and displayed in the input field.
 */
test('DatePicker', async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();

    // Action: Select a date
    const calendarInputField = page.getByPlaceholder('Form Picker');
    await calendarInputField.click();
    await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', { exact: true }).click();

    // Expected Results: The selected date should be displayed correctly
    await expect(calendarInputField).toHaveValue('Aug 1, 2024');
});

/**
 * Test Suite: Selecting Future Dates
 * 
 * Actions:
 * - Select future dates using the date picker.
 * 
 * Expected Results:
 * - The correct future dates should be selectable and displayed in the input field.
 */
test('Selecting Future Dates', async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();

    const calendarInputField = page.getByPlaceholder('Form Picker');
    await calendarInputField.click();

    // Action: Set a future date
    let date = new Date();
    date.setDate(date.getDate() + 1);
    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' });
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

    // Action: Navigate to the future month and select the date
    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
    const expectedMonthAndYear = ` ${expectedMonthShort} ${expectedYear}`;
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
    }
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click();

    // Expected Results: Verify the selected future date is displayed correctly
    await expect(calendarInputField).toHaveValue(dateToAssert);
});

/**
 * Test Suite: Sliders
 * 
 * Actions:
 * - Interact with sliders to change values.
 * 
 * Expected Results:
 * - The slider should move and reflect the correct value changes.
 */
test('Sliders', async ({ page }) => {
    // Action: Simulate actual mouse movements to interact with the temperature slider
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
    await tempBox.scrollIntoViewIfNeeded();

    const box = await tempBox.boundingBox();  // Get the X, Y coordinates of the slider
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;

    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + 100, y);
    await page.mouse.move(x + 100, y + 100);
    await page.mouse.up();

    // Expected Results: Validate the slider value
    await expect(tempBox).toContainText('30');
});
