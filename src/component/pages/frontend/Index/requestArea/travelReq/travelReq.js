import React, {
    useState, useEffect
    // , useContext
} from 'react'
import { Typography, Input, Button, DatePicker, message, Radio, Select } from 'antd'
import { Link } from 'react-router-dom'
import qs from 'qs'
import axios from 'axios'
import moment from 'moment'
import '../travelReq/travelReq.scss'

const TravelReq = (props) => {
    const [username, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [title, setTitle] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [time, setTime] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [notice, setNotice] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [radioValue, setRadioValue] = useState(1)
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
        setNotice('')
        setDate(null)
        setRadioValue(1)
        setTime('')
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
    const handleTimeChange = (val) => {
        if (val.target.value.length > 5) { return }
        setTime(val.target.value)
    }
    const handleNoticeChange = (val) => {
        if (val.target.value.length > 140) { return }
        setNotice(val.target.value)
    }
    const handleRadioChange = (val) => {
        setRadioValue(val.target.value)
    }
    const handleDateChange = (val) => {
        setDate(val)
    }
    const handleSubmit = () => {

        if (!username || !title || !time || !notice || !date) {
            message.info('请填写差旅申请信息！')
            clearData()
            return
        }

        let _date = String(date.format('YYYY-MM-DD HH:mm:ss'))
        let _time = String(time + '天')
        let _type = radioValue === 1 ? '国内出差' : '国外出差'
        //加班申请
        axios.put('/AutomaticOfficeSystem/processCenter/api/v1/travelApplication',
            qs.stringify({
                howLong: _time,
                name: username,
                note: notice,
                startDate: _date,
                title,
                type: _type,
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

                    message.info('提交差旅申请成功～');
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
        <div className='travelReq'>
            <div className='navText'>
                <Text strong className='navFont'>差旅申请</Text>
            </div>
            <div className='travelReq-wrap'>
                <div className='travelReq-wrap__title'>差旅申请</div>
                <div className='travelReq-wrap__box'>
                    <div className='travelReq-wrap__div'>
                        <Text strong className="travelReq-wrap__text">主题</Text>
                        <Input
                            className="travelReq-wrap__input"
                            placeholder="请输入主题"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className='travelReq-wrap__div'>
                        <Text strong className="travelReq-wrap__text">姓名</Text>
                        <Input
                            className="travelReq-wrap__input"
                            placeholder="请输入姓名"
                            value={username}
                            onChange={handleNameChange}
                        />
                    </div>
                </div>

                <div className='travelReq-wrap__box' style={{ width: '50%', marginTop: '25px' }}>
                    <div className='travelReq-wrap__div'>
                        <Text strong className="travelReq-wrap__text">申请类型</Text>
                        <Radio.Group onChange={handleRadioChange}
                            value={radioValue}
                            className="travelReq-wrap__input"
                        >
                            <Radio value={1}>国内出差</Radio>
                            <Radio value={2}>国外出差</Radio>
                        </Radio.Group>
                    </div>
                </div>
                
                <div className='travelReq-wrap__box'>
                    <div className='travelReq-wrap__div'>
                        <Text strong className="travelReq-wrap__text">开始时间</Text>
                        <DatePicker
                            value={date}
                            onChange={handleDateChange}
                            className="travelReq-wrap__input"></DatePicker>
                    </div>
                    <div className='travelReq-wrap__div'>
                        <Text strong className="travelReq-wrap__text">出差天数</Text>
                        <Input
                            className="travelReq-wrap__input"
                            placeholder="请输入出差时间(天)"
                            value={time}
                            type='number'
                            onChange={handleTimeChange}
                        />
                    </div>
                </div>


                <div className='travelReq-wrap__notice'>
                    <Text strong className="travelReq-wrap__text">出差事由</Text>
                    <textarea
                        className="travelReq-wrap__textarea"
                        value={notice}
                        type='textarea'
                        onChange={handleNoticeChange}
                    />
                </div>

                <div className='travelReq-wrap__bottom'>
                    <Button type='danger' className='travelReq-wrap__bottom--btn' onClick={handleSubmit}>确定</Button>
                    <Link to='/index/requestProcess/personnel' style={{ height: '100%' }}><Button className='travelReq-wrap__bottom--btn' >取消</Button></Link>
                </div>

            </div>



        </div>
    )
}

export default React.memo(TravelReq)
