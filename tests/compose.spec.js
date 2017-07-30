const compose = require('../src/compose')
const expect = require('chai').expect

describe('COMPOSE', () => {
  it('should compose a function from right to left', () => {
    const minus2 = num => num - 2
    const times2 = num => num * 2
    const result = compose(times2, minus2)(4)
    expect(result).to.not.equal(6)
    expect(result).to.equal(4)
  })
  it('should compose a function with one function', () => {
    const minus2 = num => num - 2
    const result = compose(minus2)(4)
    expect(result).to.equal(2)
  })
  it('should compose a function with more than one function', () => {
    const minus1 = num => num - 1
    const times2 = num => num * 2
    const result = compose(times2, minus1)(4)
    expect(result).to.equal(6)
  })
  it('rightmost function should be variadic (accept more than one argument)', () => {
    const addGreetings = (greeting1, greeting2) => greeting1 + ' ' + greeting2
    const sayItLoud = greeting => greeting.toUpperCase()
    const oneArgProvided = compose(sayItLoud, addGreetings)('hi')
    const allArgsProvided = compose(sayItLoud, addGreetings)('hi', 'there')
    expect(oneArgProvided).to.equal('HI UNDEFINED')
    expect(allArgsProvided).to.equal('HI THERE')
  })
  it('all other functions besides rightmost should be unary (accept only one argument)', () => {
    const addGreetings = (greeting1, greeting2) => greeting1 + ' ' + greeting2
    const addMoreGreetings = (addedGreetings, addtlGreeting) => addedGreetings + ' ' + addtlGreeting
    const allArgsProvided = compose(addMoreGreetings, addGreetings)('hi', 'there', 'tests')
    expect(allArgsProvided).to.equal('hi there undefined')
  })
})