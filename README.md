## Front End

1. Check for Metamask
   1. If not unlocked, show Metamask install link
1. If Metamask unlocked
   1. If no creds in localStorage, prompt for login
   1. If creds exists, display buttons which do UPDATE and READ calls
1. Login
   1. Create signed message with Metamask
   1. Store signature, and address to localStorage
   1. POST to /login with creds
1. Authenticated page with UPDATE and READ buttons
   1. UPDATE does a PUT to /user/:address/count and displays count
   1. READ does a GET to /user/:address/count and displays count

## Server

### POST /login

1. Body includes signature, and address.
1. Ensure extracted address (from data and signature) matches address. If not return 403
1. Use hash map, indexed by address, to store counter.
1. If address index does not exist, create it and set counter to 0. Return 200 {msg: 'created'}
1. If address exists, return 200 {msg: 'exists'}

### PUT /user/:address/count

1. Body includes signature, and address.
1. Ensure extracted address (from data and signature) matches address. If not return 403
1. Ensure address exists in hash map. If not return 404
1. Increment the count value. Return 200 {msg: 'incremented'}

### GET /user/:address/count?sig=:sig&address=:address

1. Ensure extracted address (from data and signature) matches address. If not return 403
1. Ensure address exists in hash map. If not return 404
1. Return 200 {count: COUNT}
