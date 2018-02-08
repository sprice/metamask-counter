# Project 1

* Create a simple counter app that keeps a separate counter for each unique user registered. It’s fine to keep this counter in memory (i.e., no DB is necessary)--the counter should not be on the blockchain.

  * An authentication component using MetaMask or some other wallet provider

  * A CREATE API that creates a counter when a user authenticates for the first time

  * An UPDATE API that increments that counter

  * A READ API to retrieve that counter that is only accessible for the logged in user

  * A simple page with 2 buttons to call the UPDATE and READ APIs and display their results

* The key requirement for this app is the authentication component. Users should only have access to their own data.

For example, I create a new user with my MetaMask plugin. A counter gets created in the DB initialized to 0 for this user. Since I’m logged in with this user, I can click the button for the UPDATE API and it will increment the counter. If I click the button for the READ API, the current value of the counter will get displayed on the screen. The counter should only be visible to the current user and to no other users.
