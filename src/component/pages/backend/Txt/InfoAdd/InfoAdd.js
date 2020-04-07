import React, { useEffect, useState,useRef } from 'react'
import { Typography, Input, Button,message } from 'antd'
import { Link,useHistory } from 'react-router-dom'
import axios from 'axios'
import qs from 'qs'
import './InfoAdd.scss'




const InfoAdd = (props) => {

   
    //基本信息区域
    const fileUpload = useRef(null) //用于管理员上传部门头像
    const { Text } = Typography
    const [imgUrl,setImgUrl] = useState('')//用于存储上传后的头像地址
    const histroy = useHistory() //实例化一个history Hook

    useEffect(() => {  //useEffect 重构生命周期didMount
        console.log('InfoAdd-page ')
        // eslint-disable-next-line
    }, [])
    const [notice, setNotice] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [title, setTitle] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管

    // const { MonthPicker, RangePicker } = DatePicker;

    // 数据双向绑定
   
    const handleNoticeChange = (val) => {
        if(val.target.value.length>140){return}
        setNotice(val.target.value)
    }
    const handleTitleChange = (val) => {
        if(val.target.value.length>30){return}
        setTitle(val.target.value)
    }


    //上传缩略题
    const handleUpload = () =>{

        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        //检测用户是否上传部门图标
        if(fileUpload.current.files[0] === undefined){
            message.info('请上传缩略图图片!')
            return
        }

        //将图片存放在formData对象里
        let formData = new FormData()
        formData.append('file',fileUpload.current.files[0])

        axios.post('/AutomaticOfficeSystem/announcement/api/v1/messagePreview', formData,config).then(data => {
            if (data.status === 200 || data.status === 201) {
               console.log(data.data.data.path)
                // let link = 'http://l1nkkk.xyz:3001'
                // let imgUrl = data.data.img
                let img = data.data.data.path
                setImgUrl(img)
                message.info('上传缩略图成功~')
            }
            else{
                message.info('上传缩略图失败，请重试');
                return
            }
        }).catch(err => {
            message.ingo(err)
        })
    }
    
    //提交添加请求
    const handleSubmit = () => {

       
        if(!title || !notice){
            message.info('请完整输入信息！')
            return
        }

        if(!imgUrl){
            message.info('请上传缩略图！')
            return
        }


        axios.put('/AutomaticOfficeSystem/announcement/api/v1/message', qs.stringify({content:notice,title,preview:imgUrl}),     {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
            }
        }).then(data => {
            if (data.status === 200||data.status === 204 || data.status === 201) {
                message.info('上传信息成功~')
                setTimeout(()=>{

                    histroy.push('/txt/infoManage')
                //    window.location.href = '/txt/infoManage'
                },200)
            }
            else{
                message.info('上传信息失败，请重试');
                return
            }
        }).catch(err => {
            message.info(err)
        })

        
    }


    return (
        <div className='InfoAdd'>
            <div className='navText'>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>添加信息</Text>
            </div>
            <div className='InfoAdd-wrap'>
                <div className='InfoAdd-wrap__box'>
                    <div className='InfoAdd-wrap__div'>
                        <Text  className="InfoAdd-wrap__text">标题</Text>
                        <Input
                            className="InfoAdd-wrap__input"
                            placeholder="请输入信息标题"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
               
                </div>
                
                <div className='InfoAdd-wrap__box'>
                <div className='InfoAdd-wrap__div' style={{position:'relative'}}>
                        <Text  className="InfoAdd-wrap__text">缩略图</Text>
                        {/* <Input
                            className="InfoAdd-wrap__input"
                            placeholder="请输入密码"
                            value={pwd}
                            type='password'
                            onChange={handlePwdChange}
                        /> */}
                        <input type="file" ref={fileUpload} className='InfoAdd-wrap__input'/>
                        <Button className='InfoAdd-btn' type='danger' onClick={handleUpload}>上传</Button>
                    </div>
                   
                </div>

       

                <div className='InfoAdd-wrap__notice'>
                        <Text strong className="InfoAdd-wrap__text">信息内容</Text>
                        <textarea
                            className="InfoAdd-wrap__textarea"
                            value={notice}
                            type='textarea'
                            onChange={handleNoticeChange}
                        />
                    </div>

                <div className='InfoAdd-wrap__bottom'>
                    <Button type='danger' className='InfoAdd-wrap__bottom--btn' onClick={handleSubmit}>确定</Button>
                    <Link to='/txt/infoManage' style={{ height: '100%' }}><Button className='InfoAdd-wrap__bottom--btn' >取消</Button></Link>
                </div>
            </div>

        </div>
    )
}

export default React.memo(InfoAdd)