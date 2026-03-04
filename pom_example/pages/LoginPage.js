import { expect } from "@playwright/test"
import CommonActions from "../utils/commonActions.js"

export default class LoginPage {
    constructor (page) {
        this.actions = new CommonActions(page)

        this.userNameField = '#username'
        this.loginBTN = 'button.radius'
        this.invalidUserMsg = '.flash.error'
    }

    async navigate () {
        await this.actions.navigate('login')
    }

    async login (username, password) {
        await this.actions.fill(this.userNameField, username)
        await this.actions.fill('#password', password)
        await this.actions.click(this.loginBTN)
    }

    async getErrorMessage () {
        return await this.actions.getText(this.invalidUserMsg)
    }

    async assertInvalidUserMessage (expectedMessage) {
        const errorMessage = await this.getErrorMessage()
        expect(errorMessage).toContain(expectedMessage)
    }
}
