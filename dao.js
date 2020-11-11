const sql = require('mssql')
const config = {
    user: 'sa',
    password: 'Password1',
    server: 'localhost\\S2012', // You can use 'localhost\\instance' to connect to named instance
    database: 'rpg_db',
    options: { encrypt:false }
}
//CRUD rpg_user
async function create (pool) {
    try { 
        let result1 = await pool.request()
            .query('select * from rpg_user')
            
        console.dir(result1) 
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
            
        console.dir(result1) 
    } catch (err) {
        // ... error checks
        console.log(err)
    }
}
async function readall (pool) {
    try { 
        let result1 = await pool.request()
            .query('select * from rpg_user')
            
        console.dir(result1) 
    } catch (err) {
        // ... error checks
        console.log(err)
    }
}
async function update (user_id,pool) {
    try { 
        let result1 = await pool.request()
            .query('select * from rpg_user')
            
        console.dir(result1) 
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
            
        console.dir(result1) 
    } catch (err) {
        // ... error checks
        console.log(err)
    }
}
async function main(){
    console.log('hello')  
    let pool = await sql.connect(config)
    readall(pool)
}
main()