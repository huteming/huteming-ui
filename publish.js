const cli = require('./packages/@cli/publish')

cli.publish('dist', function(err) {
    if (err) {
        console.log(err)
        return
    }
})
