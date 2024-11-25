const { test: base, expect } = require('@playwright/test')

const { LandingPage } = require('../pages/LandingPage')
const {LoginPage} = require('../pages/LoginPage')
const { Toast } = require('../pages/Components')
const { MoviePages } = require('../pages/MoviePages')

const test = base.extend({
    page: async ({page}, use) => {
        await use({
            ...page,
            landing: new LandingPage(page),
            login: new LoginPage(page),
            movies: new MoviePages(page),
            toast: new Toast(page)
        })
    }
})

export { test, expect }
