import { expect } from '@playwright/test';
import CommonActions from "../utils/commonActions.js";

export default class CheckboxesPage {
    constructor (page) {
            this.actions = new CommonActions(page)
            
            this.checkboxes = 'input[type="checkbox"]'
    }

    async navigate () {
        await this.actions.navigate('checkboxes')
    }

    async checkCheckbox (index) {
        await this.actions.click(`${this.checkboxes}:nth-of-type(${index})`)
    }

    async isItChecked (index) {
        return await this.actions.isChecked(`${this.checkboxes}:nth-of-type(${index})`)
    }

    async assertCheckbox (index, expectedChecked) {
        const isChecked = await this.isItChecked(index)
        expect(isChecked).toBe(expectedChecked)
    }
}