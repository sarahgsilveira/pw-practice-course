/*To run the tests please initialize Playwright:
Initialize the Terminal and type the code bellow: npm init playwright@latest
*/

//First: import Test from Playwright library
import {test} from '@playwright/test'

//Writing Structure of Tests: can contain 1 or more tests
test('navigate to Form Layouts', async ({page}) => { //(page) is for to open a new page in the browser
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})
test('navigate to Datepicker', async ({page}) => { 
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
})

/*
HOOKS

They're used to not repeat code in tests. As we can observe, both tests above go to the page http://localhost:4200/ and 
then FORMS. We can write a code like:
*/

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()

})
test('navigate to Form Layouts2', async ({page}) => { 
    await page.getByText('Form Layouts').click()
})
test('navigate to Datepicker2', async ({page}) => { 
    await page.getByText('Datepicker').click()
})