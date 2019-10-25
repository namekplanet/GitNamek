module.exports = {
    assetsDir: 'assets',
    pluginOptions: {
        electronBuilder: {
            build: {
                appId: 'pt.pedroladeira.jupiterone',
                productName: 'JupiterOne',
            },
            builderOptions: {
                dmg: {
                    title: 'JupiterOne'
                }
            }
        }
    }
}
