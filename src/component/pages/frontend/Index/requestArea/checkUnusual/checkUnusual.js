import React, { useState,useEffect
    // , useContext
 } from 'react'
import { Typography, Input, Button, DatePicker, message,Select } from 'antd'
import {Link} from 'react-router-dom'
import qs from 'qs'
import axios from 'axios'
import moment from 'moment'
import '../checkUnusual/checkUnusual.scss'



const CheckUnusual = (props) => {
    const [username, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [title, setTitle] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [time, setTime] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [notice, setNotice] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [type, setType] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [date, setDate] = useState(null); // reactHook 重构： 使用useState重构state，进行状态接管

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
        setTime('')
        setNotice('')
        setType('')
        setDate(null)
    }
    const { Text } = Typography
    const { Option } = Select

    // 数据双向绑定
    const handleTitleChange = (val) => {
        if (val.target.value.length > 30) { return }
        setTitle(val.target.value)
    }
    const handleNameChange = (val) => {
        if (val.target.value.length > 30) { return }
        setName(val.target.value)
    }
    const handleTimeChange = (val) => {
        if (val.target.value.length > 5) { return }
        setTime(val.target.value)
    }
    const handleNoticeChange = (val) => {
        if (val.target.value.length > 140) { return }
        setNotice(val.target.value)
    }
    const handleTypeChange = (val) => {
        setType(val)
    }
    const handleDateChange = (val)=>{
        setDate(val)
    }
    const handleSubmit = () => {

        if(!username || !date|| !title || !time || !notice || !type ){
            message.info('请填写考核异常申请！')
            clearData()
            return
        }

        let _date = String(date.format('YYYY-MM-DD HH:mm:ss'))
        let _time = String(time+'小时')

        //加班申请
        axios.put('/AutomaticOfficeSystem/processCenter/api/v1/attendanceAnomalyApplication',
        qs.stringify({
           name:username, 
           title,
           date: _date,
           howLong: _time,
           note:notice,
           exceptionType:type,
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

                message.info('提交考核异常申请成功～');
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
        <div className='checkUnusual'>
            <div className='navText'>
                <Text strong className='navFont'>考核异常申请</Text>
            </div>
            <div className='checkUnusual-wrap'>
                <div className='checkUnusual-wrap__title'>考核异常申请</div>
                <div className='checkUnusual-wrap__box'>
                    <div className='checkUnusual-wrap__div'>
                        <Text strong className="checkUnusual-wrap__text">主题</Text>
                        <Input
                            className="checkUnusual-wrap__input"
                            placeholder="请输入主题"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className='checkUnusual-wrap__div'>
                        <Text strong className="checkUnusual-wrap__text">姓名</Text>
                        <Input
                            className="checkUnusual-wrap__input"
                            placeholder="请输入姓名"
                            value={username}
                            onChange={handleNameChange}
                        />
                    </div>
                </div>
                
                <div className='checkUnusual-wrap__box'>
                    <div className='checkUnusual-wrap__div'>
                        <Text strong className="checkUnusual-wrap__text">日期</Text>
                        <DatePicker 
                           value={date} 
                           onChange={handleDateChange}
                           className="checkUnusual-wrap__input"></DatePicker>
                    </div>
                    <div className='checkUnusual-wrap__div'>
                        <Text strong className="checkUnusual-wrap__text">缺勤时间</Text>
                        <Input
                            className="checkUnusual-wrap__input"
                            placeholder="请输入小时数"
                            value={time}
                            type='number'
                            onChange={handleTimeChange}
                        />
                    </div>
                </div>

                <div className='checkUnusual-wrap__box' style={{ marginTop: '25px', width: '50%' }}>
                    <div className='checkUnusual-wrap__div'>
                        <Text strong className="checkUnusual-wrap__text">休假类型</Text>
                        <Select
                            className="checkUnusual-wrap__input"
                            placeholder="请选择异常方式"
                            onChange={handleTypeChange}
                            value={type}
                        >

                            <Option value='迟到'>迟到</Option>
                            <Option value='早退'>早退</Option>
                            <Option value='缺勤'>缺勤</Option>
                            <Option value='矿工'>矿工</Option>

                        </Select>
                    </div>

                </div>


                <div className='checkUnusual-wrap__notice'>
                    <Text strong className="checkUnusual-wrap__text">备注</Text>
                    <textarea
                        className="checkUnusual-wrap__textarea"
                        value={notice}
                        type='textarea'
                        onChange={handleNoticeChange}
                    />
                </div>

                <div className='checkUnusual-wrap__bottom'>
                    <Button type='danger' className='checkUnusual-wrap__bottom--btn' onClick={handleSubmit}>确定</Button>
                    <Link to='/index/requestProcess' style={{ height: '100%' }}><Button className='checkUnusual-wrap__bottom--btn' >取消</Button></Link>
                </div>

            </div>



        </div>
    )
}

export default React.memo(CheckUnusual)
