class AddressCountTable {
  constructor(size) {
    this.table = []
  }

  addressExists(address) {
    if (typeof this.table[address] === 'undefined') return false
    else return true
  }

  create(address) {
    if (typeof this.table[address] === 'undefined') {
      this.table[address] = 0
      return true
    } else return false
  }

  get(address) {
    if (typeof this.table[address] === 'undefined') return false
    else return this.table[address]
  }

  increment(address) {
    if (typeof this.table[address] === 'undefined') return false
    else this.table[address] += 1
  }
}

module.exports = AddressCountTable
