import React, { useState,useEffect
    // , useContext
 } from 'react'
import { Typography, Input, Button, DatePicker, message } from 'antd'
import {Link} from 'react-router-dom'
import qs from 'qs'
import axios from 'axios'
import moment from 'moment'


import '../overTimeReq/overTimeReq.scss'

const OverTimeReq = (props) => {
    const [username, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [title, setTitle] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [time, setTime] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [notice, setNotice] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [payback, setPayback] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [work, setWork] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [date, setDate] = useState(null); // reactHook 重构： 使用useState重构state，进行状态接管

    // const { MonthPicker, RangePicker } = DatePicker;

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
        setPayback('')
        setWork('')
        setDate(null)
    }
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
    const handlePaybackChange = (val) => {
        if(val.target.value.length>25){return}
        setPayback(val.target.value)
    }
    const handleWorkChange = (val) => {
        if(val.target.value.length>25){return}
        setWork(val.target.value)
    }
    const handleDateChange = (val)=>{
        setDate(val)
    }
    const handleSubmit = () => {
        console.log(username,title,time,notice,payback,work,date && date.valueOf())
        if(!username || !date|| !title || !time || !notice || !payback || !work){
            message.info('请填写加班申请信息！')
            clearData()
            return
        }
        let _date = String(date.format('YYYY-MM-DD HH:mm:ss'))
        let _time = String(time+'小时')

        //加班申请
        axios.put('/AutomaticOfficeSystem/processCenter/api/v1/overtimeApplication',
        qs.stringify({
           name:username, 
           title,
           startTime: _date,
           returnWay:payback,
           howLong: _time,
           note: notice,
           workContent: work,
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

                message.info('提交加班申请成功～');
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
        <div className='overTimeReq'>
            <div className='navText'>
                <Text strong className='navFont'>加班申请</Text>
            </div>
            <div className='overTimeReq-wrap'>
                <div className='overTimeReq-wrap__title'>加班申请</div>
                <div className='overTimeReq-wrap__box'>
                    <div className='overTimeReq-wrap__div'>
                        <Text strong className="overTimeReq-wrap__text">主题</Text>
                        <Input
                            className="overTimeReq-wrap__input"
                            placeholder="请输入主题"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className='overTimeReq-wrap__div'>
                        <Text strong className="overTimeReq-wrap__text">姓名</Text>
                        <Input
                            className="overTimeReq-wrap__input"
                            placeholder="请输入姓名"
                            value={username}
                            onChange={handleNameChange}
                        />
                    </div>
                </div>
                
                <div className='overTimeReq-wrap__box'>
                    <div className='overTimeReq-wrap__div'>
                        <Text strong className="overTimeReq-wrap__text">日期</Text>
                        <DatePicker 
                            value={date} 
                            onChange={handleDateChange}
                            className="overTimeReq-wrap__input"></DatePicker>
                        </div>
                    <div className='overTimeReq-wrap__div'>
                        <Text strong className="overTimeReq-wrap__text">申请时长</Text>
                        <Input
                            className="overTimeReq-wrap__input"
                            placeholder="请输入小时数"
                            value={time}
                            type='number'
                            onChange={handleTimeChange}
                        />
                    </div>
                </div>

                <div className='overTimeReq-wrap__box' style={{marginTop:'25px'}}>
                    <div className='overTimeReq-wrap__div'>
                        <Text strong className="overTimeReq-wrap__text">回报方式</Text>
                        <Input
                            className="overTimeReq-wrap__input"
                            placeholder="请输入回报方式"
                            value={payback}
                            onChange={handlePaybackChange}
                        />
                    </div>
                    <div className='overTimeReq-wrap__div' >
                        <Text strong className="overTimeReq-wrap__text">工作内容</Text>
                        <Input
                            className="overTimeReq-wrap__input"
                            placeholder="请输入工作内容"
                            value={work}
                            onChange={handleWorkChange}
                        />
                    </div>
                </div>

                    
                    <div className='overTimeReq-wrap__notice'>
                        <Text strong className="overTimeReq-wrap__text">备注</Text>
                        <textarea
                            className="overTimeReq-wrap__textarea"
                            value={notice}
                            type='textarea'
                            onChange={handleNoticeChange}
                        />
                    </div>

                <div className='overTimeReq-wrap__bottom'>
                    <Button type='danger' className='overTimeReq-wrap__bottom--btn' onClick={handleSubmit}>确定</Button>
                    <Link to='/index/requestProcess' style={{height:'100%'}}><Button className='overTimeReq-wrap__bottom--btn' >取消</Button></Link>
                </div>

            </div>



        </div>
    )
}

export default React.memo(OverTimeReq)
