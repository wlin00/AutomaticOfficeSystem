import React ,{useContext}from 'react';
import AlertContext from '../../context/alert/alertContext'

const Alert = () => {
    const alertContext = useContext(AlertContext) //拿到alertContext 的 context实例
    const {alert} = alertContext; // 解构state中的字段alet
    return (
        alert !== null &&
        (
        <div className={`alert alert-${alert.type}`}>
           <i className="fa fa-info-circle" style={{marginRight:"5px"}}></i> 
          {alert.msg}    
        </div>
        )
    )
}

export default Alert
