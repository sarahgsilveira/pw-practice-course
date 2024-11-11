/* 
To run the tests, please initialize Playwright:
Initialize the Terminal > Run Task > and select NPM: START NG SERVE
*/

import {test, expect} from '@playwright/test'

test ('Input Fields', async({page}, testInfo)=>{

    // Action: Navigate to the homepage
    // await page.goto('http://localhost:4200/pages/iot-dashboard/');
    await page.goto('http://localhost:4200/pages/iot-dashboard/', {
        waitUntil: 'domcontentloaded'
    });

    // Conditional Action: If running in mobile environment, toggle the sidebar
    if (testInfo.project.name === 'mobile') {
        await page.locator('.sidebar-toggle').click();
    }

    // // Action: Navigate to the 'Forms' section
    await page.getByText('Forms').click();

    // // Action: Navigate to the 'Form Layouts' page
    await page.getByText('Form Layouts').click();

    // Conditional Action: Handle sidebar toggle for mobile again if needed
    if (testInfo.project.name === 'mobile') {
        await page.locator('.sidebar-toggle').click();
    }

    // Action: Toggle the sidebar
    await page.locator('.sidebar-toggle').click();

    // Action: Locate the email input field in the "Using the Grid" form and fill it with an email address
    const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" });
    await usingTheGridEmailInput.fill('danilo@gmail.com');

    // Action: Clear the email input field
    await usingTheGridEmailInput.clear();

    // Action: Input a new email address
    await usingTheGridEmailInput.type('danilo2@gmail.com');

    // Expected Results: The email input field should be filled, cleared, and re-filled correctly.
});
