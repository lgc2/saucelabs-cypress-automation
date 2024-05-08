# End to End Tests - Swag Labs

URL: https://www.saucedemo.com \
Browser: Chrome

## Cloning and Running on Your Machine

#### Prerequisites:

- Node.js version 18.*
- Visual Studio Code or any text editor
- Git

#### Run the following commands via terminal:
`git clone https://github.com/lgc2/saucelabs-cypress-automation.git` \
`cd saucelabs-cypress-automation`

#### To install dependencies:
`npm install`

#### To run tests in headless mode:
`npm run cypress:run`

#### Supporting Libraries:
- Cypress: Automation framework: https://cypress.io/

## Test Scenarios

### Authentication spec
- should log in successfully
- should display the products page after logging in successfully
- should show an error message when logging in with invalid credentials
- should log out successfully

### Purchase spec
- should complete the purchase flow successfully

## General Notes

#### Assumptions made
- I assumed that the products don't change frequently on the products page.

#### Challenges faced
- I was used to utilizing Cypress with Cucumber, then I had to learn a structure a little bit different to implement this challenge.

#### Potential improvements
- It can be implemented using the page object approach (It's good to reuse code).
- Even though the challenge doesn't ask to implement CI, I did that using GitHub Actions, but I didn't implement a report and published it on a GitHub page.
- It could utilize `dotenv` to keep some information safe (such as user credentials, environment information, database connections...).
