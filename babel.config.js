var PostCompilePlugin = require('webpack-post-compile-plugin')
var TransformModulesPlugin = require('webpack-transform-modules-plugin')
module.exports = {
    "presets": [
    '@vue/app'
    ],
    "plugins": [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ],
        new PostCompilePlugin(),
        new TransformModulesPlugin()

    ]
}
