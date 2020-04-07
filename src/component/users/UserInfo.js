import React, { useEffect , Fragment ,useContext} from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../laout/Spinner'
import Navbar from '../laout/Navbar'
import Repos from './Repos';
import GithubContext from '../../context/github/githubContext'

 
const UserInfo =({match})=> {//重构有状态组件：useState接管state，func参数中解构props，useEffect替换生命周期 
    //注意: match 来自于Reducer中返回的最新的状态 --> userInfo中的字段

    const githubContext = useContext(GithubContext)
    const {loading,userInfo,getUserInfo,getRepos,repos} = githubContext

    // async componentDidMount(){
    //     this.props.getUserInfo(this.props.match.params.variables)  // 将login名作为‘获取个人详情页’函数的回调参数
    //     this.props.getRepos(this.props.match.params.variables)     // 将login名作为‘获取个人仓库’函数的回调参数
    // }
    useEffect(()=>{  //useEffect 重构生命周期didMount
        console.log(match.params.variables)
        getUserInfo(match.params.variables)
        getRepos(match.params.variables)
        // eslint-disable-next-line
    },[])   //render时调用,第二个参数[] :空依赖可以阻止循环渲染的死循环
        
        const {
            avatar_url,
            bio,
            blog,
            company,
            followers,
            following,
            public_repos,
            public_gists,
            location,
            name,
            hireable,
            html_url
        } =  userInfo // userInfo 是App.js回调登陆名后依靠属性传递的--个人用户信息

        const grid_2={
            display:'grid',
            gridTemplateColumns:'repeat(2,1fr)',
            gridGap:'1rem',
            border: "1px solid rgb(206, 204, 204)",
            margin: "15px 0"
        }

        if(loading) return (<Spinner></Spinner> ) //如果还处于axios请求中，显示loading状态的Spinner组件 
        

        return (
            <Fragment >
                <Navbar title="项目名称" icon="fa fa-github" />
                <div className="container" >
                <div className="line1">
                  <Link className="ret_btn" to="/finder">返回</Link>
                  <span className="if_work">
                      是否在职：
                      { hireable ? ( <i className="fa fa-check text-success"></i> ) : ( <i className="fa fa-times-circle text-danger"></i> )}
                  </span>
                </div>  
                <div className="grid-2 gridBox" style={grid_2}>
                    <div className="gridLeft">
                        <img src={avatar_url} alt=""/>
                        <h1>{name?(<span>{name}</span>):(<span>暂无</span>)}</h1>
                        <p>所在地：{location?(<span>{location}</span>):(<span>暂无</span>)}</p>
                    </div>
                    <div className="gridRight gridBox">
                        <h3>个人简介</h3>
                        {bio ? (<p>{bio}</p>) : (<p>暂无</p>)} 
                        <a className="a_gitJump" href={html_url}>访问</a>  
                        <p>公司：{company?(<span>{company}</span>):(<span>暂无</span>)}</p>
                        <p>博客：{blog?(<span>{blog}</span>):(<span>暂无</span>)}</p>
                        <p>Git：{html_url?(<span>{html_url}</span>):(<span>暂无</span>)}</p>
                    </div>
                </div>
                <div className = "line3">
                    <div className="info_btn" style={{background:"#dc3545"}}>{followers?(<span>Followers：{followers}</span>):(<span>暂无</span>)}</div>
                    <div className="info_btn" style={{background:"#28a745"}}>{following?(<span>Following：{following}</span>):(<span>暂无</span>)}</div>
                    <div className="info_btn" style={{color:"#222",background:"#eaeaea"}}>{public_repos?(<span>Public Repos：{public_repos}</span>):(<span>暂无</span>)}</div>
                    <div className="info_btn" style={{background:"#333"}}>{public_gists?(<span>Public Gists：{public_gists}</span>):(<span>暂无</span>)}</div>
                </div>
                <Repos repos={repos}/>
                </div>
            </Fragment>
        )
    }


export default UserInfo
