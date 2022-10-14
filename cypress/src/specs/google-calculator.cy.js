import GoogleMainPage from '../pages/google-main-page'
import GoogleCalculatorPage from '../pages/google-calculator-page'
import helper from '../../support/utilities'

const googleCalculator = new GoogleCalculatorPage();
const googleMain = new GoogleMainPage();

describe('Google Calculator Testing Suite', () => {
    it('Opening Calculator', () => {
        cy.visit('/')
        GoogleMainPage.locator('logo').should('be.visible')
        googleMain.searchFor('calculator')
    })

    it('Validate Input-Display Buttons', () => {
        const inputDisplayChars = '1234567890.0123456789'

        googleCalculator.openCalculator()
        inputDisplayChars.split('').forEach((char) => {
            googleCalculator.inputCharacter(char)
        })
        GoogleCalculatorPage.locator('calcScreen').should('contain', inputDisplayChars)
    })

    it('Validate AllClear-ClearEntry Buttons', () => {
        googleCalculator.openCalculator()
        
        let randomNumber = helper.getRandomFloat(50)
        let inputDisplayChars = randomNumber.toString()        
        let charsArray = inputDisplayChars.split('')
        
        GoogleCalculatorPage.locator('calcOperand', 'AC').should('be.visible').click()
        GoogleCalculatorPage.locator('calcScreen').should('have.text', '0')
        
        googleCalculator.enterNumber(randomNumber)
        GoogleCalculatorPage.locator('calcScreen').should('have.text', inputDisplayChars)

        // Hiding top search form which obstructs visibility in Test Runner
        GoogleMainPage.locator('topSearch').invoke('hide')

        // Deleting each Character of the number entered above
        charsArray.forEach((char, i) => {
            let modifiedString
            if (inputDisplayChars.length === i+1) {
                modifiedString = '0'
            } else {
                modifiedString = inputDisplayChars.substring(0, inputDisplayChars.length - i -1)
            }
            GoogleCalculatorPage.locator('clearBtn').should('be.visible')
                .scrollIntoView().click()
            GoogleCalculatorPage.locator('calcScreen').should('have.text', modifiedString)
        })
    })

    const mathOperations = ['addition', 'substraction', 'multiplication', 'division']
    mathOperations.forEach((operation) => {
        it(`Validate Operation: ${operation}`, () => {
            googleCalculator.openCalculator()
            let number1 = helper.getRandomInt(50)
            let number2 = helper.getRandomInt(50)

            let expectedResult
            switch(operation) {
                case 'addition': expectedResult = (number1 + number2).toString()
                break;
                case 'substraction': expectedResult = (number1 - number2).toString()
                break;
                case 'multiplication': expectedResult = (number1 * number2).toString()
                break;
                case 'division': expectedResult = helper.roundNumber((number1 / number2), 11).toString()
                break;
            }
            cy.logger(`${operation} ${number1}, ${number2}, expecting ${expectedResult}`)

            googleCalculator.exec(number1, number2, operation)
            GoogleCalculatorPage.locator('calcScreen').should('have.text', expectedResult)
        })
    })
})