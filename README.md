## Setting for start test:
1. Install node `https://nodejs.org/en/`
2. Add dependency - `npm install`                        
3. Install supported browsers - `npm init playwright@latest`
4. Install allure - `npm i -D @playwright/test allure-playwright`

## Running  the tests

### All tests
`npx playwright test --config=chrome.config.ts --headed`

### Internal Admin - tests
`npx playwright test './tests/ia' --config=chrome.config.ts --headed`

### Visual builder - tests
`npx playwright test './tests/visual-builder' --config=chrome.config.ts --headed`

### Debug
`npx playwright test --config=chrome.config.ts --headed --debug`

