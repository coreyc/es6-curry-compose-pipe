module.exports = curry = fnToCurry => 
  curriedFunction = (...args) =>
    args.length >= fnToCurry.length ?
      fnToCurry(...args) :
      (...nextArgs) =>
        curriedFunction(...([ ...args, ...nextArgs ]))