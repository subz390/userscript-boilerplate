// https://jestjs.io/docs/en/configuration
// https://jestjs.io/docs/en/tutorial-react-native#transformignorepatterns-customization

const esModules = ['jsutils', 'lodash-es'].join('|')

module.exports = {
  verbose: true,
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!(${esModules})/)`]
}
