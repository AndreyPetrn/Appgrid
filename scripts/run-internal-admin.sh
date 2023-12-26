#!/bin/bash
cd /var/www/appgrid-automated-qa/

# run internal-admin tests
npx playwright test './tests/internal-admin' --config=chrome.config.ts --headed

# generate report
allure generate -o 'report/internal-admin-report/' --clean