require('../Models/rpg_user')
const sql = require('mssql')
const config = {
    user: 'sa',
    password: 'Password1',
    server: 'localhost\\S2012', // You can use 'localhost\\instance' to connect to named instance
    database: 'rpg_db',
    options: { encrypt:false }
}
//CRUD rpg_user
async function create (rpg_user,pool) {
    try { 
        let result1 = await pool.request()
            .input('user_email', sql.NVarChar, rpg_user.user_email)
            .input('user_pass', sql.NVarChar, rpg_user.user_pass)
            .input('username', sql.NVarChar, rpg_user.username)
            .query('INSERT INTO [dbo].[rpg_user] ([user_email] ,[user_pass] ,[username]) VALUES (@user_email, @user_pass, @username)')
            
        return(result1) 
    } catch (err) {
        // ... error checks
        console.log(err)
    }
}
async function read (user_id,pool) {
    try { 
        let result1 = await pool.request() 
            .input('user_id', sql.Int, user_id)
            .query('select * from rpg_user where user_id = @user_id ')
            
        return(result1) 
    } catch (err) {
        // ... error checks
        console.log(err)
    }
}
async function readall (pool) {
    try { 
        let result1 = await pool.request()
            .query('select * from rpg_user')
            
        return(result1) 
    } catch (err) {
        // ... error checks
        console.log(err)
    }
}
async function update (user_id,rpg_user,pool) {
    try { 
        let result1 = await pool.request()
            .input('user_email', sql.NVarChar, rpg_user.user_email)
            .input('user_pass', sql.NVarChar, rpg_user.user_pass)
            .input('username', sql.NVarChar, rpg_user.username)
            .input('user_id', sql.Int, user_id)
            .query('update rpg_user set user_email = @user_email, user_pass = @user_pass, username = @username where user_id = @user_id')
            
        return(result1) 
    } catch (err) {
        // ... error checks
        console.log(err)
    }
}
async function del (user_id,pool) {
    try { 
        let result1 = await pool.request() 
            .input('user_id', sql.Int, user_id)
            .query('delete from rpg_user where user_id = @user_id ')
            
        return(result1) 
    } catch (err) {
        // ... error checks
        console.log(err)
    }
}
async function main(){
    console.log('hello')  
    let pool = await sql.connect(config) 
    
    console.log(read(1,pool))
    let rpgUser = {user_email:"test@test", user_pass:"testpass", username:"testo"}
    console.log(update(1,rpgUser,pool))
    console.log(read(1,pool))
}
main()