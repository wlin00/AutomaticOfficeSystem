import React, { useEffect, useState, useContext, useRef } from 'react'
import { Typography, Input, Button, Select, message, Icon, Upload } from 'antd'
import { Link } from 'react-router-dom'
import Spinner from '../../../../../../component/laout/Spinner'
import axios from 'axios'
import qs from 'qs'

import '../AccountEdit/AccountEdit.scss'




const AccountEdit = (props) => {

    //公共数据
    const { Text } = Typography


    const fileUpload = useRef(null)




    //获取父组件传值,析构赋值,三元表达式捕获异常
    const { name: name_api = '', email: mail_api = '', tel: phone_api = '', sex: sex_api = '0' } = props.location.query ? props.location.query : {}


    const [username, setName] = useState(name_api ? name_api : ''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [type, setType] = useState('0'); // reactHook 重构： 使用useState重构state，进行状态接管
    const [phone, setPhone] = useState(phone_api ? phone_api : ''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [mail, setMail] = useState(mail_api ? mail_api : ''); // reactHook 重构： 使用useState重构state，进行状态接管
    const { Option } = Select
    const reg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/ //邮箱正则验证

    //生命周期
    useEffect(() => {  //useEffect 重构生命周期didMount
        if (props.location.query) {
            console.log('set here')
            setType(props.location.query.sex)
        }
    }, [])

    // 数据双向绑定
    const handleTypeChange = (val) => {
        setType(val)
    }
    const handleNameChange = (val) => {
        if (val.target.value.length > 20) { return }
        setName(val.target.value)
    }
    const handlePhoneChange = (val) => {
        if (val.target.value.length > 35) { return }
        setPhone(val.target.value)
    }
    const handleMailChange = (val) => {
        if (val.target.value.length > 35) { return }
        setMail(val.target.value)
    }

    const clearData = () => {
        setName('')
        setType('0')
        setMail('')
        setPhone('')
    }
    const handleSubmit = () => {
        if (!type || !username || !mail || !phone || type === '0') {
            message.info('请正确输入用户信息')
            clearData()
            return
        }
        if (username.length < 2 || username.length > 35) {
            message.info('用户姓名长度为2-35位之间')
            clearData()
            return
        }
        if (!reg.test(mail)) {
            message.info('请输入正确邮箱格式')
            clearData()
            return
        }
        if (mail.length < 8 || mail.length > 35) {
            message.info('用户邮箱长度为8-35位之间')
            clearData()
            return
        }
        if (phone.length < 8 || phone.length > 35) {
            message.info('联系方式长度为8-35位之间')
            clearData()
            return
        }
        let _phone = String(phone)


        console.log('type', type, typeof type)
        console.log('username', username, typeof username)
        console.log('mail', mail, typeof mail)
        console.log('phone', phone, typeof phone)

        axios.patch('/AutomaticOfficeSystem/personnelPortal/api/v1/userInfo', qs.stringify({ name: username, sex: type, email: mail, tel: _phone }),
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

                    message.info('更改成功');
                    clearData();
                    setTimeout(() => {
                        props.history.push({ pathname: '/people' })
                    }, 1000)
                }
                else {
                    message.info('更改失败，请重试');
                    clearData();
                    return
                }
            }, () => {
                return Promise.reject('请求失败，请重试')
            }).catch(err => {
                message.info(err)
                console.log(err)
                clearData()
            })

    }
    const updateImg = (portraits) => {
        axios.patch('/AutomaticOfficeSystem/personnelPortal/api/v1/userInfo', qs.stringify({ portraits }),
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

                    message.info('更改头像成功');
                    setTimeout(() => {
                        props.history.push({ pathname: '/people' })
                    }, 1000)
                }
                else {
                    message.info('更改头像失败，请重试');
                    return
                }
            }, () => {
                return Promise.reject('请求失败，请重试')
            }).catch(err => {
                message.info(err)
            })
    }

    const handleSubmit2 = () => {
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        if (fileUpload.current.files[0] === undefined) {
            message.info('请上传文件！')
            return
        }
        let formData = new FormData()
        formData.append('file', fileUpload.current.files[0])


        axios.post('/AutomaticOfficeSystem/common/api/v1/uploadPortraits', formData, config).then(data => {
            if (data.status === 200) {
               console.log(data.data.data.path)
                // let link = 'http://l1nkkk.xyz:3001'
                // let imgUrl = data.data.img
                let img = data.data.data.path
                return updateImg(img)

            }
            else{
                message.info('上传头像失败，请重试');
                return
            }
        }).catch(err => {
            message.ingo(err)
        })


    }



    return (
        <div className='AccountEdit'>
            <div className='navText'>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>账户编辑</Text>
                <Link to='/people' className='AccountEdit-link' ><Button className='AccountEdit-btn' type='danger'>返回</Button></Link>
            </div>
            <div className='AccountEdit-wrap'>
                <div className='AccountEdit-wrap__box'>
                    <div className='AccountEdit-wrap__div'>
                        <Text className="AccountEdit-wrap__text">真实姓名</Text>
                        <Input
                            className="AccountEdit-wrap__input"
                            placeholder="请输入姓名"
                            value={username}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className='checkUnusual-wrap__div'>
                        <Text className="checkUnusual-wrap__text">性别</Text>
                        <Select
                            className="checkUnusual-wrap__input"
                            placeholder="请选择性别"
                            onChange={handleTypeChange}
                            defaultValue={type}
                            value={type}
                        >
                            <Option value='0'>请选择</Option>
                            <Option value='男'>男</Option>
                            <Option value='女'>女</Option>
                        </Select>
                    </div>
                </div>
                
                <div className='AccountEdit-wrap__box'>
                    <div className='AccountEdit-wrap__div'>
                        <Text className="Account-wrap__text">电子邮箱</Text>
                        <Input
                            className="AccountEdit-wrap__input"
                            placeholder="请输入邮箱"
                            value={mail}
                            onChange={handleMailChange}
                        />
                    </div>
                    <div className='AccountEdit-wrap__div'>
                        <Text className="Account-wrap__text">联系方式</Text>
                        <Input
                            className="AccountEdit-wrap__input"
                            placeholder="请输入电话/座机"
                            value={phone}
                            type='number'
                            onChange={handlePhoneChange}
                        />
                    </div>
                </div>

                <div className='AccountEdit-wrap__bottom'>
                    <Button className='AccountEdit-wrap__bottom--btn' onClick={handleSubmit}>保存</Button>
                </div>
            </div>
            <div className='navText'>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>头像编辑</Text>
            </div>
            <div className='AccountEdit-wrap__box' style={{ width: '50%', marginTop: '25px' }}>
                <div className='AccountEdit-wrap__div' style={{ position: 'relative', top: '50px', left: '7%' }}>
                    <Text className="AccountEdit-wrap__text">头像</Text>
                    <input type="file" ref={fileUpload} />
                </div>
            </div>
            <div className='AccountEdit-wrap__bottom'>
                <Button className='AccountEdit-wrap__bottom--btn' onClick={handleSubmit2}>保存</Button>
            </div>
        </div>
    )
}

export default React.memo(AccountEdit)



//

