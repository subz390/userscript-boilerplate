import {sum, subtract, multiply, divide, cubed, isGreaterThan} from './maths.js'

test('sum: 11 + 42 = 53', () => {
  expect(sum(11, 42)).toBe(53)
})

test('subtract: 34 - 40 = -6', () => {
  expect(subtract(34, 40)).toBe(-6)
})

test('multiply: 34 x 40 = 1360', () => {
  expect(multiply(34, 40)).toBe(1360)
})

test('divide: 600 / 3 = 200', () => {
  expect(divide(600, 3)).toBe(200)
})

test('cubed: 64³ = 262144', () => {
  expect(cubed(64)).toBe(262144)
})

// testing three conditions of the terniery operator
test('isGreaterThan: 400 > 300 === true', () => {
  expect(isGreaterThan(400, 300)).toBe(true)
})
test('isGreaterThan: 100 > 300 === false', () => {
  expect(isGreaterThan(100, 300)).toBe(false)
})
test('isGreaterThan: 100 > 100 === false', () => {
  expect(isGreaterThan(100, 100)).toBe(false)
})
