import React, { useEffect, useState, useContext } from 'react'
import { Typography, Table, Input, Tag, Icon, Modal, Select, Button, message } from 'antd'
import RightContext from '../../../../../context/right/rightContext'
import Spinner from '../../../../laout/Spinner'
import qs from 'qs'
import axios from 'axios'

import '../Right1/Right1.scss'




const Right1 = (e) => {

    //基本信息
    const { Text } = Typography
    const { Search } = Input
    const { Option } = Select
    const addType = '行政审批' //要添加的人员的权限类型

    //实例化context
    const rightContext = useContext(RightContext)
    const { clearData, right = [], getRight, rightCount = 0, getDutyList, getDepartment, loading, duty = [], department = [] } = rightContext

    //生命周期
    useEffect(() => {  //useEffect 重构生命周期didMount、willUnMount

        getRight(1)     //获取审批列表，前端分页
        getDutyList()   //拉取职务信息外键
        getDepartment() //拉取部门信息外键

        return handleWillUnMount
        // eslint-disable-next-line
    }, [])

    // console.log(right, rightCount, '!!')

    //处理卸载组件
    const handleWillUnMount = () => {
        clearData()
    }

    //弹窗表单 -- 添加
    const [username, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
 
    const handleNameChange = (val) => {
        if (val.target.value.length > 30) { return }
        setName(val.target.value)
    }
   

    //弹窗    
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)

    //暂存的用户信息
    const [delName, setDelName] = useState('')

    //用户添加区域
    const showModal = () => {
        setVisible(true)
    };

    const clearName = () =>{
        setName('')
    }

    const handleOk = e => {
        setVisible(false)
        console.log(typeof username,addType,'info')
        if(!username){
            message.info('请输入需添加的用户名!')
            clearName()
            return
        }

         //添加成员
         axios.put('/AutomaticOfficeSystem/approvalManagement/api/v1/approvalUser',
         qs.stringify({
            permission:'1',
            userUsername:username
         }),
         {
             headers: {
                 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
                 'Accept': 'application/json;charset=UTF-8'
             }
         }
     ).then(
         (data) => {
             console.log(data)
             if (data.status === 200 || data.status === 201) {

                 message.info('新增成员成功');
                 clearName();
                 setCurrentPage(1)
                 setTimeout(() => {
                     getRight(1)
                 }, 200)

             }
             else {
                 message.info('更改失败，请重试');
                 clearName();
                 return
             }
         }, () => {
             return Promise.reject('请求失败，请重试')
         }).catch(err => {
             message.info(err)
             clearName()
         })
 

    };

    const handleCancel = e => {
        setVisible(false)
        clearName()
    };

    //删除区域
    const showModal2 = (id) => {
        setVisible2(true)
        console.log('deleteId= ' + id)
        right.forEach(e => {
            if (e.id === id) {
                setDelName(e.username)
            }
        })
    };

    const handleOk2 = e => {
        setVisible2(false)
        console.log(delName)
        axios.delete(`/AutomaticOfficeSystem/approvalManagement/api/v1/approvalUser?permission=${'1'}&userUsername=${delName}`)
            .then((data) => {
                if (data.status === 200 || data.status === 204) {
                    console.log(data)
                    message.info('删除成员成功！')
                    setCurrentPage(1)
                    setTimeout(() => {
                        getRight(1)
                    }, 200)
                }
            })
            .catch(() => { message.info('删除成员失败！') })
    };

    const handleCancel2 = e => {
        setVisible2(false)
    };

    //分页
    const [currentPage, setCurrentPage] = useState(1)
    const paginationProps = {
        showSizeChanger: false,
        showQuickJumper: false,
        showTotal: () => `共${rightCount}条`,
        pageSize: 5,
        current: currentPage,
        total: rightCount,
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

    // const paginationProps = {
    //     showSizeChanger: true,
    //     showQuickJumper: false,
    //     showTotal: () => `共${totals}条`,
    //     pageSize: this.state.pageSize,
    //     current: page.pageNum,
    //     total: page.total,
    //     onShowSizeChange: (current, pageSize) => this.changePageSize(pageSize, current),
    //     onChange: (current) => this.changePage(current),
    // }




    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '联系方式',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '邮箱',
            dataIndex: 'mail',
            key: 'mail',
        },
        {
            title: '职务',
            dataIndex: 'job',
            key: 'job',
        },

        {
            title: '部门',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <span>
                    {tags.map(tag => {
                        let color = 'geekblue';

                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </span>
            ),
        },



        {
            title: '操作',
            key: 'action',
            render: (text, record, index) => (
                <span>
                    {/* <span style={{ color: 'red' }}>编辑</span> */}
                    <span onClick={() => showModal2(record.key)} className='redLink' style={{ color: 'red', position: 'relative', left: '10px' }}>删除</span>
                </span>
            ),
        },
    ];

    const data = [];
    if (right.length >0) {
        right.forEach((item, index) => {
            data.push({
                key: item.id,
                //img: item.portraits == 'default.png' ? imgUser : 'http://52.80.161.97:9616/AutomaticOfficeSystem/portraits/' + item.portraits,
                name: item.name ? item.name : '未填写',
                phone: item.tel ? item.tel : '未填写',
                mail: item.email ? item.email : '未填写',
                job: item.id && item.duty && duty.length > 0 ? duty[item.duty - 1].dutyName : '未填写',
                // tags: item.right === 0 ? ['普通用户'] : ['管理员']
                tags: item.id && item.duty && department.length > 0 ? [`${((department[item.department - 1].name))}`] : ['未填写']
            })
        })
    }



    if (loading) { return <Spinner></Spinner> }
    return (
        <div className='Right1'>
            <div>
                <Modal
                    title="添加审批人员"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    destroyOnClose={true}
                >
                    <div className='Right1-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="Right1-wrap__text">职务</Text>
                        <Input
                            className="Right1-wrap__input"
                            placeholder="请输入审批权限"
                            value={addType}
                            disabled={true}

                            
                        />
                    </div>
                    <div className='Right1-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="Right1-wrap__text">用户名</Text>
                        <Input
                            className="Right1-wrap__input"
                            placeholder="请输入用户名"
                            value={username}
                            onChange={handleNameChange}
                        />
                    </div>



                </Modal>
            </div>

            <div>
                <Modal
                    title='提示'
                    visible={visible2}
                    onOk={handleOk2}
                    destroyOnClose={true}
                    onCancel={handleCancel2}
                >
                    <p style={{ fontWeight: 'bold' }}>
                        确认删除此成员？
                    </p>
                </Modal>
            </div>

            <ul className='Right1-ul'>
                <li className='Right1-ul__li Right1-ul__li--posi'   >
                    <Button onClick={showModal} style={{ border: "none" }}>
                        <Icon className='Right1-ul__li--icon' type="plus-square" />
                        <Text className='addText' style={{ position: 'relative', left: '5px' }}>添加成员</Text>
                    </Button>
                </li>

            </ul>
            <div className='Right1-wrap'>
                <Table columns={columns} dataSource={data} pagination={paginationProps} />
            </div>

        </div>
    )
}

export default React.memo(Right1)



