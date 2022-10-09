const { defineConfig } = require('cypress')
const fs = require('fs-extra');
  
module.exports = defineConfig({
  browser: "chrome",
  e2e: {
    baseUrl: "https://translate.google.com/",
    watchForFileChanges: false,
    specPattern: ["cypress/**/specs/**/*.cy.{js,jsx,ts,tsx}"],
    pageLoadTimeout: 50000,
    responseTimeout: 30000,
    defaultCommandTimeout: 10000,
    video: false,
    chromeWebSecurity: false,
    modifyObstructiveCode: false,
    experimentalSessionAndOrigin: true,
    screenshotsFolder: "cypress/results/screenshots",
    videosFolder: "cypress/results/videos",
    downloadsFolder: "cypress/results/downloads",
    supportFile: 'cypress/support/e2e.js',
    reporter: "cypress-multi-reporters",
    reporterOptions: {
        "configFile": "cypress/config/reporter-configs.json"
    },
    setupNodeEvents,
  }
})

async function setupNodeEvents(on, config) {
  cleanReports();

  on('task', {
    logMsg(msg) {
      console.log(msg);
      return null;
    },
  });

  return config;
}

function cleanReports() {
    const reportPath = './cypress/results/reports';
    if (fs.existsSync(reportPath)) {
        fs.rmdirSync('./cypress/results/reports', { recursive: true });
    }
};