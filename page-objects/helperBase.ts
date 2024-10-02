//Helper Base Class:we can use for keeping some of the methods or funcions that can be used across different page objects
//Then inside of this page object (i.e:formLayoutPage) we use a concept from object oriented programming called
//inheritance. When we EXTENDED a Helper Base Class, and then simply read the method from this class without 
//creating the instance of this class.


import {Page} from "@playwright/test";

export class HelperBase {
     readonly page: Page

constructor (page: Page){
    this.page=page
}

//wait for some number of seconds inside of our tests.

async waitForNumberOfSeconds(timeInSeconds: number){
    await this.page.waitForTimeout(timeInSeconds * 1000)
}
  


}