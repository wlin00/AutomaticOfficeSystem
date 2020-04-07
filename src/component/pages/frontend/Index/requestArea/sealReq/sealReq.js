import React, { useState,useEffect
    // , useContext
 } from 'react'
import { Typography, Input, Button, DatePicker, message,Select } from 'antd'
import {Link} from 'react-router-dom'
import qs from 'qs'
import axios from 'axios'
import moment from 'moment'
import '../sealReq/sealReq.scss'



const SealReq = (props) => {
    const [username, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [title, setTitle] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [phone, setPhone] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [notice, setNotice] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [type1, setType1] = useState('')
    const [type2, setType2] = useState('')
    const [date, setDate] = useState(null); // reactHook 重构： 使用useState重构state，进行状态接管
   
    //生命周期
    useEffect(()=>{
        return handleClear
    },[])
    const handleClear = () =>{
        clearData()
    }
    //清除数据
    const clearData = () =>{
        setName('')
        setTitle('')
        setPhone('')
        setNotice('')
        setType1('')
        setType2('')
        setDate(null)
    }

    const { Text } = Typography
    const { Option } = Select

    // 数据双向绑定
    const handleTitleChange = (val) => {
        if(val.target.value.length>30){return}
        setTitle(val.target.value)
    }
    const handleNameChange = (val) => {
        if(val.target.value.length>30){return}
        setName(val.target.value)
    }
    const handlePhoneChange = (val) => {
        if(val.target.value.length>25){return}
        setPhone(val.target.value)
    }
    const handleNoticeChange = (val) => {
        if(val.target.value.length>140){return}
        setNotice(val.target.value)
    }
    const handleType1Change = (val) => {
       setType1(val)
    }
    const handleType2Change = (val) => {
        setType2(val)
    }
    
    const handleSubmit = () => {
        if(!username || !type1 || !type2 || !date || !notice ||!phone ||!title){
           
            message.info('请填写用印申请信息！')
            clearData()
            return
        }

        let _date = String(date.format('YYYY-MM-DD HH:mm:ss'))
        let _tel= String(phone)

        //加班申请
        axios.put('/AutomaticOfficeSystem/processCenter/api/v1/sealApplication',
        qs.stringify({
           name:username, 
           title,
           tel: _tel,
           note: notice,
           useType:type1,
           sealType: type2,
           useDate: _date
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

                message.info('提交用印申请成功～');
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

    const handleDateChange = (val)=>{
        setDate(val)
    }

    return (
        <div className='sealReq'>
            <div className='navText'>
                <Text strong className='navFont'>用印申请</Text>
            </div>
            <div className='sealReq-wrap'>
                <div className='sealReq-wrap__title'>用印申请</div>
                <div className='sealReq-wrap__box'>
                    <div className='sealReq-wrap__div'>
                        <Text strong className="sealReq-wrap__text">主题</Text>
                        <Input
                            className="sealReq-wrap__input"
                            placeholder="请输入主题"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className='sealReq-wrap__div'>
                        <Text strong className="sealReq-wrap__text">姓名</Text>
                        <Input
                            className="sealReq-wrap__input"
                            placeholder="请输入姓名"
                            value={username}
                            onChange={handleNameChange}
                        />
                    </div>
                </div>
                
                <div className='sealReq-wrap__box'>
                    <div className='sealReq-wrap__div'>
                        <Text strong className="sealReq-wrap__text">日期</Text>
                        <DatePicker 
                            value={date} 
                            onChange={handleDateChange}
                            className="sealReq-wrap__input"></DatePicker>
                        </div>
                    <div className='sealReq-wrap__div'>
                        <Text strong className="sealReq-wrap__text">联系方式</Text>
                        <Input
                            className="sealReq-wrap__input"
                            placeholder="请输入联系电话"
                            value={phone}
                            type='number'
                            onChange={handlePhoneChange}
                        />
                    </div>
                </div>

                <div className='vacationReq-wrap__box' style={{marginTop:'25px'}}>
                    <div className='vacationReq-wrap__div'>
                        <Text strong className="vacationReq-wrap__text">用印类型</Text>
                        <Select
                            className="vacationReq-wrap__input"
                            placeholder="请选择用印类型"
                            onChange={handleType1Change}
                            value={type1}
                        >
                            <Option value='合同签约'>合同签约</Option>
                            <Option value='资料盖章'>资料盖章</Option>
                            <Option value='规章制度'>规章制度</Option>
                            <Option value='人事使用'>人事使用</Option>
                        </Select>
                    </div>
                    <div className='vacationReq-wrap__div'>
                        <Text strong className="vacationReq-wrap__text">印章类别</Text>
                        <Select
                            className="vacationReq-wrap__input"
                            placeholder="请选择印章类别"
                            onChange={handleType2Change}
                            value={type2}
                        >
                            <Option value='法人章'>法人章</Option>
                            <Option value='财务章'>财务章</Option>
                            <Option value='合同章'>合同章</Option>
                            <Option value='公章'>公章</Option>
                        </Select>
                    </div>
                </div>


                    
                    <div className='sealReq-wrap__notice'>
                        <Text strong className="sealReq-wrap__text">说明</Text>
                        <textarea
                            className="sealReq-wrap__textarea"
                            value={notice}
                            type='textarea'
                            onChange={handleNoticeChange}
                        />
                    </div>

                <div className='sealReq-wrap__bottom'>
                    <Button type='danger' className='sealReq-wrap__bottom--btn' onClick={handleSubmit}>确定</Button>
                    <Link to='/index/requestProcess' style={{height:'100%'}}><Button className='sealReq-wrap__bottom--btn' >取消</Button></Link>
                </div>

            </div>



        </div>
    )
}

export default React.memo(SealReq)
