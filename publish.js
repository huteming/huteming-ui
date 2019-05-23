#!/usr/bin/env node

const name = process.argv[2]
const exec = require('child_process').exec

exec('npm run ' + name, function (err, stdout, stderr) {
    if (err) throw err
    console.log(stdout)
})
