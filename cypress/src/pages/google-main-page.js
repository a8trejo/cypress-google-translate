/// <reference types="cypress" />

class GoogleMainPage {
    static locator (webElement) {
        switch (webElement) {
            case 'logo': return cy.get("img[alt='Google']")
            case 'searchBar': return cy.get("input[aria-label='Search']")
            case 'resultStats': return cy.get("div#result-stats")
            case 'topSearch': return cy.get("#searchform")
        }
    }
    
    searchFor(inputText) {
        GoogleMainPage.locator('searchBar').should('be.enabled').clear()
            .type(`${inputText}{enter}`)
        GoogleMainPage.locator('resultStats').should('be.visible')
    }
}

export default GoogleMainPage;