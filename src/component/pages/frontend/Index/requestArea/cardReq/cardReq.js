import React, { useState,useEffect
    // , useContext
 } from 'react'
import { Typography, Input, Button, DatePicker, message,Select } from 'antd'
import {Link} from 'react-router-dom'
import qs from 'qs'
import axios from 'axios'
import moment from 'moment'
import '../cardReq/cardReq.scss'



const CardReq = (props) => {
    const [username, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [title, setTitle] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [mail, setMail] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [notice, setNotice] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [number, setNumber] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [called, setCalled] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管

    //生命周期
    useEffect(() => {
        return handleClear
    }, [])
    const handleClear = () => {
        clearData()
    }
    //清除数据
    const clearData = () => {
        setName('')
        setTitle('')
        setNotice('')
        setNumber('')
        setCalled('')
        setMail('')
    }
    const { Text } = Typography
    // 数据双向绑定
    const handleTitleChange = (val) => {
        if (val.target.value.length > 30) { return }
        setTitle(val.target.value)
    }
    const handleNameChange = (val) => {
        if (val.target.value.length > 30) { return }
        setName(val.target.value)
    }
    const handleMailChange = (val) => {
        if (val.target.value.length > 25) { return }
        setMail(val.target.value)
    }
    const handleNoticeChange = (val) => {
        if (val.target.value.length > 140) { return }
        setNotice(val.target.value)
    }
    const handleNumberChange = (val) => {
        if (val.target.value.length > 25) { return }
        setNumber(val.target.value)
    }
    const handleCalledChange = (val) => {
        if (val.target.value.length > 25) { return }
        setCalled(val.target.value)
    }
    const handleSubmit = () => {
        console.log(called)

        if(!username || !title || !mail || !number || !notice ||!called){
           
            message.info('请填写名片申请信息！')
            clearData()
            return
        }

        let _tel= String(number)

        //加班申请
        axios.put('/AutomaticOfficeSystem/processCenter/api/v1/businessCardApplication',
        qs.stringify({
           name:username, 
           title,
           tel: _tel,
           note: notice,
           email:mail,
           duty:called,
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

                message.info('提交名片申请成功～');
                clearData();
                setTimeout(() => {
                    props.history.push('/index/trackProcess')
                }, 200)

            }
            else {
                message.info('提交失败，请重试');
                clearData();
                return
            }
        }, () => {
            return Promise.reject('请求失败，请重试')
        }).catch(err => {
            message.info(err)
            clearData()
        })
    }

    return (
        <div className='cardReq'>
            <div className='navText'>
                <Text strong className='navFont'>名片申请</Text>
            </div>
            <div className='cardReq-wrap'>
                <div className='cardReq-wrap__title'>名片申请</div>
                <div className='cardReq-wrap__box'>
                    <div className='cardReq-wrap__div'>
                        <Text strong className="cardReq-wrap__text">主题</Text>
                        <Input
                            className="cardReq-wrap__input"
                            placeholder="请输入主题"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className='cardReq-wrap__div'>
                        <Text strong className="cardReq-wrap__text">姓名</Text>
                        <Input
                            className="cardReq-wrap__input"
                            placeholder="请输入姓名"
                            value={username}
                            onChange={handleNameChange}
                        />
                    </div>
                </div>
                
                <div className='cardReq-wrap__box'>
                    <div className='cardReq-wrap__div'>
                        <Text strong className="cardReq-wrap__text">职称</Text>
                        <Input
                            className="cardReq-wrap__input"
                            placeholder="请输入职称"
                            value={called}
                            onChange={handleCalledChange}
                        />
                    </div>
                    <div className='cardReq-wrap__div'>
                        <Text strong className="cardReq-wrap__text">电子邮箱</Text>
                        <Input
                            className="cardReq-wrap__input"
                            placeholder="请输入您的邮箱"
                            value={mail}
                            onChange={handleMailChange}
                        />
                    </div>
                </div>

                <div className='vacationReq-wrap__box' style={{ marginTop: '25px', width: '50%' }}>
                    <div className='vacationReq-wrap__div' >
                        <Text strong className="vacationReq-wrap__text">联系方式</Text>
                        <Input
                            className="vacationReq-wrap__input"
                            placeholder="请输入联系方式"
                            value={number}
                            type='number'
                            onChange={handleNumberChange}
                        />
                    </div>
                </div>


                <div className='cardReq-wrap__notice'>
                    <Text strong className="cardReq-wrap__text">说明</Text>
                    <textarea
                        className="cardReq-wrap__textarea"
                        value={notice}
                        type='textarea'
                        onChange={handleNoticeChange}
                    />
                </div>

                <div className='cardReq-wrap__bottom'>
                    <Button type='danger' className='cardReq-wrap__bottom--btn' onClick={handleSubmit}>确定</Button>
                    <Link to='/index/requestProcess' style={{ height: '100%' }}><Button className='cardReq-wrap__bottom--btn' >取消</Button></Link>
                </div>

            </div>



        </div>
    )
}

export default React.memo(CardReq)
