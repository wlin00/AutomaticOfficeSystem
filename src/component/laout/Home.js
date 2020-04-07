import React,{Fragment} from 'react'
import Search from '../users/Search'
import User from '../users/User'
import Navbar from './Navbar'


const Home = () => {
    return (
        <Fragment>
            <Navbar title="自动化办公系统"  />
            <div className="container" >
            <Search/>
            <User/>
            </div>
        </Fragment>
    )
}

export default Home
