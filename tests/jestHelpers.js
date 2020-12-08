/**
 * @name spyConsole
 * @param {string} type of console `[ error | log | warn | info ]`
 * @return {Object} the spy
 * @see https://stackoverflow.com/a/46154319
 * @see https://stackoverflow.com/questions/44596915/jest-mocking-console-error-tests-fails
 */
export function spyConsole(type='error') {
  const spy = {}

  beforeAll(() => {
    spy.console = jest.spyOn(console, type).mockImplementation(() => {})
  })

  afterAll(() => {
    spy.console.mockRestore()
  })

  return spy
}

/**
 * getNumberLength
 * @param {number} input
 * @return {number} number of characters the input number is
 * @summary this is based upon getLength() except just for numbers
 */
export function charLength(input) {
  return (input + '').length
}
