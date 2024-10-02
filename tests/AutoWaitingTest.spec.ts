/*To run the tests please initialize Playwright:
Initialize the Terminal and type the code bellow: npm init playwright@latest
*/

/*AUTO WAITING:  https://playwright.dev/docs/actionability
Playwright performs a range of actionability checks on the elements before making actions to ensure these
actions behave as expected. It auto-waits for all the relevant checks to pass and only then performs the
requested action. If the required checks do not pass within the given timeout, action fails with the TimeoutError.*/

import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})

test('Auto Waiting', async ({ page }) => {
    const successButton = page.locator('.bp-success')
    //await successButton.click()
    const text = await successButton.textContent()
    expect(text).toEqual('Data loaded with AJAX get request.')
})
