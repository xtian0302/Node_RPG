import React, { Component } from 'react'
import { connect } from "react-redux"
import * as actions from "../actions/UserActions"
import { bindActionCreators} from "redux"

class UserForm extends Component {
    
    state = { 
        currentIndex :-1,
        rpg_user:{ 
            user_email : "",
            user_pass : "",
            username : ""
        }
    } 
     
    async componentDidUpdate(prevProps) {       
        console.log("updated")
        console.log(this.state)
        if(prevProps.currentIndex!==-1 && prevProps.currentIndex !==undefined ){  
            
                try
                {
                    let response = await fetch(`http://localhost:6969/api/rpg_user/` + prevProps.currentIndex).then((res)=>res.json())    
                    if(response!==this.state.rpg_user){
                        this.setState({currentIndex:response[0].user_id, rpg_user:response[0]})} 
                }
                catch(error)
                {
                    console.log(error)
                } 
        }  
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
        if(this.props.currentIndex == -1)
            this.props.insertUser(this.state)
        else
            this.props.updateUser(this.state)
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
const mapStateToProps = state =>{
    return{
        list: state.list,
        currentIndex: state.currentIndex
    }
}
const mapDispatchToProps = dispatch =>{
    return bindActionCreators({ 
    },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(UserForm)