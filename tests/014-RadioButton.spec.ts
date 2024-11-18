/* 
To run the tests, please initialize Playwright:
Initialize the Terminal > Run Task > and select NPM: START NG SERVE
*/

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
 * Test Suite: Form Layouts Page
 * 
 * Actions:
 * - Navigate to the 'Forms' section and then to the 'Form Layouts' page.
 * - Interact with Radio Buttons and validate behavior.
 * 
 * Expected Results:
 * - Radio Button should allow proper interaction and display the correct selection.
 */
test.describe('Form Layouts Page', () => {

    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });

test('Selecting Radio Button', async ({ page }) => {
    const usingTheGridForm = page.locator('nb-card', { hasText: "Using the Grid" });

    // Action: Check Option 1 using .check({force:true})
    await usingTheGridForm.getByLabel('Option 1').check({ force: true });
    await usingTheGridForm.getByRole('radio', { name: "Option 1" }).check({ force: true });

    // Expected Results: Verify that Option 1 is checked
    const radioStatus = await usingTheGridForm.getByRole('radio', { name: "Option 1" }).isChecked();
    expect(radioStatus).toBeTruthy();

    // Locator Assertion: Verify Option 1 is checked
    await expect(usingTheGridForm.getByRole('radio', { name: "Option 1" })).toBeChecked();

    // Action: Select Option 2 and verify Option 1 is not selected
    await usingTheGridForm.getByLabel('Option 2').check({ force: true });
    expect(await usingTheGridForm.getByRole('radio', { name: "Option 1" }).isChecked()).toBeFalsy();
    expect(await usingTheGridForm.getByRole('radio', { name: "Option 2" }).isChecked()).toBeTruthy();

    });
});
