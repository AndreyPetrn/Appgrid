#!/bin/bash
cd /var/www/appgrid-automated-qa/

# run user-admin tests
npx playwright test './tests/user-admin' --config=chrome.config.ts --headed

# generate report
allure generate -o 'report/user-admin-report/' --clean
