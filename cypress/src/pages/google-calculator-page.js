/// <reference types="cypress" />

const calculatorPath = Cypress.env('calculatorPath')
import GoogleMainPage from './google-main-page'

class GoogleCalculatorPage {
    static locator (webElement, innerText='') {
        switch (webElement) {
            case 'calcNumbers': return cy.contains(".ElumCf tbody [role='button']:not([aria-label])", innerText)
            case 'calcOperand': return cy.contains(".ElumCf tbody [role='button']:not([aria-label='clear entry'])[aria-label]", innerText)
            case 'clearBtn' : return cy.get(".ElumCf tbody [role='button'][aria-label='clear entry']")
            case 'calcScreen': return cy.get("#cwos")
        }
    }

    openCalculator() {
        cy.visit(calculatorPath)
        GoogleMainPage.locator('resultStats').should('be.visible')
    }

    inputCharacter(char) {
        let btnType = GoogleCalculatorPage.charType(char)
        if ( btnType === 'numeric') {
            GoogleCalculatorPage.locator('calcNumbers', char).focus().click()
        } else if (btnType === 'nonNumeric') {
            GoogleCalculatorPage.locator('calcOperand', char).click()
        } else {
            assert.notEqual(btnType, 'notFound', `Character Not Found Error! \
                \nCharacter ${char} not found in Calculator!\n`)
        }
    }
    
    static charType(char) {
        let charType
        const numberChars = ["0","1","2","3","4","5","6","7","8","9"]
        const nonNumericChars = [".", "=", "+", "−", "×", "÷", "AC", "CE"]
        
        if (numberChars.includes(char)) {
            charType = 'numeric'
        } else if (nonNumericChars.includes(char)){
            charType = 'nonNumeric'
        } else {
            charType = 'notFound'
        }
        return charType
    }

    enterNumber(num) {
        let inputType = typeof(num)
        if (inputType === 'number') {
            let numString = num.toString().split('')
            numString.forEach(digit => {
                this.inputCharacter(digit)
                GoogleCalculatorPage.locator('calcScreen').should(($display) => {
                    const calcText = $display.text()
                    expect(calcText.substring(calcText.length -1)).to.eq(digit)
                })
            });
        } else {
            assert.equal(inputType, 'number', `Input ${num} is Not a Number!`)
        }
    }

    exec(number1=0, number2=0, operation = 'addition') {
        let operand

        switch(operation) {
            case 'addition': operand = '+'
            break;
            case 'substraction': operand = '−'
            break;
            case 'multiplication': operand = '×'
            break;
            case 'division': operand = '÷'
            break;
        }

        this.enterNumber(number1)
        GoogleCalculatorPage.locator('calcOperand', operand).click()
        this.enterNumber(number2)
        GoogleCalculatorPage.locator('calcOperand', '=').click()
    }
}

export default GoogleCalculatorPage;