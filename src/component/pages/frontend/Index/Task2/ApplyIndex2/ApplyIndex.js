import React, { useState, useEffect, useContext, } from 'react'
import { Typography, Table, Input, Tag, Button, Modal, message, Select } from 'antd'
import moment from 'moment'

import MainContext from '../../../../../../context/main/mainContext'

import './ApplyIndex.scss'
import { Link, Route, useHistory } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据
import axios from 'axios'
import qs from 'qs'
const ApplyIndex = (e) => {


    //基本信息区域
    const { Text } = Typography
    //实例化context
    const mainContext = useContext(MainContext)
    const { clearApply, getReqDown, reqDown = [], reqDownCount = 0, getReq, req = [], reqCount = 0, getApply, getType, apply = [], applyCount = 0, applyType = [], loading } = mainContext

    //生命周期
    useEffect(() => {
        // getApply('1') //获取待办申请
        getReq()
        getReqDown()
        getType()

        return handleClear
    }, [])

    console.log('req', req, 'reqC', reqCount)
    console.log('reqD', reqDown, 'reqDC', reqDownCount)


    const handleClear = () => {
        clearApply()
    }

    console.log('apply:', apply, applyCount)
    console.log('apply2:', applyType)


    //分页 - table 区域
    const [currentPage, setCurrentPage] = useState(1)
    const [currentTotal, setCurrentTotal] = useState(0)
    const paginationProps = {
        showSizeChanger: false,
        showQuickJumper: false,
        showTotal: () => `共${data.length > 0 && data.length}条`,
        pageSize: 5,
        current: currentPage,
        total: reqCount,
        onShowSizeChange: (current, pageSize) => changePageSize(pageSize, current),
        onChange: (current) => changePage(current),
    }

    const changePageSize = (a, b) => {
        console.log(a, b)
    }

    const changePage = (v) => {
        console.log(v)
        setCurrentPage(v)
    }


    //弹窗   
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [notice, setNotice] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管

    //暂存的用户信息
    const [delName, setDelName] = useState('')

    //驳回区域
    const showModal = (id) => {
        setVisible(true)
        console.log('deleteId= ' + id)
        setDelName(id)
    };

    const handleOk = e => {
        setVisible(false)
        console.log(delName)
        if(!notice){message.info('请输入驳回理由!');return}
        console.log(notice)

        axios.patch(`/AutomaticOfficeSystem/processCenter/api/v1/applicationStatusPass?`,
        qs.stringify({
            id:delName,
            status:'-1',
            reject:notice
        }),
        {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Accept': 'application/json;charset=UTF-8'
            }
        })
            .then((data) => {
                if (data.status === 200 || data.status === 204) {
                    message.info('驳回任务成功！')
                    setTimeout(() => {
                       getReq()
                    }, 200)
                }
            })
            .catch(() => { message.info('驳回任务失败！') })
    };

    const handleCancel = e => {
        setVisible(false)
    };


    //通过区域
    const showModal2 = (id) => {
        setVisible2(true)
        console.log('deleteId= ' + id)
        setDelName(id)
    };

    const handleOk2 = e => {
        setVisible2(false)
        console.log(delName)
        axios.patch(`/AutomaticOfficeSystem/processCenter/api/v1/applicationStatusPass?id=${delName}&status=${'1'}`)
            .then((data) => {
                if (data.status === 200 || data.status === 204) {
                    message.info('任务审批成功！')
                    setTimeout(() => {
                        getReq()
                    }, 200)
                }
            })
            .catch(() => { message.info('审批任务失败！') })
    };

    const handleCancel2 = e => {
        setVisible2(false)
    };


    const handleNoticeChange = (val) => {
        if(val.target.value.length>140){return}
        setNotice(val.target.value)
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
            key: 'date'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status'
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
                    <span onClick={() => showModal(record.key)} className='redLink' style={{ marginRight:'20px', color: 'red', position: 'relative', left: '10px' }}>驳回</span>
                    <span onClick={() => showModal2(record.key)} className='redLink' style={{ color: 'red', position: 'relative', left: '10px' }}>通过</span>
                </span>
            ),
        },
    ];

    const data = [];
    if (applyType.length > 0) {
        req.forEach((item, index) => {
            data.push({
                key: item.id,
                name: item.username ? item.username : '暂无',
                type: item.type ? applyType[item.type - 1].type_name : '暂无',
                date: item.date ? moment(item.date).format('YYYY-MM-DD') : '暂无',
                status: item.status === 0 && '待审批',

            })

        })
    }

    return (
        <div className='ApplyIndex'>
            <div>
            <div>
                <Modal
                    title="审批驳回"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    destroyOnClose={true}
                >
                    <div className='ApplyIndex-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="Right1-wrap__text">驳回理由</Text>
                        <textarea
                            className="ApplyIndex-wrap__textarea"
                            value={notice}
                            type='textarea'
                            placeholder='请输入驳回理由'
                            onChange={handleNoticeChange}/>
                    </div>
               


                </Modal>
            </div>
                <Modal
                    title='提示'
                    visible={visible2}
                    onOk={handleOk2}
                    destroyOnClose={true}
                    onCancel={handleCancel2}
                >
                    <p style={{ fontWeight: 'bold' }}>
                        确认通过此申请？
                    </p>
                </Modal>
            </div>
            <div className='ApplyIndex-box' style={{ marginBottom: '40px' }}>
                <div className='navText'><Text strong className='navFont'>进行中的任务</Text></div>
                <div className='navFinish' >
                    {/* <Text>您目前暂无申请</Text> */}
                    <Text>您目前有<span style={{ color: 'red' }}>{reqCount}</span>条待办任务</Text>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Link to='/index/task2/deal'><Text className='navFinishJump'>查看已完成任务>></Text></Link>
                        <Link to='/index/task2/cancel'><Text className='navFinishJump'>查看已驳回任务>></Text></Link>
                    </div>

                    {/* 暂无申请的情况 */}
                </div>
            </div>

            <div className='ApplyIndex-box' >
                <Table columns={columns} dataSource={data} pagination={paginationProps} />
            </div>


        </div>
    )
}

export default React.memo(ApplyIndex)
