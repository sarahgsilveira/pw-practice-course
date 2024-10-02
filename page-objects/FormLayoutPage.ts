//PARAMETRIZED METHODS
import {Page} from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutPage extends HelperBase{

	constructor(page: Page){
		super(page)
	}

	async submitUsingTheGridFormWithCredentialsAndSelectRadioOption(email: string, password: string, optionText: string){
	
 		const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
		await usingTheGridForm.getByRole('textbox', { name: "Email" }).fill(email)
		await usingTheGridForm.getByRole('textbox', { name: "Password" }).fill(password)
		await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
		await usingTheGridForm.getByRole('button').click()
	}

/**
 * 
 * @param name - should be first and last name 
 * @param email - must be a valid email 
 * @param rememberMe - true or false if user session is sated
 */

    async submitInlineFormWithNameEmailCheckBox(name: string, email: string, rememberMe: boolean){
        const inlineForm= this.page.locator('nb-card', {hasText: "Inline form"})
		await inlineForm.getByRole('textbox', { name: "Jane Doe"}).fill(name)
		await inlineForm.getByRole('textbox', { name: "Email" }).fill(email)
		if (rememberMe)
			await inlineForm.getByRole('checkbox').check({force: true})
		await inlineForm.getByRole('button').click()
    }
}