import React, {
    useState, useEffect
    // , useContext
} from 'react'
import { Typography, Input, Button, DatePicker, message, Select } from 'antd'
import { Link } from 'react-router-dom'
import qs from 'qs'
import axios from 'axios'
import moment from 'moment'
import '../pactReq/pactReq.scss'



const PactReq = (props) => {
    const [username, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [title, setTitle] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [number, setNumber] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [type, setType] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [pact, setPact] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [bank, setBank] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [money, setMoney] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [date, setDate] = useState(null); // reactHook 重构： 使用useState重构state，进行状态接管


    const { Text } = Typography
    const { Option } = Select

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
        setNumber('')
        setType('')
        setPact('')
        setBank('')
        setMoney('')
        setDate(null)
    }
    // 数据双向绑定
    const handleTitleChange = (val) => {
        if (val.target.value.length > 30) { return }
        setTitle(val.target.value)
    }
    const handleNameChange = (val) => {
        if (val.target.value.length > 30) { return }
        setName(val.target.value)
    }
    const handleNumberChange = (val) => {
        if (val.target.value.length > 25) { return }
        setNumber(val.target.value)
    }
    const handlePactChange = (val) => {
        if (val.target.value.length > 25) { return }
        setPact(val.target.value)
    }
    const handleBankChange = (val) => {
        if (val.target.value.length > 35) { return }
        setBank(val.target.value)
    }
    const handleMoneyChange = (val) => {
        if (val.target.value.length > 25) { return }
        setMoney(val.target.value)
    }
    const handleTypeChange = (val) => {
        setType(val)
    }
    const handleDateChange = (val) => {
        setDate(val)

    }
    const handleSubmit = () => {

        if (!username || !title || !number || !type || !pact || !bank || !money || !date) {
            message.info('请填写合同申请信息！')
            clearData()
            return
        }

        let _date = String(date.format('YYYY-MM-DD HH:mm:ss'))
        let _money = String(money + '元')
        let _number = String(number)

        //加班申请
        axios.put('/AutomaticOfficeSystem/processCenter/api/v1/contractPaymentApplication',
            qs.stringify({
             amount:_money,
             bankcardNo:bank,
             contractId:_number,
             contractName:pact,
             name:username,
             paymentDate:_date,
             paymentTerm:type,
             title,
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

                    message.info('提交合同申请成功～');
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
        <div className='pactReq'>
            <div className='navText'>
                <Text strong className='navFont'>合同申请</Text>
            </div>
            <div className='pactReq-wrap'>
                <div className='pactReq-wrap__title'>合同申请</div>
                <div className='pactReq-wrap__box'>
                    <div className='pactReq-wrap__div'>
                        <Text strong className="pactReq-wrap__text">主题</Text>
                        <Input
                            className="pactReq-wrap__input"
                            placeholder="请输入主题"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className='pactReq-wrap__div'>
                        <Text strong className="pactReq-wrap__text">姓名</Text>
                        <Input
                            className="pactReq-wrap__input"
                            placeholder="请输入姓名"
                            value={username}
                            onChange={handleNameChange}
                        />
                    </div>
                </div>
                
                <div className='pactReq-wrap__box'>
                    <div className='pactReq-wrap__div'>
                        <Text strong className="pactReq-wrap__text">付款日期</Text>
                        <DatePicker
                            value={date}
                            onChange={handleDateChange}
                            onChange={handleDateChange} className="pactReq-wrap__input"></DatePicker>
                    </div>
                    <div className='pactReq-wrap__div'>
                        <Text strong className="pactReq-wrap__text">合同编号</Text>
                        <Input
                            className="pactReq-wrap__input"
                            placeholder="请输入合同编号"
                            value={number}
                            type='number'
                            onChange={handleNumberChange}
                        />
                    </div>
                </div>


                <div className='vacationReq-wrap__box' style={{ marginTop: '25px' }}>
                    <div className='vacationReq-wrap__div'>
                        <Text strong className="vacationReq-wrap__text">付款方式</Text>
                        <Select
                            className="vacationReq-wrap__input"
                            placeholder="请选择付款方式"
                            onChange={handleTypeChange}
                            value={type}
                        >

                            <Option value='现金'>现金</Option>
                            <Option value='银行卡'>银行卡</Option>
                            <Option value='支付宝'>支付宝</Option>
                            <Option value='微信'>微信</Option>

                        </Select>
                    </div>
                    <div className='vacationReq-wrap__div' >
                        <Text strong className="vacationReq-wrap__text">合同名称</Text>
                        <Input
                            className="vacationReq-wrap__input"
                            placeholder="请输入合同名称"
                            value={pact}
                            onChange={handlePactChange}
                        />
                    </div>
                </div>

                <div className='pactReq-wrap__box' style={{ marginTop: '25px' }}>
                    <div className='pactReq-wrap__div'>
                        <Text strong className="pactReq-wrap__text">银行卡号</Text>
                        <Input
                            className="pactReq-wrap__input"
                            placeholder="请输入银行卡号"
                            value={bank}
                            type='number'
                            onChange={handleBankChange}
                        />
                    </div>
                    <div className='pactReq-wrap__div'>
                        <Text strong className="pactReq-wrap__text">付款金额</Text>
                        <Input
                            className="pactReq-wrap__input"
                            placeholder="请输入付款金额"
                            value={money}
                            type='number'
                            onChange={handleMoneyChange}
                        />
                    </div>
                </div>

                <div className='pactReq-wrap__bottom'>
                    <Button type='danger' className='pactReq-wrap__bottom--btn' onClick={handleSubmit}>确定</Button>
                    <Link to='/index/requestProcess/expense' style={{ height: '100%' }}><Button className='pactReq-wrap__bottom--btn' >取消</Button></Link>
                </div>

            </div>



        </div>
    )
}

export default React.memo(PactReq)
