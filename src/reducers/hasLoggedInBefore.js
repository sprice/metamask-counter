const hasLoggedInBefore = (state = false, action) => {
  switch (action.type) {
    case 'RECORD_LOGIN':
      return !!action.hasLoggedInBefore
    default:
      return state
  }
}
export default hasLoggedInBefore
