import React ,{Fragment} from 'react'
import loading from '../laout/loading.gif'

const Spinner = () => {
   return  <Fragment>
       <img src={loading} alt="loading..." style={{
           display:"block",width:"100%",margin:"auto"
       }}/>
    </Fragment>
};

export default Spinner
