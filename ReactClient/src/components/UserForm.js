import React, { Component } from 'react'

class UserForm extends Component {
    
    state = { 
        currentIndex :-1,
        rpg_user:{ 
            user_email : "",
            user_pass : "",
            username : ""
        }
    } 
     
    async setStateObject(index){ 
            let response = await fetch(`http://localhost:6969/api/rpg_user/` + index).then((res)=>res.json())   
            this.setState({currentIndex:response[0].user_id,rpg_user:response[0]})
    }

    handleInputChange = (e) =>{
        this.setState(prevState => ({ 
            rpg_user:{ 
                ...prevState.rpg_user,
                [e.target.name] : e.target.value 
            }
        }))
    }
    handleSubmit = (e) =>{
        e.preventDefault()
        this.props.onAddOrEdit(this.state)
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} name="rpg_user" autoComplete="off">
                <input name="user_email"  placeholder="Email Address" value={this.state.rpg_user.user_email} onChange={this.handleInputChange}/> <br/>
                <input name="username"  placeholder="Username" value={this.state.rpg_user.username} onChange={this.handleInputChange}/> <br/>
                <input name="user_pass"  placeholder="Password" value={this.state.rpg_user.user_pass} onChange={this.handleInputChange}/> <br/>
                <button type="submit">Submit</button>
            </form>
        )
    }
}
export default UserForm