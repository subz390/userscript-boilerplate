// To use babel with Jest
// yarn add --dev @babel/core @babel/preset-env
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
          esmodules: true, // https://babeljs.io/docs/en/babel-preset-env#targetsesmodules
        },
      },
    ],
  ],
}
