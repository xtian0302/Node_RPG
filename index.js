const express = require('express') 
const app = express()
const port = 6969
const Rpg_user = require('./Models/rpg_user')

let rpg_user = Rpg_user("a","b","c");


let rpg_user1 = Rpg_user("a","b","D");
rpg_user.username = "S"
console.log(rpg_user.getName())
console.log(rpg_user1.getName())

app.get('/api/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})