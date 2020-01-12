module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    // "extends": "eslint:recommended",
    "extends": "plugin:vue/recommended",
    "rules": {
        "indent": ["warn", 2],
        "linebreak-style": ["warn", "unix"],
        "quotes": ["error", "single"],
        "semi": ["off", "always"], 
        "vue/max-attributes-per-line":["error", {
            // 设置单行便签支持最多的属性数
            "singleline": 4,
            "multiline": {
                // 设置多行，每行支持的属性数
                "max": 1,
                // 第一行是否支持填写属性
                "allowFirstLine": true
            }
        }],
        // 组件名称使用驼峰写法MyComponent
        "vue/name-property-casing": ["error", "PascalCase"],
        // 组件方法排序
        "vue/order-in-components": ["warn"],
        // 空标签使用自闭和写法 
        // "vue/html-self-closing": ["error", "always"],
        // 大括号表达式前后是否添加空格{{}}
        // "vue/mustache-interpolation-spacing": ["error", "always|never"],
        // 不允许v-for和v-if写在同一个标签
        "vue/no-confusing-v-for-v-if": ["error"],
        // 定义的prop需要声明default
        "vue/require-default-prop": ["warn"],
        // v-for需要定义key属性
        "vue/require-v-for-key": ["warn"],
    }
};