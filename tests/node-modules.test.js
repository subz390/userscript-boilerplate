import {jsutils, getLength, getChar, getKeys, qs} from '@subz390/jsutils'
import {charLength} from './jestHelpers.js'

// ========================================================================================================================
describe('Confirming access to imports from node_modules', () => {
  describe('jsutils information', () => {
    console.log('jsutils.version', jsutils.version)
  })
  describe('getChar()', () => {
    test('return all defaults as expected', () => {
      const result = getChar()
      expect(typeof result).toBe('string')
      expect(charLength(result)).toBe(8)
      expect(result).toMatch(/^[A-z0-9 !"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~]+$/)
    })
  })
  describe('getKeys()', () => {
    test('simple test', () => {
      expect(getKeys({0: 'zero', 1: 'one', 2: 'two'})).toStrictEqual(['0', '1', '2'])
    })
  })
  describe('getLength()', () => {
    test('negative and floating point string number', ()=>{
      expect(getLength('-123.45')).toBe(7)
    })
  })
  describe('qs()', () => {
    const randomString = getChar(6, 'abcdefghijklmnopqrstuvwxyz')
    const randomHex = getChar(1, 'abcdef') + getChar(5, 'abcdef0123456789')
    const randomId = `#${randomHex}`

    document.body.innerHTML = `<div><span id="${randomHex}">${randomString}</span><button class=""></div>`
    it('control: getElementById method', () => {
      expect(document.getElementById(randomHex).innerHTML).toEqual(randomString)
    })
    it('options type string', () => {
      expect(qs({selector: randomId})).toBeTruthy()
    })
    it('options.selector', () => {
      expect(qs({selector: randomId})).toBeTruthy()
    })
  })
})
