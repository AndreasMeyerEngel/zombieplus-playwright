const { expect } = require('@playwright/test')

export class MoviePages {

    constructor(page) {
        this.page = page
    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*admin/)
    }

    async create(title, overview, company_id, release_year) {
        await this.page.locator('a[href$="register"]').click()
        await this.page.getByLabel('Titulo do filme').fill(title)
        await this.page.getByLabel('Sinopse').fill(overview)
        await this.page.locator('#select_company_id .react-select__indicators').click()
        await this.page.locator('.react-select__option')
        .filter({ hasText: company_id })
        .click()

        await this.page.locator('#select_year .react-select__indicators').click()

        await this.page.locator('.react-select__option')
        .filter({ hasText: release_year })
        .click()

        await this.page.getByRole('button', {name: 'Cadastrar'}).click()

    }

}