import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const Useritem =(props)=>{ 

        const {login,avatar_url} = props.user;  //解构state，封装成render内部的变量 
        return (
            <div className="userArea">
                <img src={avatar_url} alt=""/>
                <h2>{login}</h2>
                  <div>
                    <Link className="more_btn" to={`/UserInfo/${login}`}>更多内容</Link>
                  </div>
            </div>
        )
    }

Useritem.propTypes={
    user:PropTypes.object.isRequired
}

export default Useritem
