
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
    ],
    rules: [
        {
            test: /\.js$/,
            loader: 'babel-loader',//注意elementUI的源码使用ES6需要解析
            include: [resolve('src'), resolve('test'),resolve('/node_modules/element-ui/src'),resolve('/node_modules/element-ui/packages')]
        }
    ]
}
