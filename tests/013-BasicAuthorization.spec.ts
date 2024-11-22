/*This imports Playwright's test and assertion library, enabling test case definitions and validation of expected outcomes.*/
import { test, expect } from '@playwright/test';

/**
 * Test Suite: Precondition Setup for All Tests
 * 
 * Preconditions:
 * - The webpage 'https://the-internet.herokuapp.com/' should be accessible and available for testing.
 * 
 * Actions:
 * - Navigate to the homepage for each test.
 * 
 * Expected Results:
 * - Each test begins at the homepage without errors.
 */
// test.beforeEach(async ({ page }) => {
//     await page.goto('https://the-internet.herokuapp.com/');
// });

/**
 * Test Case: Basic Auth Login via Context
 * 
 * Actions:
 * - Set up an authenticated context for basic authentication.
 * - Navigate to the basic authentication page.
 * 
 * Expected Results:
 * - The login is successful, and the page displays a confirmation message.
 */
test('Basic Auth Login via Context', async ({ browser }) => {
    // Set up a new browser context with basic authentication

    /*By setting up httpCredentials in the browser.newContext() call, we create a browser environment (context)
    that automatically includes the specified username and password in any HTTP requests that require them.
    This approach allows Playwright to handle HTTP Basic Authentication seamlessly by attaching these 
    credentials to each request made within this context.
    */

    const context = await browser.newContext({
        httpCredentials: {
            username: 'admin',
            password: 'admin'
        }
    });

    // Create a new page within the authenticated context
    /*The context.newPage() call creates a page that inherits the authenticated state from the browser context.
    This page will now have access to any site that requires those credentials without additional input.
     */
    const page = await context.newPage();
    
    // Go to the website with basic authentication

    /*When we navigate to 'https://the-internet.herokuapp.com/basic_auth', the page uses the credentials 
    from the context. If we skipped setting up httpCredentials in the context, Playwright would prompt for a
    native authentication dialog, which it cannot directly interact with.
    */
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    
    // Verify successful login by checking for specific text
    await expect(page.locator('h3')).toHaveText('Basic Auth');
    const message = await page.locator('p').textContent();
    console.log(`Login Message: ${message}`);
    expect(message).toContain('Congratulations! You must have the proper credentials.');

    // Close the context
    await context.close();
});
