const express = require('express')  
const bodyParser = require('body-parser')
const app = express()
const port = 6969  
const dao = require('../DataAccess/dao')

let apiNames = ""

app.use(bodyParser.json())
//============================== RPG USER api : Start  ==================================
 //GET 
app.get('/api/rpg_user/',async (req, res) => { 
    let obj = await dao.readall()
    if (obj instanceof Error) {
        res.status(400).send(new Error('Failed to get all'));
    } else {
        res.send(obj)
    }
 })

 //GET id
app.get('/api/rpg_user/:userId',async (req, res) => {
    let obj = await dao.read(req.params.userId)
    if (obj instanceof Error) {
        res.status(400).send(new Error('Failed to get, Please check userId parameter'));
    } else {
        res.send(obj) 
    }
  })

 //POST
app.post('/api/rpg_user/', async (req, res) => {
    let obj = await dao.create(req.body.rpg_user)
    if (obj instanceof Error) {
        res.status(400).send(new Error('Failed to create. Please check request body'));
    } else {
        res.json({ user_id : obj })
    }
  })


  //PUT
app.put('/api/rpg_user/:userId',async (req, res) => {
    let obj = await dao.update(req.params.userId, req.body.rpg_user)
    if (obj instanceof Error) {
        res.status(400).send(new Error('Failed to Update'));
    } else {
        res.send(obj)
    }
  })
  
  //DELETE
app.delete('/api/rpg_user/:userId', async (req, res) => {
    let obj = await dao.del(req.params.userId)
    if (obj instanceof Error) {
        res.status(400).send(new Error('Failed to Delete'));
    } else {
        res.send(obj)
    }
    
  }) 

apiNames += "\n  RPG_USER api : /api/rpg_user/{userId} \n "

//============================== RPG USER api : End  ==================================



// Express JS Start Listener : pls. finish all api methods before this line :)
app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`)
  console.log(`APIs started : ` + apiNames)
})