## 安装包

使用 eslint 规范代码

```
pnpm add --save-dev eslint-config-standard eslint-plugin-tailwindcss eslint-config-prettier prettier

// 在 eslint 文件，中添加这些插件
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "standard", "plugin/tailwindcss/recommended", "prettier"),
];

// 在 vscode 中的 setting.json 文件中配置，在 ESLint 在保存时修复错误
{
  "editor.formatOnSave": true,  // 在保存时格式化代码
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"  // 让 ESLint 在保存时修复错误
  },
  "eslint.validate": ["javascript", "typescript", "javascriptreact", "typescriptreact"]
}
```
