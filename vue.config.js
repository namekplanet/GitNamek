module.exports = {
    assetsDir: 'assets',
    pluginOptions: {
        electronBuilder: {
            build: {
                appId: 'pt.pedroladeira.gitnamek',
                productName: 'GitNamek',
            },
            builderOptions: {
                dmg: {
                    title: 'GitNamek'
                }
            }
        }
    }
}
