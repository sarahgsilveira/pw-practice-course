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
 * Test Suite: Check Boxes
 * 
 * Actions:
 * - Select and unselect checkboxes, and verify their states.
 * 
 * Expected Results:
 * - All checkboxes should toggle between checked and unchecked states correctly.
 */
test('Check Boxes', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();

    // Action: Uncheck 'Hide on click', check 'Prevent arising of duplicate toast'
    await page.getByRole('checkbox', { name: "Hide on click" }).uncheck({ force: true });
    await page.getByRole('checkbox', { name: "Prevent arising of duplicate toast" }).check({ force: true });

    // Expected Results: Verify the state of all checkboxes
    const allBoxes = page.getByRole('checkbox');
    for (const box of await allBoxes.all()) {
        await box.check({ force: true });
        expect(await box.isChecked()).toBeTruthy();  // Change this to .toBeFalsy() for unchecked validation
    }
});
