import React, { useState, useEffect, useContext, } from 'react'
import { Typography, Table, Input, Tag, Button, Modal, message, Select } from 'antd'
import moment from 'moment'

import MainContext from '../../../../../../context/main/mainContext'

import '../ApplyCancel/ApplyCancel.scss'
import { Link, Route,useHistory } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据


const ApplyCancel = (e) => {


    //基本信息区域
    const { Text } = Typography
    //实例化context
    const mainContext = useContext(MainContext)
    const {clearApply,getApply,getType,apply=[],applyCount=0,applyType=[],loading } = mainContext

    //生命周期
    useEffect(()=>{
       getApply('2') //获取待办申请
       getType()

       return handleClear
    },[])

    const handleClear  = () =>{
        clearApply()
        clearRes()
    }

    console.log('当前申请总数据',apply,applyCount)
    console.log('类型数据:',applyType)



    
     //弹窗区域
     const [visible, setVisible] = useState(false)
 
     //驳回数据结构区域
     const [resName, setResName] = useState('') //审批人名
     const [resInfo, setResInfo] = useState(''); //审批人信息
     
     //清除驳回数据
     const clearRes = () =>{
         setResName('')
         setResInfo('')
     } 
     //驳回信息区域
     const showModal = (id) => {
         setVisible(true)

        apply.forEach(e=>{
            if(e.id === id){
                setResName(e.processor)
                setResInfo(e.reject)

            }
        })
         
     };
 
 
     const handleOk = e => {
         setVisible(false)
         clearRes()
     };
 
     const handleCancel = e => {
         setVisible(false)
         clearRes()
     };
    
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
         {
            title: '答复信息',
            dataIndex: 'response',
            key:'response'
         },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <span onClick={() => showModal(record.key)} className='redLink' style={{ color: 'red', position: 'relative', left: '10px' }}>查看</span>

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
                    status:item.status===-1 && '已驳回',
                    processor:item.processor?item.processor:'暂无',
                    response:item.reject?(item.reject.length>15?item.reject.slice(0,15)+'...':item.reject):'暂无'
                    

                })
   
        })
    }
    
    return (
        <div className='ApplyCancel'>
            <div>
                <Modal
                    title="查看驳回信息"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    destroyOnClose={true}
                >
                    <div className='ApplyCancel-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="Right1-wrap__text">审批人</Text>
                        <Input
                            className="ApplyCancel-wrap__input"
                            placeholder="审批人"
                            value={resName}
                            disabled={true}

                            
                        />
                    </div>
                    <div className='ApplyCancel-wrap__div' style={{marginTop:'17px'}}>
                        <Text style={{ fontSize: 'normal' }} className="Right1-wrap__text">驳回信息</Text>
                        <textarea
                            className="ApplyCancel-wrap__textarea"
                            value={resInfo}
                            type='textarea'
                            disabled={true}
                        />
                    </div>



                </Modal>
            </div>

           <div className='ApplyCancel-box' style={{marginBottom:'40px'}}>
           <div className='navText'><Text strong className='navFont'>已驳回的申请</Text></div>
            <div className='navFinish' >
                {/* <Text>您目前暂无申请</Text> */}
                <Text>您目前有<span style={{color:'red'}}>{applyCount}</span>条已驳回申请</Text>
                
                <div style={{display:'flex',flexDirection:'column'}}>
                <Link to='/index/trackProcess' className='ApplyCancel-link' ><Button className='ApplyCancel-btn' type='danger'>返回</Button></Link>
                    </div>

                {/* 暂无申请的情况 */}
            </div>
           </div>

           <div className='ApplyCancel-box' >
           <Table columns={columns} dataSource={data} pagination={paginationProps} />
           </div>
           

        </div>
    )
}

export default React.memo(ApplyCancel)
