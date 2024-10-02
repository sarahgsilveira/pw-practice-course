/* 
To run the tests, please initialize Playwright:
Initialize the Terminal > Run Task > and select NPM: START NG SERVE
*/

// First: Import Test from Playwright library
import { test } from '@playwright/test';

/**
 * Test Suite: Navigation to Form Layouts and Datepicker
 * 
 * Preconditions:
 * - The webpage 'http://localhost:4200/' should be accessible and available for testing.
 * 
 * Actions:
 * - Navigate to 'Forms' and 'Form Layouts' pages.
 * - Navigate to 'Forms' and 'Datepicker' pages.
 * 
 * Expected Results:
 * - The user should be able to navigate successfully to both pages without errors.
 */

test('navigate to Form Layouts', async ({ page }) => { 
    // Action: Open the homepage
    await page.goto('http://localhost:4200/');

    // Action: Click on the 'Forms' link to navigate to the Forms section
    await page.getByText('Forms').click();

    // Action: Click on the 'Form Layouts' link to navigate to the Form Layouts page
    await page.getByText('Form Layouts').click();

    // Expected Result: The page should successfully navigate to the 'Form Layouts' page.
});

test('navigate to Datepicker', async ({ page }) => { 
    // Action: Open the homepage
    await page.goto('http://localhost:4200/');

    // Action: Click on the 'Forms' link to navigate to the Forms section
    await page.getByText('Forms').click();

    // Action: Click on the 'Datepicker' link to navigate to the Datepicker page
    await page.getByText('Datepicker').click();

    // Expected Result: The page should successfully navigate to the 'Datepicker' page.
});

/* 
HOOKS

To avoid repeating similar code across tests, we use hooks such as `beforeEach`. 
This code runs before every test, navigating to the homepage and clicking 'Forms', which is common to both tests.
*/

test.beforeEach(async ({ page }) => {
    // Action: Open the homepage before each test
    await page.goto('http://localhost:4200/');

    // Action: Click on the 'Forms' link
    await page.getByText('Forms').click();

    // Expected Result: The 'Forms' section should be successfully opened before every test.
});

test('navigate to Form Layouts2', async ({ page }) => {
    // Action: Click on the 'Form Layouts' link to navigate to the Form Layouts page
    await page.getByText('Form Layouts').click();

    // Expected Result: The page should successfully navigate to the 'Form Layouts' page.
});

test('navigate to Datepicker2', async ({ page }) => { 
    // Action: Click on the 'Datepicker' link to navigate to the Datepicker page
    await page.getByText('Datepicker').click();

    // Expected Result: The page should successfully navigate to the 'Datepicker' page.
});
