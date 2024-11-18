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
 * - Interact with input fields and validate form behavior.
 * 
 * Expected Results:
 * - Forms should allow proper interaction and display the correct input values.
 */
test.describe('Form Layouts Page', () => {

    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    });

test('Input Fields', async ({ page }) => {
    const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" });
    // Action: Fill email field, clear it, then simulate typing keystrokes
    await usingTheGridEmailInput.fill('danilo@gmail.com');
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially('danilo@gmail.com');

    // Expected Results: The email input should have the correct value
    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual('danilo@gmail.com');

    // Locator Assertion: Verify the email input field contains the correct value
    await expect(usingTheGridEmailInput).toHaveValue('danilo@gmail.com');
    });
});
