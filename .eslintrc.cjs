module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        'node':true,
        'jest':true
    },
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        'parser':'@typescript-eslint/parser',
        'jsxPragma':'React',
        'ecmaFeatures':{
            'jsx':true
        }
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "plugin:@typescript-eslint/recommended",
        'plugin:prettier/recommended'
    ],
    "overrides": [
    ],
    "plugins": [
        "vue",
        "@typescript-eslint"
    ],
    "rules": {
        'no-var':'error',//要求使用let或const
        'no-multiple-empty-lines':['warn',{max:1}],//不允许多个空行
        'no-console':process.env.NODE_ENV==='production'?'error':'off',
        'no-debugger':process.env.NODE_ENV==='production'?'error':'off',
        'no-unexpected-multiline':'error',//禁止多余的空行
        'no-useless-escape':'off',//禁止不必要的转义字符

        '@typescript-eslint/no-unused-vars':'error',//禁止定义未使用的变量
        '@typescript-eslint/prefer-ts-expect-error':'error',
        '@typescript-eslint/no-explicit-any':'off',//禁止使用any类型
        '@typescript-eslint/no-non-null-assertion':'off',
        '@typescript-eslint/no-namespace':'off',
        '@typescript-eslint/semi':'off',

        'vue/multi-word-component-names':'off',
        'vue/script-setup-uses-vars':'error',
        'vue/no-mutating-props':'off',
        'vue/attribute-hyphenation':'off'
    }
}
