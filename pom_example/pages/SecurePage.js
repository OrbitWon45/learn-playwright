import { expect } from "@playwright/test"
import CommonActions from "../utils/commonActions.js"

export default class SecurePage {
    constructor (page) {
            this.actions = new CommonActions(page)
            this.successMessage = '#flash'
    }

    async getMessage() {
        return await this.actions.getText(this.successMessage)
    }

    async assertLoggedInMessage(passedMessage) {
        const message = await this.getMessage()
        expect(message).toContain(passedMessage)
    }
}