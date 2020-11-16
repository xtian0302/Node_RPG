const sql = require('mssql')
const config = {
    user: 'sa',
    password: 'Password1',
    server: 'localhost\\S2012', // You can use 'localhost\\instance' to connect to named instance
    database: 'rpg_db',
    options: { encrypt:false }
} 
//CRUD rpg_user
module.exports = {
  
 create: async function(rpg_user) {
    try { 
        let pool = await sql.connect(config) 
        let result1 
         await pool.request()
            .input('user_email', sql.NVarChar, rpg_user.user_email)
            .input('user_pass', sql.NVarChar, rpg_user.user_pass)
            .input('username', sql.NVarChar, rpg_user.username)
            .query('INSERT INTO [dbo].[rpg_user] ([user_email] ,[user_pass] ,[username]) VALUES (@user_email, @user_pass, @username); SELECT SCOPE_IDENTITY() AS id;')
            .then((res) =>result1 = res.recordset[0].id)
            .then(() => pool.close())

        return(result1) 
    } catch (err) {
        // ... error checks
        console.log(err)
        return(err)
    }
},
 read: async function  (user_id) {
    try { 
        let pool = await sql.connect(config) 
        let result1
        await pool.request() 
            .input('user_id', sql.Int, user_id)
            .query('select * from rpg_user where user_id = @user_id ')
            .then((res) => result1 = res)
            .then(() => pool.close())
            
        return(result1.recordset) 
    } catch (err) {
        // ... error checks
        console.log(err)
        return(err)
    } 
},
 readall : async function  () {
    try { 
        let pool = await sql.connect(config) 
        let result1
        await pool.request()
            .query('select * from rpg_user')
            .then((res) => result1 = res)
            .then(() => pool.close())

        return(result1.recordset) 
    } catch (err) {
        // ... error checks
        console.log(err)
        return(err)
    }
},
 update : async function  (user_id,rpg_user) {
    try { 
        let pool = await sql.connect(config) 
        let result1
        await pool.request()
            .input('user_email', sql.NVarChar, rpg_user.user_email)
            .input('user_pass', sql.NVarChar, rpg_user.user_pass)
            .input('username', sql.NVarChar, rpg_user.username)
            .input('user_id', sql.Int, user_id)
            .query('update rpg_user set user_email = @user_email, user_pass = @user_pass, username = @username where user_id = @user_id')
            .then((res) => result1 = res)
            .then(() => pool.close())
            
        return(result1.recordset) 
    } catch (err) {
        // ... error checks
        console.log(err)
        return(err)
    }
},
 del : async function (user_id) {
    try { 
        let pool = await sql.connect(config) 
        let result1 
         await pool.request() 
            .input('user_id', sql.Int, user_id)
            .query('delete from rpg_user where user_id = @user_id ')
            .then((res) => result1 = res)
            .then(() => pool.close())
            
        return(result1) 
    } catch (err) {
        // ... error checks
        console.log(err)
        return(err)
    }
},
testDAO : async function (){
    console.log('Dao test method called')  
    let pool = await sql.connect(config) 
    
    let rpgUser = {user_email:"test@test1", user_pass:"testpass1", username:"testo1"}
    let newID = await create(rpgUser)
    console.log(newID) 
    console.log(await read(newID))
    rpgUser = {user_email:"test@test2", user_pass:"testpass2", username:"testo2"}
    console.log(await update(newID,rpgUser))
    console.log(await read(newID)) 
    console.log(await del(newID)) 
}
};