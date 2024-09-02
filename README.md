# wyw-in-js/webpack compatibility with loader queries

Demo repository to showcase an issue with wyw-in-js and how it works with loaders that specify queries.

In a terminal, run:

```shell
pnpm install
pnpm build
```

Expect to see an error of the form:

```
ERROR in ./src/App.tsx
Module build failed (from ./node_modules/.pnpm/@wyw-in-js+webpack-loader@0.5.4_typescript@5.5.4_webpack@5.93.0_@swc+core@1.7.22_webpack-cli@5.1.4_/node_modules/@wyw-in-js/webpack-loader/lib/index.js):
Error: ENOENT: no such file or directory, open '/redacted/wyw-in-js-with-webpack-loader-queries/src/assets/arrow.svg?svgUse'
    at readFileSync (node:fs:453:20)
    at Object.code (/redacted/wyw-in-js-with-webpack-loader-queries/node_modules/.pnpm/@wyw-in-js+transform@0.5.4_typescript@5.5.4/node_modules/@wyw-in-js/transform/src/transform/Entrypoint.helpers.ts:177:44)
```
