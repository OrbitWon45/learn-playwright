import { test, expect } from "@playwright/test"

test.describe("Learn assertions @assertions_group", () => {
    
    test("Verify webpage behavior @smoke", async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/')

        // 1. assert page has correct URL
        await expect(page).toHaveURL('https://the-internet.herokuapp.com/')        

        // 2. assert page has correct title
        await expect(page).toHaveTitle(/The Internet/)        
    })

    test("Continue with assertions", async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/')

        // 3. Assert visibility       
        await expect(page.locator('h1.heading')).toBeVisible()

        // 4. Assert to Have text 
        await expect(page.locator('h2')).toHaveText(/Available Examples/)

        // 5. Assert toContainText

        await expect(page.getByRole('link', { name: 'WYSIWYG Editor' })).toContainText("WYSIWYG")        
    })

    test('Continue with assertions part two', async ({ page }) => {
        // 6. Assert toHaveCount of links
        await page.goto('https://the-internet.herokuapp.com/')        
        await expect(page.locator('a[href]')).toHaveCount(46)                
        // waits
        await page.waitForTimeout(1000)
        await page.waitForLoadState('networkidle') 
        await page.locator('a[href="/checkboxes"]').waitFor() 
        const ckeckBoxPage = page.locator('a[href="/checkboxes"]')
        await ckeckBoxPage.waitFor()       
        await page.locator('a[href="/checkboxes"]').click()
        // 7. Assert check boxes check and uncheck
        await page.getByRole('checkbox').nth(0).check()
        await page.getByRole('checkbox').nth(1).uncheck()
        await expect(page.getByRole('checkbox').nth(0)).toBeChecked()
        await expect(page.getByRole('checkbox').nth(1)).not.toBeChecked()       
    })

    test('Continue with assertions part three', async ({ page }) => {       
        await page.goto('https://the-internet.herokuapp.com//login')
        await page.locator('#username').waitFor()        
        await page.locator('#username').fill('tomsmith')
       
        //8. Asert toHaveValue
        await expect(page.locator('#username')).toHaveValue(/tomsmith/)

        // 9. Assert element toBeEnabled
        await page.locator('i.fa-sign-in').waitFor()         
        await expect(page.locator('i.fa-sign-in')).toBeEnabled()
        // await expect(page.locator('i.fa-sign-in')).toBeDisabled()
    }) 
    
    test('Continue with assertions part four', async ({ page }) => {       
        await page.goto('https://the-internet.herokuapp.com/')
        //10. Store text in variable, then assert text
        const headerText= await page.locator('h1').textContent()
        expect(headerText).toBe('Welcome to the-internet')        
    })    
})