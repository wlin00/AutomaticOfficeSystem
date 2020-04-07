import React, { useEffect, useState } from 'react'
import { Typography, Input, Button,Select } from 'antd'
import { Link } from 'react-router-dom'

import '../TeamAdd/TeamAdd.scss'




const TeamAdd = (e) => {



    useEffect(() => {  //useEffect 重构生命周期didMount
        console.log('accountEdit-page ')
        // eslint-disable-next-line
    }, [])

    const [username, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [type, setType] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [type2, setType2] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    
    const [phone, setPhone] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [file, setFile] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [pwd, setPwd] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管

    // const { MonthPicker, RangePicker } = DatePicker;

    // 数据双向绑定
    const handleTypeChange = (val) => {
        setType(val)
    }
    const handleType2Change = (val) => {
        setType2(val)
    }
    const handleNameChange = (val) => {
        if (val.target.value.length > 30) { return }
        setName(val.target.value)
    }
    const handlePhoneChange = (val) => {
        if (val.target.value.length > 25) { return }
        setPhone(val.target.value)
    }
    const handlePwdChange = (val) => {
        if (val.target.value.length > 25) { return }
        setPwd(val.target.value)
    }
    const handleFileChange = (val) => {
        // if (val.target.value.length > 25) { return }
        // setFile(val)
        console.log(val)
    }
    const handleSubmit = () => {
        console.log(type , file)
    }

    const { Text } = Typography
    const {Option} = Select

    return (
        <div className='TeamAdd'>
            <div className='navText'>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>添加成员</Text>
            </div>
            <div className='TeamAdd-wrap'>
                <div className='TeamAdd-wrap__box'>
                    <div className='TeamAdd-wrap__div'>
                        <Text  className="TeamAdd-wrap__text">真实姓名</Text>
                        <Input
                            className="TeamAdd-wrap__input"
                            placeholder="请输入姓名"
                            value={username}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className='TeamAdd-wrap__div'>
                        <Text  className="TeamAdd-wrap__text">职务</Text>
                        <Select
                            className="TeamAdd-wrap__input"
                            placeholder="请选择职务"
                            onChange={handleTypeChange}
                        >

                            <Option value='职务1'>职务1</Option>
                            <Option value='职务2'>职务2</Option>
                        </Select>
                    </div>
                </div>
                
                <div className='TeamAdd-wrap__box'>
                <div className='TeamAdd-wrap__div'>
                        <Text  className="TeamAdd-wrap__text">密码</Text>
                        <Input
                            className="TeamAdd-wrap__input"
                            placeholder="请输入密码"
                            value={pwd}
                            type='password'
                            onChange={handlePwdChange}
                        />
                    </div>
                    <div className='TeamAdd-wrap__div'>
                        <Text  className="TeamAdd-wrap__text">联系方式</Text>
                        <Input
                            className="TeamAdd-wrap__input"
                            placeholder="请输入电话/座机"
                            value={phone}
                            type='number'
                            onChange={handlePhoneChange}
                        />
                    </div>
                </div>

                <div className='TeamAdd-wrap__box' style={{ width:'50%',marginTop: '25px' }}>
                <div className='TeamAdd-wrap__div'>
                        <Text  className="TeamAdd-wrap__text">部门</Text>
                        <Select
                            className="TeamAdd-wrap__input"
                            placeholder="请选择部门"
                            onChange={handleType2Change}
                        >

                            <Option value='部门1'>部门1</Option>
                            <Option value='部门2'>部门2</Option>
                        </Select>
                    </div>
                </div>

                <div className='TeamAdd-wrap__bottom'>
                    <Button type='danger' className='TeamAdd-wrap__bottom--btn' onClick={handleSubmit}>确定</Button>
                    <Link to='/indexBack' style={{ height: '100%' }}><Button className='TeamEdit-wrap__bottom--btn' >取消</Button></Link>
                </div>
            </div>

        </div>
    )
}

export default React.memo(TeamAdd)