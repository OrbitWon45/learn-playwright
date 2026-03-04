import { expect, test } from "@playwright/test"

test("Learning selectors", async ({ page }) => {
    // Navigate to the webpage
    await page.goto("http://127.0.0.1:5500/clickMe.html");

    // 1. Selecting by ID #
    await page.locator('#clickButton').click();

    // 2. selecting by class .
    await page.locator('.button-style').click();

    // 3. Selecting by tag and class    
    await page.locator('button.button-style').click();

    // 4. Selecting by tag and [attribute= "value"]
    await page.locator('button[role="button"]').click();

    // 5. partial attribute [attribute*= "value"]
    await page.locator('[class*="button"]').click();

    // 6. Selecting by text= "text value"
    await page.locator('text= Click Me').click();

    // 7. Combining selectors for precision: class and text - finds exact text
    await page.locator('.button-style:text("Click Me")').click(); 

    //8. has-text: finds elements containing partial not case sensitive text, 'tag:has-text("TeXt vAlUe")'
    await page.locator('button:has-text("lick me")').click();

    // 9. Attribute and text combination '[attribute="value"]:text("text value")
    await page.locator('[role="button"]:text("Click Me")').click();

    // 10. Playwright locators, at https://playwright.dev/docs/locators
    // get by role regex case insensitive, //i
    await page.getByRole('button', { name: /Click Me/i}).click();

    // 11. get by text
    await page.getByText('Click Me').click();

    //Assert that we have 11 clicks
    await expect(page.locator('#counter')).toContainText('11')    
})