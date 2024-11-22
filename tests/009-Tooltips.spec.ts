/* 
To run the tests, please initialize Playwright:
Initialize the Terminal > Run Task > and select NPM: START NG SERVE
*/

/*This imports Playwright's test and assertion library, enabling test case definitions and validation of expected outcomes.*/
import { test, expect } from '@playwright/test';

/**
 * Test Suite: Precondition Setup for All Tests
 * 
 * Preconditions:
 * - The webpage 'http://localhost:4200/' should be accessible and available for testing.
 * 
 * Actions:
 * - Navigate to the homepage for each test.
 * 
 * Expected Results:
 * - Each test begins at the homepage without errors.
 */
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
});
/**
 * Test Suite: Tooltips
 * 
 * Actions:
 * - Hover over elements to trigger tooltips.
 * 
 * Expected Results:
 * - Tooltips should appear with the correct content when hovering over elements.
 */
test('Tooltips', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();

    // Action: Hover over the 'Top' button and check tooltip content
    const toolTipCard = page.locator('nb-card', { hasText: "Tooltip Placements" });
    await toolTipCard.getByRole('button', { name: "Top" }).hover();

    // Expected Results: Tooltip should display the correct message
    const toolTip = await page.locator('nb-tooltip').textContent();
    expect(toolTip).toEqual('This is a tooltip');
});
