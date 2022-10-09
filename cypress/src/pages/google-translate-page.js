/// <reference types="cypress" />

class GoogleTranslatePage {
    static locator (webElement) {
        switch (webElement) {
            case 'languageDropdown': return cy.get("h1#ucj-2 + div.ccvoYb.EjH7wc .akczyd [jscontroller='soHxf']")
            case 'sourcesParent': return cy.get("c-wiz.bvzp8c.Tht3fc")
            case 'sourcesList': return cy.get("c-wiz.bvzp8c.Tht3fc>.OoYv6d [jsname='JpRUfc'] [jsname='Lm8Uhb']")
            case 'targetDropdown': return cy.get("h1#ucj-2 + div.ccvoYb.EjH7wc .akczyd:nth-of-type(5) [jscontroller='soHxf']")
            case 'rightDropdown': return cy.get("#ucj-2 + div [aria-label*='target']")
            case 'targetsParent': return cy.get("c-wiz.bvzp8c.DlHcnf")
            case 'targetList': return cy.get("c-wiz.bvzp8c.DlHcnf .ykTHSe .Llmcnf")
            case 'textInput': return cy.get("[aria-label='Source text']")
            case 'textOutput': return cy.get("#ucj-3 + .tm8pq")
            case 'circleLoader': return cy.get("#ucj-2 + div .OucA2b [role='progressbar']")
            case 'swapBtn': return cy.get("#ucj-2 + div c-wiz[jscontroller='Un38xf']>div:nth-child(3) .VfPpkd-Bz112c-RLmnJb")
            case 'translatedText': return cy.get('span.Q4iAWc')
            case 'keyboardOn': return cy.get("#itamenu a.ita-kd-inputtool-icon")
            case 'inputToolsBtn': return cy.get("span.ita-kd-inputtools-div [aria-label*='Input Tools']")
            case 'inputToolsOptions': return cy.get("li.ita-kd-menuitem .ita-kd-menuitem-inputtool-name")
            case 'virtualKeys': return cy.get("#kbd button span")
            case 'closeKbd': return cy.get("#kbd .vk-t-btns")
            case 'switchKbd': return cy.get("#K16")
            case 'charA': return cy.get("#K65")
        }
    }

    translateText(input, sourceLanguage, targetLanguage) {
        GoogleTranslatePage.locator('languageDropdown').first().click()
        GoogleTranslatePage.locator('sourcesParent').should('be.visible')
        GoogleTranslatePage.locator('sourcesList').contains(sourceLanguage).click()
        GoogleTranslatePage.locator('sourcesParent').should('not.exist')
        
        GoogleTranslatePage.locator('rightDropdown').should('be.enabled').as('rightDropdown')
        cy.get("@rightDropdown").focus().click()
        cy.get("@rightDropdown").click()
        
        GoogleTranslatePage.locator('targetsParent').should('be.visible')
        GoogleTranslatePage.locator('targetList').contains(targetLanguage).click()
        GoogleTranslatePage.locator('targetsParent').should('not.exist')
        
        GoogleTranslatePage.locator('textInput').should('be.enabled')
        .type(input)
    }

    swapTranslation() {
        cy.intercept('https://play.google.com/log?format=json&hasfast=true').as('newTranslation')
        cy.intercept('**/TranslateWebserverUi/**/batchexecute**').as('translateBatch')

        GoogleTranslatePage.locator('swapBtn').trigger('click')
        cy.wait('@translateBatch')
        cy.wait('@newTranslation')
        
        
        GoogleTranslatePage.locator('translatedText').should('not.contain', '...')
        
    }

    typeVirtualKeyboard(inputText) {
        cy.intercept('https://play.google.com/log?format=json&hasfast=true').as('format')
        GoogleTranslatePage.locator('textInput').should('be.enabled')
        .clear()
        cy.wait('@format')

        GoogleTranslatePage.locator('keyboardOn').click()     
        
        inputText.split("").forEach((char) => {
            let matchingKbd = GoogleTranslatePage.matchingKeyboard(char)
            GoogleTranslatePage.locator('charA').then(($a) => {
                let anchor = $a.text()
                let currentKbd = (anchor === 'a' ) ? 'kb1':'kb2'
                if (matchingKbd === currentKbd) {
                    GoogleTranslatePage.locator('virtualKeys').contains(char)
                    .parent().as('lowerChar')
                    cy.get('@lowerChar').click()
                } else {
                    GoogleTranslatePage.locator('switchKbd').click()    
                    GoogleTranslatePage.locator('virtualKeys').contains(char)
                    .parent().as('char')
                    cy.get('@char').click()
                }
            })
        })
        GoogleTranslatePage.locator('closeKbd').click()
    }
    
    static matchingKeyboard(char) {
        let kbd
        const keyboard1 = ["^","1","2","3","4","5","6","7","8","9","0","ß","´",
            "q","w","e","r","t","z","u","i","o","p","ü","+","a","s","d","f","g","h","j","k","l",
            "ö","ä","#","<","y","x","c","v",'b','n','m','.','-',]
        const keyboard2 = ["°","!","§","$","%","&","/","(",")","=","?",
            "Q","W","E","R","T","Z","U","I","O","P","Ü","*",
            "A","S","D","F","G","H","J","K","L","Ö","Ä",">",
            "Y","X","C","V","B","N","M",";",":","_,"]
        
        if (keyboard1.includes(char)) {
            kbd = 'kb1'
        } else if (keyboard2.includes(char)){
            kbd = 'kb2'
        } else {
            kbd = 'notFound'
        }
        return kbd

    }
    
}

export default GoogleTranslatePage;