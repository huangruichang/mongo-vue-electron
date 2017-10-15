# mongo-service

> MongoDB Service for Node.js

### Examples

```js
let MongoService = require('mongo-service')

let mongo = new MongoService({
  host: 'localhost', port: 27017,
  user: 'fritx', pwd: '***SECRET***'
})

let db = await mongo.connect('we-admin-dev')
let colls = await db.listCollections().toArray()
```

### Mongo Docs

- [Enable Auth](https://docs.mongodb.com/manual/tutorial/enable-authentication/)
- [Built-In Roles](https://docs.mongodb.com/manual/core/security-built-in-roles/)
