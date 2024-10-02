import {Page, expect} from "@playwright/test";
import { log } from "console";
import { HelperBase } from "./helperBase";

export class DatePickerPage extends HelperBase {

	constructor(page: Page){
		super(page)
	}

async selectCommonDatePickerDAteFromToday(numberOfDaysFromToday: number){
   const calendarInputField = this.page.getByPlaceholder('Form Picker')
   await calendarInputField.click()
   const dateToAssert=  await this.selectDateInTheCalendar(numberOfDaysFromToday)
   await expect(calendarInputField).toHaveValue(dateToAssert)
}
//selecting a date from the second calendar

async selectDatepickerwithRangeFromToday(startDateFromToday: number, endDateFromToday: number){
    const calendarInputField = this.page.getByPlaceholder('Range Picker')
    await calendarInputField.click()
    const dateToAssertStart =  await this.selectDateInTheCalendar(startDateFromToday)
    const dateToAssertEnd =  await this.selectDateInTheCalendar(endDateFromToday)
    const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
    await expect(calendarInputField).toHaveValue(dateToAssert)
}

private async selectDateInTheCalendar(numberOfDaysFromToday: number){

    //Setting future dates (common date picker calendar)
    let date = new Date()
    date.setDate(date.getDate()+numberOfDaysFromToday )
    const expectedDate = date.getDate().toString()
    //Getting a short version of the month (i.e Jul, Jun, Aug..)
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear }`


    let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)){ 
        await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click() 
        calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
    }

    await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click()
    // let testq = await this.page.locator('.day-cell.ng-star-inserted')
    // console: log(testq)
    // let test2 = await testq.getByText(expectedDate,{exact: true})
    // test2.click()// will select the exact number 1 value
    return dateToAssert

    }
}