import React, { useState, useEffect, useContext, } from 'react'
import { Typography, Table, Input, Tag, Button, Modal, message, Select } from 'antd'
import moment from 'moment'

import MainContext from '../../../../../../context/main/mainContext'

import './ApplyDeal.scss'
import { Link, Route,useHistory } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据


const ApplyDeal = (e) => {


    //基本信息区域
    const { Text } = Typography
    //实例化context
    const mainContext = useContext(MainContext)
    const {clearApply,getApply,getType,apply=[],applyCount=0,applyType=[],loading } = mainContext

    //生命周期
    useEffect(()=>{
       getApply('3') //获取通过申请
       getType()

       return handleClear
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
        {
            title: '审批人',
            dataIndex: 'processor',
            key:'processor'
         },
        //  {
        //     title: '答复信息',
        //     dataIndex: 'response',
        //     key:'response'
        //  },
        
        // {
        //     title: '操作',
        //     key: 'action',
        //     render: (text, record) => (
        //         <span>
        //             <span className='redLink' style={{color:'red'}}>取消申请</span>
        //         </span>
        //     ),
        // },
    ];

    const data = []; 
    if ( applyType.length >0) {
        apply.forEach((item, index) => {
                data.push({
                    key:item.id,
                    name:item.username?item.username:'暂无',
                    type:item.type?applyType[item.type-1].type_name:'暂无',
                    date:item.date?moment(item.date).format('YYYY-MM-DD'):'暂无',
                    status:item.status===1 && '已通过',
                    processor:item.processor?item.processor:'暂无',
                })
   
        })
    }
    
    return (
        <div className='ApplyDeal'>

           <div className='ApplyDeal-box' style={{marginBottom:'40px'}}>
           <div className='navText'><Text strong className='navFont'>已通过的任务</Text></div>
            <div className='navFinish' >
                {/* <Text>您目前暂无申请</Text> */}
                <Text>您目前有<span style={{color:'red'}}>{applyCount}</span>条已通过任务</Text>
                
                <div style={{display:'flex',flexDirection:'column'}}>
                <Link to='/index/task2' className='ApplyDeal-link' ><Button className='ApplyDeal-btn' type='danger'>返回</Button></Link>
                    </div>

                {/* 暂无申请的情况 */}
            </div>
           </div>

           <div className='ApplyDeal-box' >
           <Table columns={columns} dataSource={data} pagination={paginationProps} />
           </div>
           

        </div>
    )
}

export default React.memo(ApplyDeal)
