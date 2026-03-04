import { test, expect } from "@playwright/test";
import { permission } from "node:process";
import { chromium } from "playwright";

// browser => context => page

let browser;
let context;
let page;

test.describe('Describe block for Hooks', () => {

    test.beforeAll(async () => {
    // launch Chrome browser before all test
    browser = await chromium.launch()
    console.log('BEFORE ALL HOOK LAUNCHED CHROMIUM BROWSER')
    })

    test.beforeEach(async () => {
        // create context for a browser
        context = await browser.newContext()
        // create new page
        page = await context.newPage()
        // navigate to URL
        await page.goto('https://the-internet.herokuapp.com/')
        // pause execution
        console.log('BEFORE EACH HOOK LAUNCHED NEW PAGE')
        await page.pause()
    })

    test.afterEach(async () => {
        // close page and context
        await page.close()
        await context.close()
        console.log('AFTER EACH HOOK CLOSED PAGE')
    })

    test.afterAll(async () => {
        // close browser
        await browser.close()
        console.log('AFTER ALL HOOK CLOSED BROWSER')
    })

    test('A/B test', async () => {    
        await page.click('a[href="/abtest"]')    
        const header = await page.textContent('h3')
        expect(header).toBe('A/B Test Variation 1')
    })

    test('Checkboxes are un-checked1 and checked2 verification', async () => {
        await page.click('a[href="/checkboxes"]')
        const checkbox_1 = await page.isChecked('input[type="checkbox"]:first-child')    
        expect(checkbox_1).toBe(false)    
        const checkbox_2 = await page.getByRole('checkbox').nth(1).isChecked()
        expect(checkbox_2).toBe(true)
    })

    test('Geolocation setting in context and verification', async () => {
        context = await browser.newContext({
            permissions: ['geolocation'],
            geolocation: {latitude: 37.774929, longitude: -122.419416},
            viewport: {width: 1280, height: 720}
        })
        page = await context.newPage()
        console.log("USING CONTEXT AND PAGE CREATE WITHIN TEST AND NOT WITHIN HOOKS")
        await page.pause()
        await page.goto('https://the-internet.herokuapp.com/geolocation') 
        await page.click('button')   
        const lat = await page.textContent('#lat-value')
        const long = await page.textContent('#long-value')
        expect(parseFloat(lat)).toBeCloseTo(37.774929)
        expect(parseFloat(long)).toBe(-122.419416)
    })
})


