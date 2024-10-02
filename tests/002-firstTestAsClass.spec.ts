/*To run the tests please initialize Playwright:
Initialize the Terminal and type the code bellow: npm init playwright@latest
*/

/* LOCATORS
Locators name can be find on INSPECT of the webpage.
*/

import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test ('Locator Syntax Rules', async({page}) => {
    //find a LOCATOR by TAG NAME ('STRING')
    await page.locator('input').first().click()
    //find a LOCATOR by ID 
    page.locator('#inputEmail1')
    //find a LOCATOR by CLASS VALUE (.)
    page.locator('.shape-rectangle nb-transition')
    //find a LOCATOR by ATRIBUTE ([])
    page.locator('[placeholder="Email"]')
    //find a LOCATOR by ENTIRE CLASS VALUE - full value ([])
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')
    //combine different values
    page.locator('input[placeholder="Email"][input]')
    //find LOCATOR by xPath - NOT RECOMENDED
    page.locator('//[@id="inputEmail"]')
    //find LOCATOR by Partial Text Macht
    page.locator(':text("Using")')
    //find LOCATOR by Exact Text Macht
    page.locator(':text-is("Using the Grid")')
    })

/*FACING LOCATORS
ROLE: used to find textbox,  botton, alert, ... 
More info on the page - https://playwright.dev/docs/api/class-framelocator#frame-locator-get-by-role
*/

test ('User Facing Locators', async({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    //here we're able to select Sign In button without using 'nb-card'. See CHILD ELEMENTS
    await page.getByRole('button', {name: "Sign in"}).first().click()
    await page.getByLabel('Email').first().click()
    await page.getByLabel('Password').first().click()
    await page.getByPlaceholder('Jane Doe').click() //Fixed word in the page
    await page.getByText('Using the Grid').click()
    await page.getByTitle('Iot Dashboard').click()
    })

/*CHILD Elements*/

test ('Locating Child Elements', async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click() //nb radio is a child of nb card on DOM
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    //find a child elements in a different way.

    /*.LOCATOR in the ie bellow, doesn't make any different, but it's a form of find the button within a nb card - 
    Child element*/
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click()
    //Try to avoid this method, since an element at the page can change the order
    })

/*PARENT Wwe Elements*/

test ('Locating Parent Web Elements', async({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click() 
    //will show just the NB Card that contains Using the Grid text. Filtering by "hastext"
    //It doesn't matter where the locator is in the webpage.
    await page.locator('nb-card', {has: page.locator('#inputEmail')}).getByRole('textbox', {name: "Email"}).click() 
    //Filtering by "has page locator"
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click() 
    await page.locator('nb-card', {has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click() 
    //locate by check boxes
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign In"}).getByRole('textbox', {name: "Email"}).click() 
    })
    
/*Reusing LOCATORS */
test ('REusing Locators', async ({page})=>{
    //what would it be if no reuse of Locators?
    //await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).fill( 'test@test.com') 
    //await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Passord"}).fill( Welcome123') 

    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
        
    await basicForm.getByRole('textBox', {name: "Email"}).fill('test@test.com')
    await basicForm.getByRole('textBox', {name: "Password"}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()       
    await basicForm.getByRole('button').click()       
    })

/*Extracting Values*/
test ('Extracting Values', async ({page})=>{
    //check a single text value of 'Submit' button of 'Basic Form' grid.   .textContent method
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
        
    expect (buttonText).toEqual('Submit')
    //all text value .toContain method
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect (allRadioButtonsLabels).toContain("Option 1")

    //extract input value (value that was inputed in the field)   .inputValue method
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue() //this method will get the value inputed in the field.
    expect (emailValue).toEqual('test@test.com')

    //extract the value of an attibute (type, id, placeholder....)
    const placeHolderValue = await emailField.getAttribute ('placeholder')
    expect (placeHolderValue).toEqual('Email')
    })

/*Assertion (expect): expect must be declared in "import {test, expect} from '@playwright/test'"*/
test ('Assertion', async ({page})=>{
    //Assertion types:
    // GENERAL ASSERTIONS i.e:
    const value = 5
    expect (value).toEqual(5)//compare the right value to the left value

    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button') //localizamos o botao
    const text = await basicFormButton.textContent()//pegamos o texto do botao e assigned na constante
    expect (text).toEqual("Submit")//e executamos a general assertion para validar o texto do bota 'Submit '

    //LOCATOR ASSERTIONS i.e:
    //basicFormButton is the locator
    await expect (basicFormButton).toHaveText("Submit")
    //SOFT ASSERTIONS i.e (no good practice)
    //The test can be continued even if the assertion is failed
    await expect.soft(basicFormButton).toHaveText('Submit1')//there's no Submit1 button in the page
    await basicFormButton.click()//but even the test will run this line.
   })

   