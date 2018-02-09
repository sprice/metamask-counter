const assert = require('assert')
const AddressCountTable = require('../server/address-count-table')

describe('AddressCountTable', function() {
  let table
  beforeEach(function() {
    table = new AddressCountTable()
  })

  describe('addressExists()', () => {
    it('knows an address exists', () => {
      const created = table.create('foo')
      assert.equal(table.addressExists('foo'), true)
    })
    it('knows an address does not exist', () => {
      const created = table.create('foo')
      assert.equal(table.addressExists('bar'), false)
    })
  })

  describe('create()', () => {
    it('create an entry for an address', () => {
      const created = table.create('foo')
      assert.equal(created, true)
    })
    it('will not create if address exists', () => {
      const created = table.create('foo')
      const dupe = table.create('foo')
      assert.equal(dupe, false)
    })
    it('initializes an entry to 0', () => {
      const created = table.create('foo')
      assert.equal(table.get('foo'), 0)
    })
  })

  describe('get()', () => {
    it('gets an address count if address exists', () => {
      const created = table.create('foo')
      assert.equal(table.get('foo'), 0)
    })
    it('handles an address not existing', () => {
      const created = table.create('foo')
      assert.equal(table.get('bar'), false)
    })
  })

  describe('increment()', () => {
    it('increments an address that exists', () => {
      const created = table.create('foo')
      const incremented = table.increment('foo')
      assert.equal(incremented, 1)
    })
    it('increments an address not existing', () => {
      const created = table.create('foo')
      const nope = table.increment('bar')
      assert.equal(nope, false)
    })
  })
})
