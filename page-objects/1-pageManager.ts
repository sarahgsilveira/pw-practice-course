import {Page, expect} from "@playwright/test";
import {NavigationPage} from './navigationPage'
import {FormLayoutPage} from './FormLayoutPage'
import {DatePickerPage} from './DatePickerPage'


export class PageManager{

	private readonly page: Page
    //Creating filter for all Page Objetcts
    private readonly NavigationPage: NavigationPage
    private readonly FormLayoutPage: FormLayoutPage
    private readonly DatePickerPage: DatePickerPage



	constructor(page: Page){
		this.page = page

        //Initializing all Page Objetcts
        this.NavigationPage = new NavigationPage(this.page)
        this.FormLayoutPage = new FormLayoutPage(this.page)
        this.DatePickerPage = new DatePickerPage(this.page)
	}

    //Creating a method that will return all the instances of the Page Objects

    navigateTo(){
        return this.NavigationPage
    }
    onformLayoutPage(){
        return this.FormLayoutPage
    }

    ondatepickerPage(){
        return this.DatePickerPage

    }
}