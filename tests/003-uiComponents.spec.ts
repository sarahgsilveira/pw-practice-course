/*To run the tests please initialize Playwright:
Initialize the Terminal and type the code bellow: npm init playwright@latest
*/

import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    
})

/*Test for the Form's Layout page*/
test.describe ('Form Layouts Page', ()  => {
    test.beforeEach(async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
	
	})
test ('Input Fields', async({page})=>{
    const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
    await usingTheGridEmailInput.fill('danilo@gmail.com')
    //If we want to clear the field email:
    await usingTheGridEmailInput.clear()
    //if we want to simulate a keystrokes of the keyboard
    await usingTheGridEmailInput.pressSequentially('danilo@gmail.com')

    //Assertions to the input field
    //Generic assertion:
    const inputValue = await usingTheGridEmailInput.inputValue()
    expect (inputValue).toEqual('danilo@gmail.com')

    //Locator assertion:
    await expect(usingTheGridEmailInput).toHaveValue('danilo@gmail.com')
    })

/*How to select radio button*/
test ('Selecting Radio Button', async ({page})=>{
    const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})
    // await usingTheGridForm.getByLabel('Option 1').check //this method is used to select the radio button
    await usingTheGridForm.getByLabel('Option 1').check({force:true})//as in the webpage, the radio button Option 1, has a "class="native-input visually-hidden"" , we need to use the method .check({force:true}). This way we'll force the radio button to be selected.
    //another type to select radio button
    await usingTheGridForm.getByRole('radio', { name: "Option 1" }).check({force:true})
    //how to validate if the selection was successfull with a Generic Assertion

    const radioStatus = usingTheGridForm.getByRole('radio', { name: "Option 1" }).isChecked()
    expect (radioStatus).toBeTruthy()

    //how to validate if the selection was successfull with a Locator Assertion
    await expect(usingTheGridForm.getByRole('radio', { name: "Option 1" })).toBeChecked()
    //Select the second radio button 2  and validating that the radio button 1 is not selected
    await usingTheGridForm.getByLabel('Option 2').check({force:true})
    //and validating that the radio button 1 is not selected
    expect (usingTheGridForm.getByRole('radio', { name: "Option 1" }).isChecked()).toBeFalsy
    //and validating that the radion button 2 is to be toBeTruthy
    expect (usingTheGridForm.getByRole('radio', { name: "Option 1" }).isChecked()).toBeTruthy
    })
})
    
/*Check Boxes*/
test('Check Boxes', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()
    await page.getByRole('checkbox', { name: "Hide on click"}).uncheck({force:true})
    await page.getByRole('checkbox', { name: "Prevent arising of duplicate toast"}).check({force:true})
    //test to select or unselect  all check boxes 

    const allBoxes = page.getByRole('checkbox')
    for (const box of await allBoxes.all()){
        await box.check({force:true}) //to uncheck all check boxes, change .check to .uncheck
        expect (await box.isChecked()).toBeTruthy()// and chage toBeFalsy()
    }
})
   
/*Lists and Dropdowns*/
test('Lists and Dropdowns', async ({page}) => {
    const dropDownMenu = page.locator ('ngx-header nb-select')
    await dropDownMenu.click()
    page.getByRole ('list')//when the list has a UL tag
    page.getByRole ('listitem')//when the list has LI TAg
    //const optionList = page.getByRole ('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    //Selecting an item of the list
    await optionList.filter({hasText: "Cosmic"}).click()
    //Validating of the background color when select an item of the list
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')
    //Validating every color and every selection option from the list .(we want to select all item from the list one by one and then validate that for each of the selection we have color change of the application)
    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }
    await dropDownMenu.click()
    for (const color in colors){
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if(color != "Corporate")
            await dropDownMenu.click()
    }
})

/*Tooltips = hints that pop ups as messages*/
test('TooTips', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
    await toolTipCard.getByRole('button', {name: "Top"}).hover()

    const toolTip = await page.locator('nb-tooltip').textContent()
    expect (toolTip).toEqual ('This is a tooltip' )
})

