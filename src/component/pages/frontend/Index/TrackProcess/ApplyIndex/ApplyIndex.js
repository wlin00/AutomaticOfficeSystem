import React, { useState, useEffect, useContext, } from 'react'
import { Typography, Table, Input, Tag, Button, Modal, message, Select } from 'antd'
import moment from 'moment'

import MainContext from '../../../../../../context/main/mainContext'

import '../ApplyIndex/ApplyIndex.scss'
import { Link, Route, useHistory } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据
import axios from 'axios'

const ApplyIndex = (e) => {


    //基本信息区域
    const { Text } = Typography
    //实例化context
    const mainContext = useContext(MainContext)
    const { clearApply, getApply, getType, apply = [], applyCount = 0, applyType = [], loading } = mainContext

    //生命周期
    useEffect(() => {
        getApply('1') //获取待办申请
        getType()

        return handleClear
    }, [])

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
        total: applyCount,
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
    const [visible2, setVisible2] = useState(false)

    //暂存的用户信息
    const [delName, setDelName] = useState('')


    //删除区域
    const showModal2 = (id) => {
        setVisible2(true)
        console.log('deleteId= ' + id)
        setDelName(id)
    };

    const handleOk2 = e => {
        setVisible2(false)
        console.log(delName)
        axios.patch(`/AutomaticOfficeSystem/processCenter/api/v1/cancelApplication?id=${delName}`)
            .then((data) => {
                if (data.status === 200 || data.status === 204) {
                    message.info('取消申请成功！')
                    setTimeout(() => {
                        getApply('1')
                    }, 200)
                }
            })
            .catch(() => { message.info('取消申请失败！') })
    };

    const handleCancel2 = e => {
        setVisible2(false)
    };



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
                    <span onClick={() => showModal2(record.key)} className='redLink' style={{ color: 'red', position: 'relative', left: '10px' }}>取消申请</span>
                </span>
            ),
        },
    ];

    const data = [];
    if (applyType.length > 0) {
        apply.forEach((item, index) => {
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
                <Modal
                    title='提示'
                    visible={visible2}
                    onOk={handleOk2}
                    destroyOnClose={true}
                    onCancel={handleCancel2}
                >
                    <p style={{ fontWeight: 'bold' }}>
                        确认取消此申请？
                    </p>
                </Modal>
            </div>
            <div className='ApplyIndex-box' style={{ marginBottom: '40px' }}>
                <div className='navText'><Text strong className='navFont'>进行中的申请</Text></div>
                <div className='navFinish' >
                    {/* <Text>您目前暂无申请</Text> */}
                    <Text>您目前有<span style={{ color: 'red' }}>{applyCount}</span>条待办申请</Text>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Link to='/index/trackProcess/deal'><Text className='navFinishJump'>查看已完成申请>></Text></Link>
                        <Link to='/index/trackProcess/cancel'><Text className='navFinishJump'>查看已驳回申请>></Text></Link>
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
