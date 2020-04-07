import React, { useEffect,useState,useContext,useRef } from 'react'
import { Typography, Modal, Button,Input,message } from 'antd'
import { Link } from 'react-router-dom'
import Spinner from '../../../../laout/Spinner'
import GroupContext from '../../../../../context/group/groupContext'
import axios from 'axios'
import qs from 'qs'
import '../Department/Department.scss'




const Department = (e) => {

    //基本信息区域
    const { Text } = Typography
    const fileUpload = useRef(null) //用于管理员上传部门头像
    const [imgUrl,setImgUrl] = useState('')//用于存储上传后的头像地址

    //实例化context
    const groupContext = useContext(GroupContext)
    const { getIcons,depIcon=[], loading } = groupContext
 
    const clearData = ()=>{
        setName('')
        setNotice('')

    }

    useEffect(() => {  //useEffect 重构生命周期didMount
        getIcons()
        // eslint-disable-next-line
        return handleWillUnMount
    }, [])

    const [name, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [notice, setNotice] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    console.log(depIcon)

    const handleWillUnMount = () =>{
        clearData()
    }

    const handleNameChange = (val) => {
        if (val.target.value.length > 30) { return }
        setName(val.target.value)
    }
    const handleNoticeChange = (val) => {
        if(val.target.value.length>140){return}
        setNotice(val.target.value)
    }

    const handleUpload = () =>{

        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        //检测用户是否上传部门图标
        if(fileUpload.current.files[0] === undefined){
            message.info('请上传部门图片!')
            return
        }

        //将图片存放在formData对象里
        let formData = new FormData()
        formData.append('file',fileUpload.current.files[0])

        axios.post('/AutomaticOfficeSystem/common/api/v1/uploadPortraits', formData,config).then(data => {
            if (data.status === 200) {
               console.log(data.data.data.path)
                // let link = 'http://l1nkkk.xyz:3001'
                // let imgUrl = data.data.img
                let img = data.data.data.path
                setImgUrl(img)
                message.info('上传部门图标成功~')
            }
            else{
                message.info('上传图标失败，请重试');
                return
            }
        }).catch(err => {
            message.ingo(err)
        })
    }

    //弹窗    
    const [visible, setVisible] = useState(false)

    const showModal = () => {
        setVisible(true)
        console.log('add')
        console.log(depIcon)
    };
    
 

    const handleOk = e => {
        setVisible(false)
        if(!imgUrl){
            message.info('请先上传部门图标！')
            clearData()
            return
        }

        if (!name) {
            message.info('请输入部门名称！')
            clearData()
            return
        }
        if (!notice) {
            message.info('请输入部门职责！')
            clearData()
            return
        }
        if (name.length < 1 || name.length > 30) {
            message.info('部门名称长度错误！')
            clearData()
            return
        }
        if (notice.length < 1 || notice.length > 140) {
            message.info('部门职责长度错误！')
            clearData()
            return
        }

        console.log(imgUrl,name,notice)
        axios.put('/AutomaticOfficeSystem/organizationalManagement/api/v1/department', qs.stringify({ 
            name,
            portraits:imgUrl,
            responsibility:notice
         }),
        {
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
            }
        }
        ).then(
            (data) => {
                console.log(data)
                if (data.status === 200 || data.status === 201) {

                    message.info('添加部门成功～');
                    setTimeout(() => {
                        getIcons()
                    }, 1000)
                }
                else {
                    message.info('添加部门失败，请重试');
                    return
                }
            }, () => {
                return Promise.reject('请求失败，请重试')
            }).catch(err => {
                message.info(err)
            })
        
        
    };

    const handleCancel = e => {
        setVisible(false)
        clearData()

    };



    return (
        <div className='Department'>
            <div>
                <Modal
                    title="添加部门"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    destroyOnClose={true}
                >
                      <div className='Department-wrap__div' style={{position:'relative'}}>
                        <Text style={{ textAlign:'left',fontSize: 'normal' }} className="Department-wrap__text">图标</Text>
                        <span><input type="file" className='Department-wrap__input' ref={fileUpload} /></span>
                        <Button className='Department-btn' type='danger' onClick={handleUpload}>上传</Button>

                    </div>
                    {/* <div className='Department-wrap__div'> */}
                        {/* <Text style={{ textAlign:'left',fontSize: 'normal' }} className="Department-wrap__text">上传图标</Text> */}
                    {/* </div> */}
                    <div className='Department-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="Right2-wrap__text">部门名称</Text>
                        <Input
                            className="Department-wrap__input"
                            placeholder="请输入部门名称"
                            value={name}
                            onChange={handleNameChange}
                        />
                    </div>
                  
                    <div className='Department-wrap__notice'>
                        <Text style={{position:'relative',right:'20px'}} className="Department-wrap__text">部门职责</Text>
                        <textarea
                            className="Department-wrap__textarea"
                            value={notice}
                            type='textarea'
                            onChange={handleNoticeChange}
                        />
                    </div>
                </Modal>
            </div>
            <div style={{padding:'0 3%'}}>
            <div className='navText' >
                <Text strong style={{ color: '#ff0000' }} className='navFont'>组织架构</Text>
            </div>
            </div>
            <ul className='Department-ul' style={{padding:'0 3%'}}>
                <li className='Department-ul__li'>
                    <Button onClick={showModal} className='Department-ul__li--link' style={{ fontSize: '15px' }}>添加部门</Button>
                </li>
            </ul>
            <div className='Department-wrap Department-box'>

                <div style={{padding:'0 3%'}}>
                <div className='navWrap' style={{ padding: '5px 0 0 2px' ,}}>
                    {
                        depIcon.length>0 &&
                        depIcon.map(item=>(
                            <div className='navItem2' key={item.id}>
                            <Link
                                to={`/indexback/department${item.id}`}
                                className='navBox2'>
                                <img
                                    src={item.portraits}
                                    alt='pic'
                                />
                            </Link>
                            <Text className='navItem_text2'>{item.name}</Text>
                        </div>
                          )
                        )
                    }
                </div>
                </div>

            </div>
        </div>


    )
}

export default React.memo(Department)
