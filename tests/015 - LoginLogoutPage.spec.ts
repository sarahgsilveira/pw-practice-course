/* 
To run the tests, please initialize Playwright:
Initialize the Terminal > Run Task > and select NPM: START NG SERVE
*/

import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
});

/** Test Suite: Login Page
 *
 * Test Case: Successful Login to Secure Area
 * 
 * Preconditions:
 * - User has access to the URL: https://the-internet.herokuapp.com/login
 * - Valid credentials are available:
 *   - Username: tomsmith
 *   - Password: SuperSecretPassword!
 * 
 * Actions:
 * - Navigate to the login page.
 * - Enter the username and password.
 * - Click the "Login" button.
 * - Validate that the user is logged in successfully.
 * 
 * Expected Results:
 * - A success message "You logged into a secure area!" is displayed.
 * - The page heading displays "Secure Area."
 * - A welcome message "Welcome to the Secure Area. When you are done click logout below." is visible. */

test('Login Page', async ({ page }) => {
    // Locate and fill the Username field
    const usernameLocator = '#username';
    await page.fill(usernameLocator, 'tomsmith');

    // Locate and fill the Password field
    const passwordLocator = '#password';
    await page.fill(passwordLocator, 'SuperSecretPassword!');

    // Locate and click the Login button
    const loginButtonLocator = 'button[type="submit"]';
    await page.click(loginButtonLocator);

    // Optionally, add an assertion to verify successful login
    const successMessageLocator = '.flash.success';
    await page.waitForSelector(successMessageLocator);

    // Print the success message
    const successMessage = await page.textContent(successMessageLocator);
    console.log(successMessage.trim()); // "You logged into a secure area!"

    // Check if the secure area text is present
    const secureAreaLocator = 'h2';
    const secureAreaText = await page.textContent(secureAreaLocator);
    console.log(secureAreaText.trim()); // "Secure Area"

    // Check for additional text on the page
    const welcomeMessageLocator = '.example';
    const welcomeMessageText = await page.textContent(welcomeMessageLocator);
    console.log(welcomeMessageText.trim()); // Prints the detailed welcome message
});

/**
 * Test Suite: Login Page
 * 
 * Test Case: Logout and Return to Login Page
 * 
 * Preconditions:
 * - User has access to the URL: https://the-internet.herokuapp.com/login
 * - The user is logged into the secure area using valid credentials:
 *   - Username: tomsmith
 *   - Password: SuperSecretPassword!
 * 
 * Actions:
 * - Log in to the secure area using valid credentials.
 * - Click the "Logout" button.
 * - Validate that the logout message is displayed.
 * - Verify that the user is redirected back to the login page.
 * 
 * Expected Results:
 * - A success message "You logged out of the secure area!" is displayed.
 * - The user is redirected to the login page.
 * - The login page heading displays "Login Page."
 */

test('Logout and Verify Logout Message', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://the-internet.herokuapp.com/login');

    // Login process
    const usernameLocator = '#username';
    const passwordLocator = '#password';
    const loginButtonLocator = 'button[type="submit"]';

    await page.fill(usernameLocator, 'tomsmith');
    await page.fill(passwordLocator, 'SuperSecretPassword!');
    await page.click(loginButtonLocator);

    // Ensure login is successful
    const successMessageLocator = '.flash.success';
    await page.waitForSelector(successMessageLocator);

    // Locate and click the Logout button
    const logoutButtonLocator = 'a[href="/logout"]';
    await page.click(logoutButtonLocator);

    // Verify the user sees the logout message
    const logoutMessageLocator = '.flash.success';
    await page.waitForSelector(logoutMessageLocator);
    const logoutMessageText = await page.textContent(logoutMessageLocator);

    // Print and assert the logout message
    console.log(logoutMessageText.trim()); // Should print "You logged out of the secure area!"

    // Verify the user is redirected back to the login page
    await page.waitForURL('https://the-internet.herokuapp.com/login');
    const loginPageHeadingLocator = 'h2';
    const loginPageHeadingText = await page.textContent(loginPageHeadingLocator);

    // Assert the heading on the login page
    console.log(loginPageHeadingText.trim()); // Should print "Login Page"
});
