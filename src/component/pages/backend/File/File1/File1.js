import React, { useState, useEffect, useContext,useRef } from 'react'
import { Typography, Table, Input, Tag, Button, Modal, message, Select } from 'antd'

import { Link } from 'react-router-dom'
import FileContext from '../../../../../context/file/fileContext'
import Spinner from '../../../../laout/Spinner'
import qs from 'qs'
import axios from 'axios'
import '../File1/File1.scss'
import moment from 'moment'



const File1 = (e) => {

    //基本信息
    const { Text } = Typography
    const fileUpload = useRef(null) //用于管理员上传部门头像


    //实例化context
    const fileContext = useContext(FileContext)
    const { getFile, file = [], count = 0, loading } = fileContext

    //生命周期
    useEffect(() => {  //useEffect 重构生命周期didMount
        getFile(1, 5, 1) //默认获取第一页数据
        // eslint-disable-next-line
    }, [])

    //弹窗    
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)

    //独立数据区域
    const [delId, setDelId] = useState('')//当前删除的文件id


    //删除文件区域
    const showModal = (id) => {
        setVisible(true)
        console.log('delId: ' + id)
        setDelId(id)
    };

    const handleOk = e => {
        setVisible(false)
        axios.delete(`/AutomaticOfficeSystem/fileManagement/api/v1/file?fileId=${delId}`)
            .then((data) => {
                if (data.status === 200 || data.status=== 204) {
                    console.log(data)
                    message.info('删除文件成功！')
                    setCurrentPage(1)
                    setTimeout(() => {
                        // getGroup(5, 1)
                        getFile(1, 5, 1) //默认获取第一页数据
                    }, 200)
                }
            })
            .catch(() => { message.info('删除文件失败！') })
    };

    const handleCancel = e => {
        setVisible(false)
    };


    //添加文件区域
    
    const [name, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管

    const handleNameChange = (val) => {
        if (val.target.value.length > 30) { return }
        setName(val.target.value)
    }

    const showModal1 = () => {
        setVisible1(true)
    };

    const clearData = ()=>{
        setName('')
    }
 

    const handleOk1 = e => {
        setVisible1(false)
        //检测用户是否上传文件
        if(fileUpload.current.files[0] === undefined){
            message.info('请上传文件!')
            clearData()
            return
        }

        if (!name) {
            message.info('请输入文件名称！')
            clearData()
            return
        }
        if (name.length < 1 || name.length > 30) {
            message.info('文件名长度错误！')
            clearData()
            return
        }

        //将文件存放在formData对象里
        let formData = new FormData()
        formData.append('file',fileUpload.current.files[0])
        formData.append('fileName',name)
        formData.append('folderId','1') 

        axios.post('/AutomaticOfficeSystem/fileManagement/api/v1/uploadFile', formData,
        {
            headers: {
                'content-type': 'multipart/form-data',
            }
        }
        ).then(
            (data) => {
                console.log(data)
                if (data.status === 200 || data.status === 201) {

                    message.info('添加文件成功～');
                    setCurrentPage(1)
                    clearData()
                    setTimeout(() => {
                        getFile(1, 5, 1) //默认获取第一页数据
                    }, 200)
                }
                else {
                    message.info('添加文件失败，请重试！');
                    return
                }
            }, () => {
                return Promise.reject('请求失败，请重试！')
            }).catch(err => {
                message.info(err)
            })
        
        
    };

    const handleCancel1 = e => {
        setVisible1(false)
        clearData()

    };

    //分页
    const [currentPage, setCurrentPage] = useState(1)
    const paginationProps = {
        showSizeChanger: false,
        showQuickJumper: false,
        showTotal: () => `共${count}条`,
        pageSize: 5,
        current: currentPage,
        total: count,
        onShowSizeChange: (current, pageSize) => changePageSize(pageSize, current),
        onChange: (current) => changePage(current),
    }

    const changePageSize = (a, b) => {
        console.log(a, b)
    }

    const changePage = (v) => {
        console.log(v)
        setCurrentPage(v)
        getFile(1, 5, v) //改变页面时，获取对应数据

    }

    // const handleDownload = (path,name) =>{
    //     console.log(path)
    //     //动态创建a标签并插入body
    //     const oa = document.createElement('a')
    //     oa.href =  'http://52.80.161.97:9616/AutomaticOfficeSystem/files_cache/ca9aee4fd2964d19bbfdd674a4377ab6.pdf'
    //     oa.target="_blank"; // 针对 ie模式 的浏览器
    //     oa.setAttribute('target','_blank')
    //     oa.setAttribute('download',path)
    //     // oa.download =name
    //     document.body.appendChild(oa)
    //     oa.click()
    //     document.body.removeChild(oa)


    // }

   



    const columns = [
        {
            title: '名称',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '上传时间',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '上传人',
            dataIndex: 'name',
            key: 'name',
        },


        {
            title: '操作',
            key: 'action',
            render: (text, record, index) => (
                <span>
                   <span><a download href={record.link.slice(24)} style={{ color: 'red' }}>下载</a></span>
                    <span onClick={() => showModal(record.key)} className='redLink' style={{ color: 'red', position: 'relative', left: '10px' }}>删除</span>
                </span>
            ),
        },
    ];

    const data = [];
    if (file.length > 0) {
        file.forEach((item, index) => {
            data.push({
                key: item.id,
                title: item.name ? item.name : '未填写',
                date: item.uoload_date ? moment(item.uoload_date).format('YYYY-MM-DD') : '未填写',
                name: item.uploader ? item.uploader : '未填写',
                link: item.path? item.path:''
            })
        })
    }



    if (loading) { return <Spinner></Spinner> }
    return (
        <div className='File1'>
            <div>
                <Modal
                    title="添加文件"
                    visible={visible1}
                    onOk={handleOk1}
                    onCancel={handleCancel1}
                    destroyOnClose={true}
                >
                    <div className='File1-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="File1-wrap__text">文件名</Text>
                        <Input
                            className="File1-wrap__input"
                            placeholder="请输入文件名称"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className='File1-wrap__div' style={{ position: 'relative' }}>
                        <Text style={{ textAlign: 'center', fontSize: 'normal' }} className="File1-wrap__text">文件</Text>
                        <span><input type="file" className='File1-wrap__input' ref={fileUpload} /></span>
                    </div>

                </Modal>
            </div>
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
            <div className='navText'>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>合同模版</Text>
            </div>
            <ul className='File1-ul'>
                <li className='File1-ul__li'>
                    <Button onClick={showModal1} className='File1-ul__li--link' style={{ fontSize: '15px' }}>上传文件</Button>
                </li>
            </ul>
            <div className='File1-wrap'>
                <Table columns={columns} dataSource={data} pagination={paginationProps} />
            </div>

        </div>
    )
}

export default React.memo(File1)
