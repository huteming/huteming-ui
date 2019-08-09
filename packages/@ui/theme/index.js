const routesModules = require.context('./src', false, /\.scss$/)
routesModules.keys().forEach(item => routesModules(item))
