const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  requestTimeout: 15000,
  chromeWebSecurity: false,
  env: {
    baseUrl: 'https://www.saucedemo.com'
  },
  "reporter": "mochawesome",
  "reporterOptions": {
    "reportDir": "mochawesome-report",
    "overwrite": false,
    "html": false,
    "json": true
  },
  e2e: {
    specPattern: '**/*.spec.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
