module.exports = {
  assumptions: {
    noDocumentAll: true,
  },
  ignore: [/\.d\.ts$/],
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    ["@vue/babel-plugin-jsx", { optimize: false, enableObjectSlots: false }],
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          "@": "./src",
        },
      },
    ],
  ],
  env: {
    test: {
      presets: [
        [
          "@babel/preset-env",
          {
            targets: { node: true },
            modules: "commonjs",
          },
        ],
      ],
    },
    lib: {
      ignore: ["**/__tests__"],
      plugins: [
        ["babel-plugin-add-import-extension", { extension: "mjs" }],
        [
          "./build/babel-plugin-replace-import-extension",
          {
            extMapping: {
              ".sass": ".css",
              ".scss": ".css",
            },
          },
        ],
      ],
    },
  },
};
