import React, { useEffect, useState,useContext,useRef } from 'react'
import { Typography, Table, Input, Tag, Modal, message } from 'antd'
// import { Link } from 'react-router-dom'

import Spinner from '../../../../laout/Spinner'
import RightContext from '../../../../../context/right/rightContext'
import picDefault from '../../../../../pic/38.png'
import iconDefault from '../../../../../pic/20.png'
import axios from 'axios'
import qs from 'qs'

import '../PicManage/PicManage.scss'




const PicManage = (e) => {


    //基本信息
    const { Text } = Typography
    const fileUpload = useRef(null) //用于管理员上传缩略图


    //实例化context
    const rightContext = useContext(RightContext)
    const { getPic, pic = [], loading } = rightContext
    const [delId,setDelId] = useState('')

    //生命周期
    useEffect(() => {  //useEffect 重构生命周期didMount
        getPic()
        // eslint-disable-next-line
    }, [])

    //弹窗    
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)

   //删除轮播
   const showModal1 = (id) => {
    setVisible1(true)
    setDelId(id)
};

const handleOk1 = e => {
    setVisible1(false)
    //删除轮播
    
    axios.delete(`/AutomaticOfficeSystem/announcement/api/v1/shufflingFigure?id=${delId}`,{}).then(data => {
        if (data.status === 200 || data.status === 204) {
            message.info('删除轮播图成功~')
            setTimeout(()=>{
                getPic()
            },200)
        }
        else {
            message.info('删除轮播图失败，请重试！');
            return
        }
    }).catch(err => {
        message.info(err)
    })
};

const handleCancel1 = e => {
    setVisible1(false)
};

    //添加轮播
    const showModal = () => {
        setVisible(true)
    };

    const handleOk = e => {
        setVisible(false)
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        if(fileUpload.current.files[0] === undefined){
            message.info('请上传轮播图！')
            return
        }

        //将图片存放在formData对象里
        let formData = new FormData()
        formData.append('file', fileUpload.current.files[0])

        //上传
        axios.post('/AutomaticOfficeSystem/announcement/api/v1/shufflingFigure', formData, config).then(data => {
            if (data.status === 200 || data.status === 201) {
                message.info('上传轮播图成功~')
                setTimeout(()=>{
                    getPic()
                },200)
            }
            else {
                message.info('上传轮播图失败，请重试！');
                return
            }
        }).catch(err => {
            message.ingo(err)
        })
    };

    const handleCancel = e => {
        setVisible(false)
    };



    if(loading){return <Spinner></Spinner>}
    return (
        <div className='PicManage'>
            <div>
                <Modal
                    title='请添加轮播图片'
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                     <input type="file" ref={fileUpload} className='PicManage-wrap__input' />
                </Modal>
            </div>
            <div>
                <Modal
                    title='提示'
                    visible={visible1}
                    onOk={handleOk1}
                    onCancel={handleCancel1}
                >
                    <p style={{ fontWeight: 'bold' }}>
                        确认删除此信息？
                    </p>
                </Modal>
            </div>
            <div className='navText'>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>轮播图管理</Text>
            </div>

            <div className='PicManage-wrap' style={{overflowY:'scroll',paddingBottom:'80px'}}>
             {pic.length>0 && pic.map(e=>(

                <div key={e.id} className='PicManage-wrap__div'>
                    <div className='PicManage-wrap__divLeft'>
                        <img onClick={()=>showModal()} className='redLink' style={{ width: '100px', height: '100px' }} src={iconDefault} alt="default" />
                        <Text style={{ color: 'red', position: 'relative', left: '5px' }}>图片格式：1920*1080</Text>
                    </div>
                    <div className='PicManage-wrap__divRight' style={{flex:'1'}}>
                        <img style={{ height: '120px' }} src={e.path?e.path:picDefault} alt="pic" />
                    </div>
                    <div className='PicManage-wrap__divRight' >
                        <Text onClick={()=>showModal1(e.id)} className='redLink' style={{ color: 'red', position: 'relative', left: '5px' }}>删除</Text>
                    </div>
                </div>
    ))}   
            
              
            </div>

        </div>
    )
}

export default React.memo(PicManage)
