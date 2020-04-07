import React ,{useContext} from 'react'
import UserItem from './Useritem'
import Spinner from '../laout/Spinner'
import GithubContext from '../../context/github/githubContext'

const Users = () =>{

    const githubContext = useContext(GithubContext);
    const {loading,users} = githubContext

    if(loading){
        return <Spinner/>
    }else{
        return (
            <div style={gridModel}>
                {
                    users.map((user) =>(
                        <UserItem key={user.id} user = {user} />
                    ))
 
                }
            </div>
        )
}
}

const gridModel  = {
    display:'grid',
    gridTemplateColumns:'repeat(3,1fr)',
    gridGap:'1rem'
}

export default Users
