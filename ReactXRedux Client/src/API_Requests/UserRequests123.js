  
 module.exports = { 
      getUserList: async function(){ 
        try {
            let response = await fetch(`http://localhost:6969/api/rpg_user`).then((res)=>res.json())
            console.log(typeof response) 
            return response
         } catch (error) {
             console.log(error)
         }
     },
    getUser : async function(index){ 
        try {
            let response = await fetch(`http://localhost:6969/api/rpg_user/` + index).then((res)=>res.json())   
            return response
        } catch (error) {
            console.log(error)
        }
    },
    upsertUser: async function(data){
        try {
            if(data.currentIndex!==-1||data.currentIndex !== null){
                await fetch('http://localhost:6969/api/rpg_user/'+data.currentIndex, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                    "Content-type": "application/json; charset=UTF-8"
                    }
                });
            }else{ 
                await fetch('http://localhost:6969/api/rpg_user', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                    "Content-type": "application/json; charset=UTF-8"
                    }
                });
            } 
        } catch (error) {
            console.log(error)
        }
     },
    deleteUser : async function(index){ 
        await fetch('http://localhost:6969/api/rpg_user/'+index, {
            method: 'DELETE'
        }); 
    }
} 