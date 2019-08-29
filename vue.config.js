let endpoint = '^' + process.env.VUE_APP_API_URL;

module.exports = {
    pwa: {
        name: 'SIMCALEG',
        themeColor: '#fff',
        msTileColor: '#009688',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'default',
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            navigateFallback: '/index.html',
            runtimeCaching: [
                {
                    urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
                    handler: 'cacheFirst',
                    options: {
                        cacheName: 'images',
                        expiration: {
                            maxEntries: 10,
                        },
                    },
                },
                {
                    urlPattern: new RegExp(endpoint),
                    handler: 'networkFirst',
                    options: {
                        networkTimeoutSeconds: 20,
                        cacheName: 'api-cache',
                        cacheableResponse: {
                            statuses: [0, 200]
                        }
                    }
                },
                {
                    urlPattern: new RegExp(endpoint),
                    handler: 'networkOnly',
                    options: {
                        backgroundSync: {
                            name: 'post-queue',
                            options: {
                                maxRetentionTime: 24 * 60,
                            }
                        },
                    },
                    method: 'POST'
                }
            ]
        }
    }
}