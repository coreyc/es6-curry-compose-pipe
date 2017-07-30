const _pipe = (f, g) => (...args) => g(f(...args))

module.exports = pipe = (...fns) => fns.reduce(_pipe)