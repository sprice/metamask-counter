const sigUtil = require('eth-sig-util')

const data = [
  {
    type: 'string',
    name: 'Sign In',
    value: 'Sign in to count.shawnprice.com'
  }
]

const verifySig = (sig, address) => {
  let recovered

  try {
    recovered = sigUtil.recoverTypedSignature({
      data,
      sig
    })
  } catch (err) {
    return false
  }

  if (recovered === sigUtil.normalize(address)) return true
  else return false
}

module.exports = verifySig
