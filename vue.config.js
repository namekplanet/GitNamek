module.exports = {
    assetsDir: 'assets',
    pluginOptions: {
        electronBuilder: {
            build: {
                appId: 'pt.pedroladeira.jupiterone',
                productName: 'JupiterOne',
                buildDependenciesFromSource: true
            },
            builderOptions: {
                dmg: {
                    title: 'JupiterOne'
                }
            }
        }
    }
}
