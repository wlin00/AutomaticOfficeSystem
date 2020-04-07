import React, { useState,useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'
import GithubContext from '../../context/github/githubContext'


const Search = ()=>  { //reactHook重构：rcc转rfc，形参接收app.js传递的参数

    const alertContext = useContext(AlertContext) //实例化一个context，调用其中state 的方法
    const githubContext = useContext(GithubContext) //实例化gitUser的context，并进行解构
    const {users} = githubContext

    const [text,setText] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const handleChange= (e) =>{
        setText(e.target.value)// 设置对应name的input的数据绑定,reachHook 重构
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(text === ""){
            alertContext.setAlert("请输入github用户名","dark") //此处子组件调用父组件方法，通过函数回调的形式进行传值
        }else{
            githubContext.searchUser(text)
            setText('')   //clear data in searchInput( by using useState of reactHook , remove previous solution mode : 'this.setState')
        }
    }
    const handleClear=(e)=>{
        e.preventDefault();
        githubContext.clearUser()
    }

        return (
            <div>
                <form onSubmit={handleSubmit} className="form">
                  <input
                     type="text" 
                     name="text" 
                     placeholder="Search the users in GitHub" 
                     className="search" 
                     value={text} 
                     onChange={handleChange}
                  /> 
                  <input type="submit" value="Search" className="btn-submit" />  
                  {/* jsx表达式通过传入bool值showclear，判断dom节点是否显示/隐藏 */}
                  { users.length> 0  && (<button className='clear' onClick={handleClear}>Clear</button>)}
                </form> 
            </div>
        )  
}

export default Search 
