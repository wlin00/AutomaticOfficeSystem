import React, { useEffect, useState, useContext, useRef } from 'react'
import { Typography, Table, Input, Button, Modal, message } from 'antd'
import { Link } from 'react-router-dom'
import Spinner from '../../../../laout/Spinner'
import RightContext from '../../../../../context/right/rightContext'

import moment from 'moment'
import axios from 'axios'
import qs from 'qs'

import '../InfoManage/InfoManage.scss'




const InfoManage = (e) => {

    //基础信息
    const fileUpload = useRef(null) //用于管理员上传缩略图
    const [imgUrl,setImgUrl] = useState('')//用于存储上传后的头像地址
    
    const { Text } = Typography
    const { Search } = Input
    const [delName, setDelName] = useState('')//当前删除的用户
    const [editContent, setEditContent] = useState('')//当前删除的用户
    const [editId, setEditId] = useState('')//当前删除的用户
    const [editTitle, setEditTitle] = useState('')//当前删除的用户
    const [editPreview, setEditPreview] = useState('')//当前删除的用户

    //实例化context
    const rightContext = useContext(RightContext)
    const { clearMess, getMess, mess = [], messCount = 0, loading } = rightContext


    //生命周期
    useEffect(() => {  //useEffect 重构生命周期didMount
        getMess()
        return handleWillUnMount
        // eslint-disable-next-line
    }, [])

    const handleWillUnMount = () => {
        clearMess()
    }
    console.log(messCount, mess)


    //上传缩略题
    const handleUpload = () => {

        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        //检测用户是否上传部门图标
        if (fileUpload.current.files[0] === undefined) {
            message.info('请上传缩略图!')
            return
        }

        //将图片存放在formData对象里
        let formData = new FormData()
        formData.append('file', fileUpload.current.files[0])

        axios.post('/AutomaticOfficeSystem/announcement/api/v1/messagePreview', formData, config).then(data => {
            if (data.status === 200 || data.status === 201) {
                console.log(data.data.data.path)
                // let link = 'http://l1nkkk.xyz:3001'
                // let imgUrl = data.data.img
                let img = data.data.data.path
                setImgUrl(img)
                message.info('上传缩略图成功~')
            }
            else {
                message.info('上传缩略图失败，请重试');
                return
            }
        }).catch(err => {
            message.info(err)
        })
    }
    //弹窗    
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)

    //删除弹窗    
    const showModal = (id) => {
        setVisible(true)
        setDelName(id)
    };

    const handleOk = e => {
        setVisible(false)
        console.log('currentDel', delName)

        axios.delete(`/AutomaticOfficeSystem/announcement/api/v1/message?id=${delName}`)
            .then((data) => {
                if (data.status === 200 || data.status === 204) {
                    console.log(data)
                    message.info('删除成员成功！')
                    setCurrentPage(1)
                    setTimeout(() => {
                        getMess()
                    }, 200)
                }
            })
            .catch(() => { message.info('删除成员失败！') })
    };

    const handleCancel = e => {
        setVisible(false)
    };



    //编辑成员页面逻辑部分
    const showModal2 = (id) => {
        setVisible2(true)
        mess.forEach(e => {
            if (e.id === id) {
                setEditContent(e.content)
                setEditId(e.id)
                setEditTitle(e.title)
                setEditPreview(e.preview)
            }
        })



    };

    const clearEdit = () => {
        setEditContent('')
        setEditId('')
        setEditTitle('')
        setEditPreview('')
    }

    // 信息编辑区域，数据双向绑定
    const handleContentChange = (val) => {
        if (val.target.value.length > 140) { return }
        setEditContent(val.target.value)
    }
    const handleTitleChange = (val) => {
        if (val.target.value.length > 30) { return }
        setEditTitle(val.target.value)
    }

    //提交编辑
    const handleOk2 = e => { //提交编辑
        setVisible2(false)

        if (!editContent || !editId || !editPreview || !editTitle ) {
            message.info('请正确输入用户信息')
            clearEdit()
            return
        }
        if (editTitle.length > 30) {
            message.info('信息标题长度为30位以内')
            clearEdit()
            return
        }
        if (editContent.length > 140) {
            message.info('信息内容长度为30位以内')
            clearEdit()
            return
        }


        //编辑信息
        axios.patch('/AutomaticOfficeSystem/announcement/api/v1/message',
            qs.stringify({
                content:editContent,
                id:editId,
                title:editTitle,
                preview:imgUrl?imgUrl:editPreview,
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
                if (data.status === 200 || data.status === 204) {

                    message.info('编辑信息成功');
                    clearEdit();
                    setCurrentPage(1)
                    setTimeout(() => {
                        getMess()
                    }, 200)
                }
                else {
                    message.info('更改失败，请重试');
                    clearEdit();
                    return
                }
            }, () => {
                return Promise.reject('请求失败，请重试')
            }).catch(err => {
                message.info(err)
                console.log(err)
                clearEdit()
            })
    };

    const handleCancel2 = e => {
        setVisible2(false)
        clearEdit()
    };



    //分页
    const [currentPage, setCurrentPage] = useState(1)
    const paginationProps = {
        showSizeChanger: false,
        showQuickJumper: false,
        showTotal: () => `共${messCount}条`,
        pageSize: 5,
        current: currentPage,
        total: messCount,
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






    const columns = [
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '发布日期',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '发布人',
            dataIndex: 'name',
            key: 'name',
        },


        {
            title: '操作',
            key: 'action',
            render: (text, record, index) => (
                <span>
                    {/* <Link to={`/txt/infoEdit/${record.key}`}><span className='redLink' style={{ color: 'red' }}>编辑</span></Link> */}
                    <span onClick={() => { showModal2(record.key) }} className='redLink' style={{ color: 'red' }}>编辑</span>
                    <span onClick={() => showModal(record.key)} className='redLink' style={{ color: 'red', position: 'relative', left: '10px' }}>删除</span>
                </span>
            ),
        },
    ];

    const data = [];
    if (mess.length >0) {
        mess.forEach((item, index) => {
            data.push({
                key: item.id,
                title: item.title ? item.title : '未填写',
                date: item.publish_date ? moment(item.publish_date).format('YYYY-MM-DD') : '未填写',
                name: item.publisher ? item.publisher : '未填写',
            })
        })
    }



    if (loading) { return <Spinner></Spinner> }
    return (
        <div className='InfoManage'>
            <div>
                <Modal
                    title='提示'
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <p style={{ fontWeight: 'bold' }}>
                        确认删除此信息？
                    </p>
                </Modal>
            </div>
            <div>
                <Modal
                    title="编辑信息"
                    visible={visible2}
                    onOk={handleOk2}
                    onCancel={handleCancel2}
                    destroyOnClose={true}
                >
                    <div className='TeamManage-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="List-wrap__text">真实姓名</Text>
                        <Input
                            style={{ marginBottom: '10px' }}
                            className="TeamManage-wrap__input"
                            placeholder="请输入标题"
                            value={editTitle}
                            onChange={handleTitleChange}
                        />
                    </div>

                    <div className='TeamManage-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="List-wrap__text">缩略图</Text>
                        <input type="file" ref={fileUpload} className='InfoManage-wrap__input' />
                        <Button className='InfoManage-btn' type='danger' onClick={handleUpload}>上传</Button>

                    </div>

                    <div className='TeamManage-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="List-wrap__text">信息内容</Text>
                        <Input
                            style={{ marginBottom: '10px' }}
                            className="TeamManage-wrap__input"
                            placeholder="请输入信息内容"
                            value={editContent}
                            onChange={handleContentChange}
                        />
                    </div>

                </Modal>
            </div>
            <div className='navText'>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>信息管理</Text>
            </div>
            <ul className='InfoManage-ul'>
                <li className='InfoManage-ul__li'>
                    <Link to='/txt/infoAdd'><Button className='InfoManage-ul__li--link' style={{ fontSize: '15px' }}>添加信息</Button></Link>
                </li>


            </ul>
            <div className='InfoManage-wrap'>
                <Table columns={columns} dataSource={data} pagination={paginationProps} />
            </div>

        </div>
    )
}

export default React.memo(InfoManage)
