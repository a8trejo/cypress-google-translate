### Google Translate Demo
-------------------------------------------------------
#### LOCAL SET UP
In order to run the automated test suite, please follow the steps described below:

1. 2. Make sure you have **Node.js** and **Git** installed, run the following commands to check: 
  - `node -v`
  - `git --version`

2. Download it locally by running the command `git clone https://github.com/a8trejo/cypress-google-translate.git`

3. If this is the first time cloning the repository, execute the following command in the project's terminal: `npm install`

4. You can run the automated tests depending on whether you want to run the tests on a visible browser or in the background
   - Visual Browser execution, (does not generate reports)  
     1. Execute the command `npx cypress open`
     2. Click on **E2E Testing**
     3. Click on **Start E2E Testing in Chrome**
     4. Click on **google-translate.cy.js**

   - Headless execution (generates the reports)  
     1. Execute the command `npx cypress run`

5. To generate the mochawesome complete report, run the command:  `npm run cy:report`, you'll find the generated report at the directory below:
  - `cypress/results/reports/mochawesome_complete/complete-report.html`