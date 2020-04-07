import React, { useState, useEffect, useContext } from 'react'
import { Typography, Table, Input, Tag, Button, Modal, message, Select } from 'antd'


import '../Task/Task.scss'


const Task = (e) => {


    //基本信息区域
    const { Text } = Typography
    
    //生命周期
    useEffect(()=>{

    },[])
    
    //分页 - table 区域
     const [currentPage, setCurrentPage] = useState(1)
     const paginationProps = {
         showSizeChanger: false,
         showQuickJumper: false,
         showTotal: () => `共7条`,
         pageSize: 5,
         current: currentPage,
         total: 7,
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
        //  {
        //     title: '状态',
        //     dataIndex: 'status',
        //     key:'status'
        //  },
         {
             title: '操作',
             key: 'action',
             render: (text, record) => (
                 <span>
                     <span className='redLink' style={{color:'red',marginRight:'20px'}}>通过</span>
                     <span className='redLink' style={{color:'red'}}>拒绝</span>

                 </span>
             ),
         },
     ];
 
     const data = [
         {
             key: '1',
             name: 'liyunlong',
             type:1,
             date: '1000222939',
         },
         {
            key: '2',
            name: 'liyunlong',
            type:1,
            date: '1000222939',
        },
        {
            key: '3',
            name: 'liyunlong',
            type:1,
            date: '1000222939',
        },
        {
            key: '4',
            name: 'liyunlong',
            type:1,
            date: '1000222939',
        },
        {
            key: '5',
            name: 'liyunlong',
            type:1,
            date: '1000222939',
        },
        {
            key: '6',
            name: 'liyunlong',
            date: '1000222939',
        },
        {
            key: '7',
            name: 'liyunlong',
            type:1,
            date: '1000222939',
        },
     ]; 

    return (
        <div className='TrackProcess'>

           <div className='Task-box' style={{marginBottom:'40px'}}>
           <div className='navText'><Text strong className='navFont'>进行中的任务</Text></div>
            <div className='navFinish' >
                <Text>您目前暂无任务</Text>
                <Text className='navFinishJump'>查看已完成任务>></Text>
                {/* 暂无申请的情况 */}
            </div>
           </div>

           <div className='Task-box' >
           <Table columns={columns} dataSource={data} pagination={paginationProps} />
           </div>
           

        </div>
    )
}
export default Task
