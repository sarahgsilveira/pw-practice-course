/* 
To run the tests, please initialize Playwright:
Initialize the Terminal > Run Task > and select NPM: START NG SERVE
*/

import {test, expect} from '@playwright/test'

test ('Input Fields', async({page}, testInfo)=>{

    await page.goto('http://localhost:4200/')
    if (testInfo.project.name === 'mobile'){
        await page.locator('.sidebar-toggle').click()
    }
   await page.getByText('Forms').click()
   await page.getByText('Form Layouts').click()
   if (testInfo.project.name === 'mobile'){
        await page.locator('.sidebar-toggle').click()
        }
   await page.locator('.sidebar-toggle').click()
   const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
   await usingTheGridEmailInput.fill('danilo@gmail.com')
   await usingTheGridEmailInput.clear()
   await usingTheGridEmailInput.type('danilo2@gmail.com')
})