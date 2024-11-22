/* 
To run the tests, please initialize Playwright:
Initialize the Terminal > Run Task > and select NPM: START NG SERVE
*/

/* 
LOCATORS
Locators can be identified in the INSPECT tool of the webpage.
*/

/*This imports Playwright's test and assertion library, enabling test case definitions and validation of expected outcomes.*/
import { test, expect } from '@playwright/test'; 

/**
 * Test Suite: Locator Syntax Rules and Actions
 * 
 * Preconditions:
 * - The webpage 'http://localhost:4200/' should be accessible and available for testing.
 * 
 * Actions:
 * - Locate elements by various methods such as tag name, ID, class, attributes, etc.
 * - Click elements to test interactions.
 * 
 * Expected Results:
 * - Locators should work as expected and allow interaction with the elements.
 */

test.beforeEach(async ({ page }) => {
    // Action: Navigate to the homepage and open the 'Forms' section before each test.
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});

test('Locator Syntax Rules', async ({ page }) => {
    // Action: Locate by tag name
    await page.locator('input').first().click();

    // Action: Locate by ID
    page.locator('#inputEmail1');

    // Action: Locate by class value
    page.locator('.shape-rectangle nb-transition');

    // Action: Locate by attribute
    page.locator('[placeholder="Email"]');

    // Action: Locate by entire class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');

    // Action: Combine locators
    page.locator('input[placeholder="Email"][input]');

    // Action: Locate by XPath (not recommended)
    page.locator('//[@id="inputEmail"]');

    // Action: Locate by partial text match
    page.locator(':text("Using")');

    // Action: Locate by exact text match
    page.locator(':text-is("Using the Grid")');

    // Expected Results: All locators should successfully identify the elements.
});

/**
 * Test Suite: User Facing Locators
 * 
 * Actions:
 * - Use role-based locators to interact with form fields, buttons, etc.
 * 
 * Expected Results:
 * - The user should be able to interact with the elements and complete actions such as clicking and filling fields.
 */
test('User Facing Locators', async ({ page }) => {
    // Action: Click the email textbox
    await page.getByRole('textbox', { name: "Email" }).first().click();

    // Action: Click the "Sign in" button
    await page.getByRole('button', { name: "Sign in" }).first().click();

    // Action: Click elements using labels, placeholders, and titles
    await page.getByLabel('Email').first().click();
    await page.getByLabel('Password').first().click();
    await page.getByPlaceholder('Jane Doe').click();
    await page.getByText('Using the Grid').click();
    await page.getByTitle('Iot Dashboard').click();

    // Expected Results: The elements should be interactable as expected based on their roles.
});

/**
 * Test Suite: Locating Child Elements
 * 
 * Actions:
 * - Locate child elements of parent containers (such as cards).
 * 
 * Expected Results:
 * - Child elements should be locatable and interactable as expected.
 */
test('Locating Child Elements', async ({ page }) => {
    // Action: Locate a child element within the parent container 'nb-card'
    await page.locator('nb-card nb-radio :text-is("Option 1")').click();
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();

    // Action: Click a button within a child element of 'nb-card'
    await page.locator('nb-card').getByRole('button', { name: "Sign in" }).first().click();
    await page.locator('nb-card').nth(3).getByRole('button').click();

    // Expected Results: Child elements should be identified and interacted with correctly.
});

/**
 * Test Suite: Locating Parent Elements
 * 
 * Actions:
 * - Locate parent elements by filtering with text or attributes.
 * 
 * Expected Results:
 * - The parent elements should be located based on their text or child elements.
 */
test('Locating Parent Web Elements', async ({ page }) => {
    // Action: Filter parent container by text
    await page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" }).click();

    // Action: Filter parent container by child element locator
    await page.locator('nb-card', { has: page.locator('#inputEmail') }).getByRole('textbox', { name: "Email" }).click();

    await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('textbox', { name: "Email" }).click();
    await page.locator('nb-card', { has: page.locator('.status-danger') }).getByRole('textbox', { name: "Password" }).click();

    // Expected Results: Parent elements should be locatable using filtering.
});

/**
 * Test Suite: Reusing Locators
 * 
 * Actions:
 * - Reuse locators to avoid duplication and improve code readability.
 * 
 * Expected Results:
 * - Reused locators should work consistently across the tests.
 */
test('Reusing Locators', async ({ page }) => {
    // Reuse the 'basicForm' locator for multiple interactions
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" });

    await basicForm.getByRole('textbox', { name: "Email" }).fill('test@test.com');
    await basicForm.getByRole('textbox', { name: "Password" }).fill('Welcome123');
    await basicForm.locator('nb-checkbox').click();
    await basicForm.getByRole('button').click();

    // Expected Results: Reused locators should be effective for multiple actions.
});

/**
 * Test Suite: Extracting Values
 * 
 * Actions:
 * - Extract and validate values such as text content, input values, and attributes.
 * 
 * Expected Results:
 * - The extracted values should match the expected values.
 */
test('Extracting Values', async ({ page }) => {
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" });

    // Extract button text
    const buttonText = await basicForm.locator('button').textContent();
    expect(buttonText).toEqual('Submit');

    // Extract all text contents of radio buttons
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents();
    expect(allRadioButtonsLabels).toContain("Option 1");

    // Extract input value from email field
    const emailField = basicForm.getByRole('textbox', { name: "Email" });
    await emailField.fill('test@test.com');
    const emailValue = await emailField.inputValue();
    expect(emailValue).toEqual('test@test.com');

    // Extract placeholder attribute value
    const placeHolderValue = await emailField.getAttribute('placeholder');
    expect(placeHolderValue).toEqual('Email');

    // Expected Results: The extracted values should match the expected values.
});

/**
 * Test Suite: Assertions
 * 
 * Actions:
 * - Validate values and interactions using different types of assertions.
 * 
 * Expected Results:
 * - Assertions should verify the expected behavior and values.
 */
test('Assertion', async ({ page }) => {
    // General assertion example
    const value = 5;
    expect(value).toEqual(5);

    const basicFormButton = page.locator('nb-card').filter({ hasText: "Basic form" }).locator('button');
    const text = await basicFormButton.textContent();
    expect(text).toEqual("Submit");

    // Locator assertion
    await expect(basicFormButton).toHaveText("Submit");

    // Soft assertion (allows the test to continue even if this fails)
    await expect.soft(basicFormButton).toHaveText('Submit1');  // This will fail but allow the next line to execute
    await basicFormButton.click();

    // Expected Results: The assertions should verify the correct behavior and handle failures appropriately.
});
