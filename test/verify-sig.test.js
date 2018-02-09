const assert = require('assert')
const verifySig = require('../server/verify-sig')

describe('verifySig()', function() {
  const validSig =
    '0x3ef2a8ff97ad9f016ed6868ed7651d665a907be3eee921ff28306d2ee871709c7d93348f7ee5827dafe0db1ba57b8b6e48571f05612a760d1058d5ead74e13191c'
  const invalidSig =
    '0x3ef2a8ff97ad9f016ed6868ed7651d665a907be3eee921ff28306d2ee871709c7d93348f7ee5827dafe0db1ba57b8b6e48571f05612a760d1058d5ead74e13191e'
  const address = '0x627306090abab3a6e1400e9345bc60c78a8bef57'
  const checkSummedAddress = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57'

  it('confirms a valid signature with normalized address', () => {
    const valid = verifySig(validSig, address)
    assert.equal(valid, true)
  })

  it('confirms a valid signature with checksummed address', () => {
    const valid = verifySig(validSig, checkSummedAddress)
    assert.equal(valid, true)
  })

  it('confirms an invalid signature', () => {
    const valid = verifySig(invalidSig, address)
    assert.equal(valid, false)
  })
})
