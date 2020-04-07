import React, { useEffect, useState, useContext,useRef } from 'react'
import { Typography, Table, Input, Tag, Button, Modal, message, Select } from 'antd'
import { Link } from 'react-router-dom'
import FileContext from '../../../../../context/file/fileContext'
import Spinner from '../../../../laout/Spinner'
import { SyncOutlined } from '@ant-design/icons';

import moment from 'moment'
import qs from 'qs'
import axios from 'axios'
import '../FileSearch/FileSearch.scss'



const FileSearch = (props) => {

    //基本信息
    const { Text } = Typography
    const { Search } = Input
    const { Option } = Select


    //实例化context
    const fileContext = useContext(FileContext)
    const { val,setMode, mode, _getFile, _file=[], _count=0,  loading } = fileContext
  
    console.log(props.location.query,'*')

    useEffect(() => {  //useEffect 重构生命周期didMount
        //由用户是否搜索来判断加载
        // console.log(props.location.query)
        props.location.query!== undefined &&  _getFile(props.location.query.name, 5, 1)       
        return handleComponentWillUnMount
    }, [])

    const handleComponentWillUnMount = () => {
        setMode(false)
    }

     console.log(props.location.query,'qqq')


        //弹窗    
    const [visible, setVisible] = useState(false)

    //独立数据区域
    const [delId, setDelId] = useState('')//当前删除的文件id

    //删除文件区域
    const showModal = (id) => {
        setVisible(true)
        setDelId(id)
    };

    const handleOk = e => {
        setVisible(false)
        axios.delete(`/AutomaticOfficeSystem/fileManagement/api/v1/file?fileId=${delId}`)
            .then((data) => {
                if (data.status === 200 || data.status === 204) {
                    message.info('删除文件成功！')
                    setCurrentPage(1)
                    setTimeout(() => {
                         props.history.push({ pathname: '/file'})
                    }, 200)
                }
            })
            .catch(() => { message.info('删除文件失败！') })
    };

    const handleCancel = e => {
        setVisible(false)
    };

   

    //分页

    const currentPageRef = useRef(1)
    const [currentPage, setCurrentPage] = useState(1)
    const paginationProps = {
        showSizeChanger: false,
        showQuickJumper: false,
        showTotal: () => `共${_count}条`,
        pageSize: 5,
        current: currentPage,//ref 代替 
        total: _count,
        onShowSizeChange: (current, pageSize) => changePageSize(pageSize, current),
        onChange: (current) => changePage(current),
    }

    const changePageSize = (a, b) => {
        console.log(a, b)
    }

    const changePage = (v) => {
        console.log(v)
        setCurrentPage(v)
        //按是否搜索进行 分页查询的切换页码
         _getFile(val, 5, v)
         



        // console.log('curr1=',currentPage)
        // console.log('curr2=',currentPageRef.current)
        // currentPageRef.current = v //保留页面于useRef
        // console.log('curr3=',currentP/ageRef.current)


    }


    //搜索区域
    const [currentSearch, setCurrentSearch] = useState(val)

    const handleSearch = (v) => {
        if (!v) {
            message.info('请输入文件名来搜索~')
            return
        }
        setCurrentPage(1) //每次搜索重置页码
        _getFile(v, 5, 1)
        setTimeout(()=>{
            setCurrentSearch(v)
        })

    }


    //表格区域
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
  
        console.log('sea',_file)
        if (_file.length >0) {
            _file.forEach((item, index) => {
                data.push({
                    key: item.id,
                    title: item.name ? item.name : '未填写',
                    date: item.uoload_date ? moment(item.uoload_date).format('YYYY-MM-DD') : '未填写',
                    name: item.uploader ? item.uploader : '未填写',
                    link: item.path? item.path:''
                })
            })
        }


    if (loading) { return (<Spinner></Spinner>) }




    return (
        <div className='FileSearch'>
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
             <div className='navText' style={{position:'relative'}}>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>文件搜索</Text>
                {mode && <div className='FileSearch-search' >
                <Text style={{minWidth:'65px'}}>搜索：</Text>
                <Search
                    maxLength={20}
                    placeholder="输入用户名搜索"
                    onSearch={handleSearch}
                    style={{ width: 200 }}
                />
            </div>}
            </div>

            <ul className='FileSearch-ul'>
               
                {mode &&
                    <li style={{ listStyle: 'none', position: 'relative', left:'20px' }}>
                        <span style={{transform:'translateY(-50%)'}} className='searchInfo'>为您搜索到<span style={{color:'red'}}>{_count}</span>条数据～</span>
                    </li>
                }   
                <Link to='/fileback' className='FileSearch-link' ><Button className='FileSearch-btn' type='danger'>返回</Button></Link>

            </ul>
            <div className='FileSearch-wrap'>
                <Table columns={columns} dataSource={data} pagination={paginationProps} />
            </div>

        </div>
    )
}

export default React.memo(FileSearch)
