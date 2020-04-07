import React, { useState, useEffect, useContext, } from 'react'
import { Typography, Table, Input, Tag, Button, Modal, message, Select } from 'antd'
import moment from 'moment'

import MainContext from '../../../../../context/main/mainContext'

import '../TrackProcess/TrackProcess.scss'
import { Link, Route,useHistory } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据
import ApplyIndex from './ApplyIndex/ApplyIndex'
import ApplyCancel from './ApplyCancel/ApplyCancel'
import ApplyDeal from './ApplyDeal/ApplyDeal'



const TrackProcess = (e) => {


    //基本信息区域
    const { Text } = Typography
    //实例化context
    const mainContext = useContext(MainContext)
    const {clearApply,getApply,getType,apply=[],applyCount=0,applyType=[],loading } = mainContext

    //生命周期
    useEffect(()=>{
    },[])

    const handleClear  = () =>{
        clearApply()
    }

    console.log('apply:',apply,applyCount)
    console.log('apply2:',applyType)

    
    //分页 - table 区域
     const [currentPage, setCurrentPage] = useState(1)
     const [currentTotal,setCurrentTotal] = useState(0)
     const paginationProps = {
         showSizeChanger: false,
         showQuickJumper: false,
         showTotal: () => `共${data.length>0 && data.length}条`,
         pageSize: 5,
         current: currentPage,
         total: applyCount,
         onShowSizeChange: (current, pageSize) => changePageSize(pageSize, current),
         onChange: (current) => changePage(current),
     }
 
     const changePageSize=(a,b)=>{
         console.log(a,b)
     }
 
     const changePage=(v)=>{
         console.log(v)
         setCurrentPage(v)
     }
 
 
    
 
 
 
 
    
     const columns = [
        {
            title: '用户名',
            dataIndex: 'name',
            key: 'name',
            render: text => <span>{text}</span>,
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '时间',
            dataIndex: 'date',
            key:'date'
        },
        {
           title: '状态',
           dataIndex: 'status',
           key:'status'
        },
        // {
        //     title: '审批人',
        //     dataIndex: 'processor',
        //     key:'processor'
        //  },
        //  {
        //     title: '答复信息',
        //     dataIndex: 'response',
        //     key:'response'
        //  },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <span className='redLink' style={{color:'red'}}>取消申请</span>
                </span>
            ),
        },
    ];

    const data = []; 
    if ( applyType.length >0) {
        apply.forEach((item, index) => {
                data.push({
                    key:item.id,
                    name:item.username?item.username:'暂无',
                    type:item.type?applyType[item.type-1].type_name:'暂无',
                    date:item.date?moment(item.date).format('YYYY-MM-DD'):'暂无',
                    status:item.status===0 && '待审批',

                })
   
        })
    }
    
    return (
        <div className='TrackProcess'>

        <Route path='/index/trackProcess' exact component={ApplyIndex} />
        <Route path='/index/trackProcess/deal' exact component={ApplyDeal} />
        <Route path='/index/trackProcess/cancel' exact component={ApplyCancel} />
            
           

        </div>
    )
}

export default React.memo(TrackProcess)
