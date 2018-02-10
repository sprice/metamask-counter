const assert = require('assert')
const verifySig = require('../server/verify-sig')

describe('verifySig()', function() {
  const validSig =
    '0x93d47befa80ad9d1b91523f9a272a342ca382d64ac6ed36dd8cb79d7cff866246cd2a34051d2e9a2739e12228b36787032a723395fd2c067cf25e287f18c980c1b'
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

  it('confirms a signature is invalid', () => {
    const valid = verifySig(invalidSig, address)
    assert.equal(valid, false)
  })
})