/*DIALOG boxes
Types: Web Dialog Box (pop up on the page) and Dialog Box that belongs to the browser and not to the webpage

Test for Dialog Box that belongs to the browser and not to the webpage*/
test('dialog boxes', async ({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()
    //to the Dialog Box that belongs to the browser be apresented during the text, we need to create a listener.
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })
    await page.getByRole ('table').locator('tr', {hasText: "mdo@gmail.com"}).locator ('.nb-trash').click()
    //now, we need to validate if the item was excluded
    await expect(page.locator('table tr').first()).not.toHaveText ("mdo@gmail.com")
})

/*Web Tables*/
test('Web Tables', async ({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //How to get row by any text in this row
    const targetRow = page.getByRole ('row', {name: "twitter@outlook.com"}) //The email is the unique identifies in the row

    await targetRow.locator ('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await page.locator('.nb-checkmark').click()

    /*find a row only by the specific column in the table?
    first thing to navegate to this page in this example*/

    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowById = page.getByRole ('row', {name: "11"}).filter ({has: page.locator('td').nth(1).getByText ("11")})
    await targetRowById.locator ('.nb-edit').click()

    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
    await page.locator('.nb-checkmark').click()
    
    await expect (targetRowById.locator('td').nth(5)).toHaveText('test@test.com')
    //Testing filter of the table
	const ages =["20", "30", "40", "200"]
	//trying to find each ages of the line above (const)
	for ( let age of ages){
		await page.locator('input-filter').getByPlaceholder('Age').clear()
		await page.locator('input-filter').getByPlaceholder('Age').fill(age)
		await page.waitForTimeout(500)
		const ageRows = page.locator('tbody tr')

		for ( let row of await ageRows.all()){
			const cellValue = await row.locator('td').last().textContent()
            if (age=="200"){
                expect (await page.getByRole('table').textContent()).toContain('No data found')
                
            }else{
			expect (cellValue).toEqual(age)
                 }
            }
    }
})

/*Datepicker (select dates)*/
test('DatePicker', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    /*Selection a date on the calendar*/

    //await page.locator('[class="day-cell ng-star-inserted"]').getByText('14').click()//this line will select the proper 14

    /*If we say, select '1', playwright will get all days that have 1 as part of the text, to fix it, see bellow*/
    await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact: true}).click()// will select the exact number 1 value
    await expect(calendarInputField).toHaveValue('Aug 1, 2024')
})

/*Selectiong Future Dates */
test('Selecting Future Dates', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    //Setting future dates
    let date = new Date()
        date.setDate(date.getDate()+1)
        const expectedDate = date.getDate().toString()
        //Getting a short version of the month (i.e Jul, Jun, Aug..)
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear }`


    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)){ 
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click() 
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate , {exact: true}).click()// will select the exact number 1 value
    await expect(calendarInputField).toHaveValue(dateToAssert)
})

/*Sliders*/

test('Sliders', async ({page}) => {
    /*First aproach of how you can interact with sliders*/

	/*Update atributte*/

    // const tempGauge = page.locator ('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    // await tempGauge.evaluate (node =>{
    //     node.setAttribute('cx', '232.630')
    //     node.setAttribute('cy', '232.630')

	// })
    // await tempGauge.click()

	/*Second approach, to simulate the actual mouse movement to chage the value of Gauge*/
    const tempBox = page.locator ('[tabtitle="Temperature"] ngx-temperature-dragger ')
    await tempBox.scrollIntoViewIfNeeded()
    
    const box = await tempBox.boundingBox()  //Bounding Box = X,Y cordinate position
    const x = box.x + box.width/ 2
    const y = box.y + box.height / 2
        await page.mouse.move(x,y)
        await page.mouse.down() //to press the right click of the mouse
        await page.mouse.move(x +100, y)
        await page.mouse.move(x +100, y+100)
        await page.mouse.up() //to unpress the right click of the mouse
        await expect(tempBox).toContainText('30')

})  
