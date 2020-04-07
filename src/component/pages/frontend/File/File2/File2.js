import React, { useState, useEffect, useContext,useRef } from 'react'
import { Typography, Table, Input, Tag, Button, Modal, message, Select } from 'antd'

import { Link } from 'react-router-dom'
import FileContext from '../../../../../context/file/fileContext'
import Spinner from '../../../../laout/Spinner'
import qs from 'qs'
import axios from 'axios'
import '../File1/File1.scss'
import moment from 'moment'




const File2 = (props) => {

    //基本信息
    const { Text } = Typography
    const fileUpload = useRef(null) //用于管理员上传部门头像

    //实例化context
    const fileContext = useContext(FileContext)
    const { setTitle,title='',fileType = [], getFileType, getFile, file = [], count = 0, loading } = fileContext

    //生命周期
    useEffect(() => {  //useEffect 重构生命周期didMount
        getFile(props.match.params.param, 5, 1) //默认获取第一页数据
        // eslint-disable-next-line
        getFileType(props.match.params.param) //此函数接受参数来返回一个标题名
    }, [props.match.params.param])  //生命周期依赖id变化


    //弹窗    
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)

    //独立数据区域
    const [delId, setDelId] = useState('')//当前删除的文件id
    const [currentPageName, setCurrentPageName] = useState('')

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
                if (data.status === 200 || data.status === 204) {
                    console.log(data)
                    message.info('删除文件成功！')
                    setCurrentPage(1)
                    setTimeout(() => {
                        // getGroup(5, 1)
                        getFile(props.match.params.param, 5, 1) //默认获取第一页数据
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
         formData.append('folderId',props.match.params.param) 
 
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
                         getFile(props.match.params.param, 5, 1) //默认获取第一页数据
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
        getFile(props.match.params.param, 5, v) //改变页面时，获取对应数据

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
    //获取当前页面名
    // if (fileType.length > 0) {
    //     fileType.forEach(e => {
    //         if (String(e.id) === String(props.match.params.param)) {
    //             setCurrentPageName(e.name) //设置当前页面标题名
    //         }
    //     })
    // } 





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
                    <div className='File2-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="File2-wrap__text">文件名</Text>
                        <Input
                            className="File2-wrap__input"
                            placeholder="请输入文件名称"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className='File2-wrap__div' style={{ position: 'relative' }}>
                        <Text style={{ textAlign: 'center', fontSize: 'normal' }} className="File2-wrap__text">文件</Text>
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
                <Text strong style={{ color: '#ff0000' }} className='navFont'>{title}</Text>
            </div>
            <div className='File2-wrap'>
                <Table columns={columns} dataSource={data} pagination={paginationProps} />
            </div>

        </div>
    )
}
export default React.memo(File2)
