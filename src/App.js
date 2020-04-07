import React from 'react';
import './App.css';


// 前台
import Index from './component/pages/frontend/Index/Index'
import Notice from './component/pages/frontend/Notice/Notice'
import File from './component/pages/frontend/File/File'
import People from './component/pages/frontend/People/People'
import overTimeReq from './component/pages/frontend/Index/requestArea/overTimeReq/overTimeReq'
//后台
import IndexBack from './component/pages/backend/IndexBack/IndexBack'
import Authority from './component/pages/backend/Authority/Authority'
import Txt from './component/pages/backend/Txt/Txt'
import FileBack from './component/pages/backend/File/File'
//公共
import NotFound from './component/laout/NotFound'
import Alert from './component/laout/Alert'
import Login from './component/laout/Login'
import LoginBack from './component/laout/LoginBack'
import AlertState from "./context/alert/alertState";
import GithubState from './context/github/githubState'
import UserState from './context/user/userState'
import GroupState from './context/group/groupState'
import RightState from './context/right/rightState'
import FileState from './context/file/fileState'
import mainState from './context/main/mainState'

import { HashRouter as Router, Switch, Route ,Redirect} from 'react-router-dom'
import MainState from './context/main/mainState';


const App = () => {  //Hooks重构App.js

  return (
    <MainState>
    <FileState>
    <RightState>
    <GroupState>
    <UserState>
    <GithubState>
      <AlertState>
        <Router>
          <div className="App">
            <Alert />
            {/* 路由切换部分 */}
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/loginBack" component={LoginBack} />
              
              {/* 前台 */}
              <Route  path="/index" component={Index} /> 
              <Route  path="/notice" component={Notice} />
              <Route  path="/file" component={File} />
              <Route  path="/people" component={People} />
              <Route  path="/index/overTimeReq" component={overTimeReq} />
              {/* 后台 */}
              <Route path ="/indexBack" component={IndexBack} />
              <Route path ="/authority" component={Authority} />
              <Route path ="/txt" component={Txt} />
              <Route path ="/fileback" component={FileBack} />


              <Route component={NotFound} />
              <Redirect to='/'/>

            </Switch>
          </div>
        </Router>
      </AlertState>
    </GithubState>
    </UserState>
    </GroupState>
    </RightState>
    </FileState>
    </MainState>
  )
}

export default App;
