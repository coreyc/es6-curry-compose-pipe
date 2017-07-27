const curry = require('../src/curry')
const expect = require('chai').expect

describe('CURRY', () => {
  it('should curry a function which takes one argument', () => {
    const oneArgFn = arg => arg + 2
    const addTwo = curry(oneArgFn)
    expect(addTwo(3)).to.equal(5)
  })

  it('should curry a function which takes more than one argument', () => {
    const multipleArgFn = (arg1 = '', arg2 = '') => 'this: ' + arg1 + ' and ' + 'that: ' + arg2
    const thisAndThat = curry(multipleArgFn)
    console.log(thisAndThat)
    const thisValAndThat = thisAndThat('hi', 'hello')
    expect(thisValAndThat).to.equal('this: hi and that: hello')
  })
})