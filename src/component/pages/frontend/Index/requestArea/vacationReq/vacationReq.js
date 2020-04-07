import React, { useState,useEffect
    // , useContext
 } from 'react'
import { Typography, Input, Button, DatePicker, message,Select } from 'antd'
import {Link} from 'react-router-dom'
import qs from 'qs'
import axios from 'axios'
import moment from 'moment'

import '../vacationReq/vacationReq.scss'



const VacationReq = (props) => {
    const [username, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [title, setTitle] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [time, setTime] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [notice, setNotice] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [type, setType] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [work, setWork] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
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
        setTime('')
        setNotice('')
        setType('')
        setWork('')
        setDate(null)
    }

    // const { MonthPicker, RangePicker } = DatePicker;
    const { Option } = Select
    const { Text } = Typography
    // 数据双向绑定
    const handleTitleChange = (val) => {
        if(val.target.value.length>30){return}
        setTitle(val.target.value)
    }
    const handleNameChange = (val) => {
        if(val.target.value.length>30){return}
        setName(val.target.value)
    }
    const handleTimeChange = (val) => {
        if(val.target.value.length>5){return}
        setTime(val.target.value)
    }
    const handleNoticeChange = (val) => {
        if(val.target.value.length>140){return}
        setNotice(val.target.value)
    }
    const handleTypeChange = (val) => {
        setType(val)
    }
    const handleWorkChange = (val) => {
        if(val.target.value.length>25){return}
        setWork(val.target.value)
    }
    const handleDateChange = (val)=>{
        setDate(val)
    }
    const handleSubmit = () => {

        if(!username || !date|| !title || !time || !notice || !type || !work){
            message.info('请填写休假及外出申请信息！')
            clearData()
            return
        }

        let _date = String(date.format('YYYY-MM-DD HH:mm:ss'))
        let _time = String(time+'小时')
        console.log( username , _date,  title , _time , notice , type , work)

        console.log(typeof username ,typeof _date, typeof title ,typeof _time ,typeof notice ,typeof type ,typeof work)

        //加班申请
        axios.put('/AutomaticOfficeSystem/processCenter/api/v1/vacationApplication',
        qs.stringify({
           name:username, 
           title,
           startData: _date,
           howLong: _time,
           reason: notice,
           department:work,
           type,
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

                message.info('提交休假外出申请成功～');
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
        <div className='vacationReq'>
            <div className='navText'>
                <Text strong className='navFont'>休假及外出申请</Text>
            </div>

            <div className='vacationReq-wrap'>
                <div className='vacationReq-wrap__title'>休假及外出申请</div>
                <div className='vacationReq-wrap__box'>
                    <div className='vacationReq-wrap__div'>
                        <Text strong className="vacationReq-wrap__text">主题</Text>
                        <Input
                            className="vacationReq-wrap__input"
                            placeholder="请输入主题"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className='vacationReq-wrap__div'>
                        <Text strong className="vacationReq-wrap__text">姓名</Text>
                        <Input
                            className="vacationReq-wrap__input"
                            placeholder="请输入姓名"
                            value={username}
                            onChange={handleNameChange}
                        />
                    </div>
                </div>
                
                <div className='vacationReq-wrap__box'>
                    <div className='vacationReq-wrap__div'>
                        <Text strong className="vacationReq-wrap__text">日期</Text>
                        <DatePicker 
                           value={date} 
                           onChange={handleDateChange}
                           className="vacationReq-wrap__input"></DatePicker>
                        </div>
                    <div className='vacationReq-wrap__div'>
                        <Text strong className="vacationReq-wrap__text">申请时长</Text>
                        <Input
                            className="vacationReq-wrap__input"
                            placeholder="请输入小时数"
                            value={time}
                            type='number'
                            onChange={handleTimeChange}
                        />
                    </div>
                </div>

                <div className='vacationReq-wrap__box' style={{marginTop:'25px'}}>
                    <div className='vacationReq-wrap__div'>
                        <Text strong className="vacationReq-wrap__text">休假类型</Text>
                        <Select
                            className="vacationReq-wrap__input"
                            placeholder="请选择调休类型"
                            onChange={handleTypeChange}
                            value={type}
                        >

                            <Option value='事假'>事假</Option>
                            <Option value='调休'>调休</Option>
                            <Option value='病假'>病假</Option>
                            <Option value='探亲'>探亲</Option>

                        </Select>
                    </div>
                    <div className='vacationReq-wrap__div' >
                        <Text strong className="vacationReq-wrap__text">休假单位</Text>
                        <Input
                            className="vacationReq-wrap__input"
                            placeholder="请输入休假单位"
                            value={work}
                            onChange={handleWorkChange}
                        />
                    </div>
                </div>

                    
                    <div className='vacationReq-wrap__notice'>
                        <Text strong className="vacationReq-wrap__text">申请原因</Text>
                        <textarea
                            className="vacationReq-wrap__textarea"
                            value={notice}
                            type='textarea'
                            onChange={handleNoticeChange}
                        />
                    </div>

               
                <div className='vacationReq-wrap__bottom'>
                    <Button type='danger' className='vacationReq-wrap__bottom--btn' onClick={handleSubmit}>确定</Button>
                    <Link to='/index/requestProcess' style={{height:'100%'}}><Button className='vacationReq-wrap__bottom--btn' >取消</Button></Link>
                </div>

            </div>
                

        </div>
    )
}

export default React.memo(VacationReq)
