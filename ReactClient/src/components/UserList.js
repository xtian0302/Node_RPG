import React, { Component } from 'react'
import UserForm from './UserForm' 

 class UserList extends Component {
     state={ 
         list:[]
     }
     constructor(){
        super()
        this.child = React.createRef();
        this.returnList()
     }
    async returnList(){ 
        try {
            let response = await fetch(`http://localhost:6969/api/rpg_user`).then((res)=>res.json())
            console.log(typeof response) 
            this.setState({list:response})
         } catch (error) {
             console.log(error)
         }
     }
     onAddOrEdit = async (data) => {  
         //post new items
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
         this.returnList()
     }
     handleEditClick = async (index) =>{ 
            await this.child.current.setStateObject(index); 
     }

     handleDeleteClick = async (index) =>{ 
        await fetch('http://localhost:6969/api/rpg_user/'+index, {
            method: 'DELETE'
        });
        this.returnList()
    }
    render() {  
        return (
            <div>
                <UserForm  
                    onAddOrEdit = {this.onAddOrEdit} 
                    ref = {this.child}
                /> <hr/>
                <table>
                     <tbody>
                        {
                            this.state.list.map((item)=>{
                                 return <tr key={item.user_id}>
                                            <td>{item.user_email}</td>
                                            <td>{item.username}</td>
                                            <td><button onClick={() => this.handleEditClick(item.user_id)}>Edit</button></td>
                                            <td><button onClick={() => this.handleDeleteClick(item.user_id)}>Delete</button></td>
                                        </tr>
                            })
                        }
                    </tbody>  
                </table>
            </div>
        )
    }
}
export default UserList