let MongoService = require('./')
let test = require('ava')
let { env } = process

test.serial('should specify `user`, `pwd`, `db` in process.env', t => {
  t.not(env.user, undefined)
  t.not(env.pwd, undefined)
  t.not(env.db, undefined)
})

test.serial('should connect to db', async t => {
  let { user, pwd } = env
  let mongo = new MongoService({ user, pwd })

  let db = await mongo.connect(env.db)
  let colls = await db.listCollections().toArray()
  t.is(Array.isArray(colls), true)
})
