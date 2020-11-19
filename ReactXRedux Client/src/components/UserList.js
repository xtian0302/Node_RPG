import React, { Component } from 'react'
import UserForm from './UserForm' 
import { connect } from "react-redux"
import * as actions from "../actions/UserActions"
import { bindActionCreators} from "redux"
import {getUsersError, getUsers, getUsersPending} from '../reducers/UserReducer';

  
 class UserList extends Component { 
     
    constructor(props) {
        super(props); 
        this.shouldComponentRender = this.shouldComponentRender.bind(this);
        
    }

    componentWillMount() {
        const {fetchUsers} = this.props;
        fetchUsers();
    }
    shouldComponentRender() {
        const {pending} = this.props;
        if(this.pending === false) return false;
        // more tests
        return true;
    }
     handleEditClick = async (index) =>{ 
         this.props.updateTransactionIndex(index)
         //update indedx
     }  

     handleDeleteClick = async (index) =>{ 
        await this.props.deleteUser(index)
        this.props.fetchUsers()
    }
    render() {  
        const {list, error, pending} = this.props;

        if(!this.shouldComponentRender())
            return <div>"Loading"</div>
        else
            return (
                <div>
                    <UserForm /> <hr/>
                    <table>
                        <tbody>
                            <button onClick={() => this.handleEditClick()}></button>
                            {
                                this.props.list.map((item)=>{
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
const mapStateToProps = state => ({
    error: getUsersError(state),
    list: getUsers(state),
    pending: getUsersPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    updateTransactionIndex: actions.updateIndex,
    fetchUsers: actions.fetchUsers,
    deleteUser: actions.deleteUser
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);