import GoogleTranslatePage from '../pages/google-translate-page'
import testData from '../../fixtures/languages.json'

const translatePage = new GoogleTranslatePage();

describe('Google Translate Testing Suite', () => {
    it('Translate a text', () => {
        cy.visit('/')
        translatePage.translateText(testData['initialText'], testData['sourceLanguage'], testData['targetLanguage'])

        GoogleTranslatePage.locator('translatedText').then(($e) => {
            const translatedText = $e.text()
            cy.log(translatedText)
            assert.equal(translatedText, testData['translatedText'], `Translation Error! \
                \nExpected Translation: ${testData['translatedText']}\nReceived: ${translatedText}\n`)
        })
    })

    it('Swap Translation', () => {
        cy.visit(`?sl=de&tl=es&text=${testData['initialText']}&op=translate`)
        GoogleTranslatePage.locator('textInput').should('be.visible')
        translatePage.swapTranslation()
        // After SWAP Translated text should be the Initial text
        GoogleTranslatePage.locator('translatedText').then(($e) => {
            const translatedText = $e.text()
            assert.equal(translatedText, testData['initialText'], `Translation Error! \
                \nExpected Translation: ${testData['initialText']}\nReceived: ${translatedText}\n`)
            
        })
        
        GoogleTranslatePage.locator('textInput').next().then(($e) => {
            const initialText = $e.text()
            expect(initialText).to.eq(testData['translatedText'])
            assert.equal(initialText, testData['translatedText'], `Swap Error! \
                \nExpected Initial Text: ${testData['translatedText']}\nReceived: ${initialText}\n`)
        })
    })

    it('Translate Text with Input Tools', () => {
        cy.visit(`?sl=de&tl=es&text=${testData['initialText']}&op=translate`)
        GoogleTranslatePage.locator('translatedText').should('be.visible')

        translatePage.typeVirtualKeyboard(testData['virtualText'])

        GoogleTranslatePage.locator('translatedText').scrollIntoView().should('be.visible')
        GoogleTranslatePage.locator('translatedText').invoke("html").then((newTranslation) => {
            assert.isOk(newTranslation, testData['virtualTranslation'], `Translation Error! \
                \nExpected Initial Text: ${testData['virtualTranslation']}\nReceived: ${newTranslation}\n`)
        })
    })
})