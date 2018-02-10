const count = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT_COUNT':
      return state + 1
    case 'RECEIVE_COUNT':
      return action.count
    case 'LOGOUT':
      return 0
    default:
      return state
  }
}
export default count
