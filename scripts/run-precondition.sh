#!/bin/bash
cd /var/www/appgrid-automated-qa/

# pull master
git_pass="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"
/usr/bin/git fetch https://appgrid-bot:$git_pass@github.com/appgrid/appgrid-automated-qa.git master && git reset --hard FETCH_HEAD 2>&1
git checkout master
git pull

rm -rf allure-results