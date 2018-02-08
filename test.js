// @COMMENT https://medium.com/metamask/scaling-web3-with-signtypeddata-91d6efc8b290

const sigUtil = require('eth-sig-util')

const data = [
  {
    type: 'string',
    name: 'Sign In',
    value: 'Sign in to codexprotocol.com'
  }
]

const sig =
  '0x3ef2a8ff97ad9f016ed6868ed7651d665a907be3eee921ff28306d2ee871709c7d93348f7ee5827dafe0db1ba57b8b6e48571f05612a760d1058d5ead74e13191c'
const address = '0x627306090abab3a6e1400e9345bc60c78a8bef57'

const recovered = sigUtil.recoverTypedSignature({
  data,
  sig
})

console.log('recovered', recovered)
console.log('address', address)
console.log('match', recovered === address)
