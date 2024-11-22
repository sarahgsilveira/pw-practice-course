/* 
To run the tests, please initialize Playwright:
Initialize the Terminal > Run Task > and select NPM: START NG SERVE
*/

/*This imports Playwright's test and assertion library, enabling test case definitions and validation of expected outcomes.*/
import {test, expect} from '@playwright/test'

/*Drag & Drop with IFrames
IFrames means, there's a html within the main htlm */

test('Drag & Drop with IFrames', async ({page}) => {
	await page.goto('https://GLOBALSQA.COM/DEMO-SITE/DRAGANDDROP/')
	
	const frame= page.frameLocator('[rel-title="Photo Manager"] iframe' )
	await frame.locator('li', {hasText: "High Tatras 2"}).dragTo(frame.locator('#trash'))

	//More presice control
	await frame.locator('li', {hasText: "High Tatras 4"}).hover()
	await page.mouse.down()
	await frame.locator('#trash').hover()
	await page.mouse.up()

    //Assertion to make sure of the drops are inside the drop location
    await expect(frame.locator('#trash li h5')).toHaveText (["High Tatras 2" , "High Tatras 4"]) 

})  