import React, { useContext, useEffect,useState } from 'react'
import Navbar from '../../../laout/Navbar'
import { Typography, Table, Input, Tag, Button, Modal, message, Icon } from 'antd'

import File1 from '../File/File1/File1'
import File2 from '../File/File2/File2'
import FileSearch from '../File/FileSearch/FileSearch'
import qs from 'qs'
import axios from 'axios'
import FileContext from '../../../../context/file/fileContext'






import { Link, Route,useHistory } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据


import '../File/File.scss'


const File = (props) => {

    //基本信息区域
    const { Text } = Typography
    const { Search } = Input
    const histroy = useHistory() //实例化一个history Hook


    //实例化context
    const fileContext = useContext(FileContext)
    const { _getFile, _file,addFileType, getFileType, mode,fileType = [], } = fileContext

    //生命周期
    useEffect(() => {
        getFileType(1)
    }, [])

    //弹窗    
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)

    //添加文件夹区域
    const [fileTypeName, setFileTypeName] = useState('')

    const handleFileTypeNameChange = (val) => {
        if (val.target.value.length > 10) { return }
        setFileTypeName(val.target.value)
    }

    //文件添加方法区域
    const showModal = () => {
        setVisible(true)

    };

    const clearName = () => {
        setFileTypeName('')
    }

    const handleOk = e => {
        setVisible(false)
        if (!fileTypeName) {
            message.info('请输入新建文件夹名!')
            clearName()
            return
        }

        //添加文件夹
        axios.put('/AutomaticOfficeSystem/fileManagement/api/v1/folders',
            qs.stringify({
                folderName: fileTypeName,
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
                    message.info('新增文件夹成功~');
                    clearName();
                    setTimeout(() => {
                        getFileType(1)
                    }, 200)
                }
                else {
                    message.info('新增文件夹失败，请重试!');
                    clearName();
                    return
                }
            }, () => {
                return Promise.reject('请求失败，请重试!')
            }).catch(err => {
                message.info(err)
                clearName()
            })


    };

    const handleCancel = e => {
        setVisible(false)
        clearName()
    };

    const handleSearch = (v) => {
        if (!v) {
            message.info('请输入文件名来搜索！')
            return
        }
        console.log(v)

        // getSearchTable(v,5,1)
        console.log('before',v)
        _getFile(v,5,1) //存储val初始值
        setTimeout(() => {
            //事件循环，宏任务队列
            props.history.push({ pathname: '/file/searchFile' ,query: { name : v }})
       
        })


    }


    return (<div >
        <Navbar title="自动化办公系统" />
        <div className="container" >
            <div className='File'>
                <div>
                    <Modal
                        title="添加文件夹"
                        visible={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        destroyOnClose={true}
                    >
                        <div className='File-wrap__div'>
                            <Text style={{ fontSize: 'normal' }} className="File-wrap__text">文件夹名</Text>
                            <Input
                                className="File-wrap__input"
                                placeholder="请输入文件夹名"
                                value={fileTypeName}
                                onChange={handleFileTypeNameChange}
                            />
                        </div>
                    </Modal>
                </div>
                <div className='File-left' style={{ overflowY: 'scroll' }}>
                    <div className='File-left__item1' >
                        <span>文件管理</span>     
                    </div>



                    {
                        fileType.length > 0 && fileType.map(e => (
                            <Link
                                className='File-left__item3'
                                key={e.id}
                                to={e.id === 1 ? '/file' : `/file/file${e.id}`}>
                                <img className='File-left__item3--img'
                                    src={require('../../../../pic/21.png')}
                                    alt='pic'
                                />
                                <Text className='File-left__item3--text'>{e.name}</Text>
                            </Link>
                        ))
                    }


                </div>
                <div className='File-bfc'>
                    <div className='File-right'>
                        {/* <div className='navText' style={{ position: 'relative' }}> */}
                        {!mode && <div className='File-search' >
                            <Text style={{ minWidth: '65px' }}>搜索：</Text>
                            <Search
                                maxLength={20}
                                placeholder="输入文件名搜索"
                                onSearch={handleSearch}
                                style={{ width: 200,zIndex:999 }}
                            />
                        </div>}
                        {/* </div> */}
                        {/* 子路由区域 */}

                        <Route path='/file' exact component={File1} />
                        <Route path='/file/file:param' component={File2} />
                        <Route path='/file/searchFile' component={FileSearch} />

                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default React.memo(File)