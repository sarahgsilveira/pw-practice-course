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
    await expect(calendarInputField).toHaveValue('Oct 1, 2024');
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
