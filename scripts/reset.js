const shell = require('shelljs')

shell.exec('git reset --hard HEAD~1')
shell.exec('git tag -d $(git log --date-order --tags --simplify-by-decoration --pretty=format:"%d" | head -1 | tr -d "()" | sed "s/,* tag://g")')
