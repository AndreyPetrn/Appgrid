#!/bin/bash
cd /var/www/appgrid-automated-qa/

# run visual-builder tests
npx playwright test './tests/visual-builder' --config=chrome.config.ts --headed

# generate report
allure generate -o 'report/visual-builder-report/' --clean