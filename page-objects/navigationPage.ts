import {Page} from "@playwright/test";
import { HelperBase } from "./helperBase";

//Creating new Class
//Using Inheritance from helperBase class (EXTEND)

export class NavigationPage extends HelperBase{

    // readonly page: Page
    // readonly fromFormLayoutMenuItem: Locator
    // readonly fromDatepickerMenuItem: Locator
    // readonly fromSmartTableMenuItem: Locator
    // readonly fromToastrMenuItem: Locator
    // readonly fromTooltipMenuItem: Locator

    constructor (page: Page){
        super(page)

        // this.fromFormLayoutMenuItem = page.getByText('Form Layouts')
        // this.fromDatepickerMenuItem = page.getByText('Datepicker')
        // this.fromSmartTableMenuItem = page.getByText('Smart Table')
        // this.fromToastrMenuItem = page.getByText('Toastr')
        // this.fromTooltipMenuItem = page.getByText('Tooltip')
    }

    async formLayoutPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
        await this.waitForNumberOfSeconds(2)
    }    
       
    async datepickerPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
        await this.waitForNumberOfSeconds(2)
    }    
    
    
     async smartTablePage(){
        await this.selectGroupMenuItem('Tables & Data') 
        await this.page.getByText('Smart Table').click()
        await this.waitForNumberOfSeconds(2)
        }    
    
    
     async toastrPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
        await this.waitForNumberOfSeconds(2)
    
    
        }    
    
     async tooltipPage(){
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
        await this.waitForNumberOfSeconds(2)
    
        }    

    private async selectGroupMenuItem(groupItemTitle:string){
        const selectGroupMenuItem = this.page.getByTitle(groupItemTitle)
        const exapandedState = await selectGroupMenuItem.getAttribute('aria-expanded')
        if(exapandedState=="false")
            await selectGroupMenuItem.click()
         
    }
}
//-------------------------------------------------------------------
// The lines bellow is a form of writing the text without using the DRY - don't repet yourself 
// async datepickerPage(){
//     await this.page.getByText('Forms').click()
//     await this.page.getByText('Datepicker').click()

//     }    


//  async smartTablePage(){
//     await this.page.getByText('Tables & Data').click()
//     await this.page.getByText('Smart Table').click()

//     }    


//  async toastrPage(){
//     await this.page.getByText('Modal & Overlays').click()
//     await this.page.getByText('Toastr').click()

//     }    

//  async tooltipPage(){
//     await this.page.getByText('Modal & Overlays').click()
//     await this.page.getByText('Tooltip').click()

//     }    

//--------------------------------------

