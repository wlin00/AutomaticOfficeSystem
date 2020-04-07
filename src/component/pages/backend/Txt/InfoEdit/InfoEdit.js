import React, { useEffect, useState } from 'react'
import { Typography, Input, Button } from 'antd'
import { Link } from 'react-router-dom'

import './InfoEdit.scss'




const InfoEdit = (e) => {



    useEffect(() => {  //useEffect 重构生命周期didMount
        // eslint-disable-next-line
        console.log(e.match.params)
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
    const handleSubmit = () => {
        console.log(title)
    }

    const { Text } = Typography

    return (
        <div className='InfoEdit'>
            <div className='navText'>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>编辑信息</Text>
            </div>
            <div className='InfoEdit-wrap'>
                <div className='InfoEdit-wrap__box'>
                    <div className='InfoEdit-wrap__div'>
                        <Text  className="InfoEdit-wrap__text">标题</Text>
                        <Input
                            className="InfoEdit-wrap__input"
                            placeholder="请输入标题"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
               
                </div>
                
                <div className='InfoEdit-wrap__box'>
                <div className='InfoEdit-wrap__div'>
                        <Text  className="InfoEdit-wrap__text">缩略图</Text>
                        {/* <Input
                            className="InfoAdd-wrap__input"
                            placeholder="请输入密码"
                            value={pwd}
                            type='password'
                            onChange={handlePwdChange}
                        /> */}
                        <input type="file" className='InfoEdit-wrap__input'/>
                    </div>
                   
                </div>

       

                <div className='InfoEdit-wrap__notice'>
                        <Text strong className="InfoEdit-wrap__text">备注</Text>
                        <textarea
                            className="InfoEdit-wrap__textarea"
                            value={notice}
                            type='textarea'
                            onChange={handleNoticeChange}
                        />
                    </div>

                <div className='InfoEdit-wrap__bottom'>
                    <Button type='danger' className='InfoEdit-wrap__bottom--btn' onClick={handleSubmit}>确定</Button>
                    <Link to='/txt/infoManage' style={{ height: '100%' }}><Button className='InfoEdit-wrap__bottom--btn' >取消</Button></Link>
                </div>
            </div>

        </div>
    )
}

export default React.memo(InfoEdit)