const pipe = require('../src/pipe')
const expect = require('chai').expect

describe('PIPE', () => {
  it('should compose a function from left to right', () => {
    const minus2 = num => num - 2
    const times2 = num => num * 2
    const result = pipe(times2, minus2)(4)
    expect(result).to.not.equal(4)
    expect(result).to.equal(6)
  })
  it('should compose a function with one function', () => {
    const minus2 = num => num - 2
    const result = pipe(minus2)(4)
    expect(result).to.equal(2)
  })
  it('should compose a function with more than one function', () => {
    const plus3 = num => num + 3
    const times2 = num => num * 2
    const plus3Times2 = pipe(plus3, times2)
    expect(plus3Times2(4)).to.equal(14)
  })
  it('leftmost function should be variadic (accept more than one argument)', () => {
    const addGreetings = (greeting1, greeting2) => greeting1 + ' ' + greeting2
    const sayItLoud = greeting => greeting.toUpperCase()
    const oneArgProvided = pipe(addGreetings, sayItLoud)('hi')
    const allArgsProvided = pipe(addGreetings, sayItLoud)('hi', 'there')
    expect(oneArgProvided).to.equal('HI UNDEFINED')
    expect(allArgsProvided).to.equal('HI THERE')
  })
  it('all other functions besides leftmost should be unary (accept only one argument)', () => {
    const addGreetings = (greeting1, greeting2) => greeting1 + ' ' + greeting2
    const addMoreGreetings = (addedGreetings, addtlGreeting) => addedGreetings + ' ' + addtlGreeting
    const allArgsProvided = pipe(addGreetings, addMoreGreetings)('hi', 'there', 'tests')
    expect(allArgsProvided).to.equal('hi there undefined')
  })
})