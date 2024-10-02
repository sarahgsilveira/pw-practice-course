/*To run the tests please initialize Playwright:
Initialize the Terminal and type the code bellow: npm init playwright@latest
*/

/*Page Ojectcts folder was created after this*/


import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/1-pageManager'
/*Once imported PageManger, we can delete the PageObjects bellow:

import the FAKER Library to use as Data Generator to 'Parametrized Methods' tests*/

import {Faker, faker} from '@faker-js/faker'

/*Creating Page Objects: import {...} from '...' without using Page Object Manager 

Inside Page-Objects folder, was created a file called 'navigationPage.ts'
import {NavigationPage} from '../page-objects/navigationPage'

Inside Page Objects folder, was created a file called 'FormLayoutPage.ts'
import {FormLayoutPage} from '../page-objects/FormLayoutPage'

Inside Page Objects folder, was created a file called 'DatePickerPage.ts'
import {DatePickerPage} from '../page-objects/DatePickerPage'*/


test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')

})

test ('navigate to form page', async({page}) => {
    //Instead of calling each page independently from the test, we're creating an instance of the Page Manager
    const pm = new PageManager(page)
    //So we can delete the code bellow:    
    //const navigateTo = new NavigationPage(page)

    //And replace 'navigateTo.' for 'pm.navigateTo()',because now it's a method.
    await pm.navigateTo().formLayoutPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

//Doing the same to the test bellow:
test ('Parametrized Methods', async({page})=>{
    const pm = new PageManager(page)
    //Using Data Generator to create radom datas
    const randomFullName = faker.name.fullName().toLocaleLowerCase()
    // Generate a random email using the full name, replacing spaces with a dot to make the email valid
    const radomEmail = `${randomFullName}${faker.random.numeric()}@test.com`.replace(' ', '')
    //The Instances can be removed
    // const navigateTo = new NavigationPage(page)
    // const onFormLayoutPage = new FormLayoutPage(page)
    // const onDatePickerPage = new DatePickerPage(page)

    //The code bellow was written before using Data Generator
    // await pm.navigateTo().formLayoutPage()
    // await pm.onformLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectRadioOption ('sarah@gmail.com', 'welcome1', 'Option 1')
    // await pm.onformLayoutPage().submitInlineFormWithNameEmailCheckBox ('Jonh Smith', 'john@gmail.com', true)
    
    //The code bellow is using Data Generator
    await pm.navigateTo().formLayoutPage()
    await pm.onformLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectRadioOption ('sarah@gmail.com', 'welcome1', 'Option 1')
    //If you want to get a screenshot from the step above to check if it's completed. New folder called SCREENSHOTS will be create
    await page.screenshot({path:'screenshots/formsLayoutPage.png'}) //path = where to save the screenshots
    await pm.onformLayoutPage().submitInlineFormWithNameEmailCheckBox (randomFullName, radomEmail, true)
    // await pm.navigateTo().datepickerPage()
    // await pm.ondatepickerPage().selectCommonDatePickerDAteFromToday(10)
    // await pm.ondatepickerPage().selectDatepickerwithRangeFromToday(6, 15)

    /*The test above is written to show how to write email and password on a page. But every time the test is ran
    the same data is use. How to use different values to those fields in each test?
    the code bellow show to use the DAta Generator tool that randomly generate data for us.*/
    
    /*Go to https://www.npmjs.com/package/@faker-js/faker/v/7.6.0 and copy the DATA GENERATOR LIBRARY
    Open a new Terminal and write npm i npm i npm i @faker-js/faker@7.6.0 --save-dev --force*/
})

