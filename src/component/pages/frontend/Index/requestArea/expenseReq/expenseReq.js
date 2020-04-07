import React, {
    useState, useEffect
    // , useContext
} from 'react'
import { Typography, Input, Button, DatePicker, message, Select } from 'antd'
import { Link } from 'react-router-dom'
import qs from 'qs'
import axios from 'axios'
import moment from 'moment'
import '../expenseReq/expenseReq.scss'



const ExpenseReq = (props) => {
    const [username, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [title, setTitle] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [money, setMoney] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [notice, setNotice] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [type, setType] = useState('')
    const [receip, setReceip] = useState('')
    const [account, setAccount] = useState('')
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
        setNotice('')
        setType('')
        setDate(null)
        setAccount('')
        setReceip('')
        setMoney('')
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
    const handleMoneyChange = (val) => {
        if (val.target.value.length > 25) { return }
        setMoney(val.target.value)
    }
    const handleNoticeChange = (val) => {
        if (val.target.value.length > 140) { return }
        setNotice(val.target.value)
    }
    const handleTypeChange = (val) => {
        setType(val)
    }
    const handleReceiptChange = (val) => {
        if (val.target.value.length > 35) { return }
        setReceip(val.target.value)
    }
    const handleAccountChange = (val) => {
        if (val.target.value.length > 35) { return }
        setAccount(val.target.value)
    }
    const handleDateChange = (val) => {
        setDate(val)
    }
    const handleSubmit = () => {

        if (!username || !title || !money || !notice || !type || !receip || !account || !date) {
            message.info('请填写费用申请信息！')
            clearData()
            return
        }

        let _date = String(date.format('YYYY-MM-DD HH:mm:ss'))
        let _money = String(money + '元')

        //加班申请
        axios.put('/AutomaticOfficeSystem/processCenter/api/v1/reimbursementApplication',
            qs.stringify({
                accountNo: account,
                amount: _money,
                invoiceNo: receip,
                name: username,
                note: notice,
                paymentDate: _date,
                paymentWay: type,
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

                    message.info('提交费用申请成功～');
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
        <div className='expenseReq'>
            <div className='navText'>
                <Text strong className='navFont'>费用报销</Text>
            </div>
            <div className='expenseReq-wrap'>
                <div className='expenseReq-wrap__title' style={{ marginBottom: '1px' }}>费用报销</div>
                <div className='expenseReq-wrap__box' style={{ marginBottom: '-20px' }}>
                    <div className='expenseReq-wrap__div' >
                        <Text strong className="expenseReq-wrap__text">主题</Text>
                        <Input
                            className="expenseReq-wrap__input"
                            placeholder="请输入主题"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className='expenseReq-wrap__div'>
                        <Text strong className="expenseReq-wrap__text">姓名</Text>
                        <Input
                            className="expenseReq-wrap__input"
                            placeholder="请输入姓名"
                            value={username}
                            onChange={handleNameChange}
                        />
                    </div>
                </div>
                
                <div className='expenseReq-wrap__box'>
                    <div className='expenseReq-wrap__div'>
                        <Text strong className="expenseReq-wrap__text">付款日期</Text>
                        <DatePicker
                            value={date}
                            onChange={handleDateChange}
                            className="expenseReq-wrap__input"></DatePicker>
                    </div>
                    <div className='expenseReq-wrap__div'>
                        <Text strong className="expenseReq-wrap__text">报销金额</Text>
                        <Input
                            className="expenseReq-wrap__input"
                            placeholder="请输入报销金额数(元)"
                            value={money}
                            type='number'
                            onChange={handleMoneyChange}
                        />
                    </div>
                </div>

                <div className='vacationReq-wrap__box' style={{ marginTop: '15px' }}>
                    <div className='vacationReq-wrap__div'>
                        <Text strong className="vacationReq-wrap__text">付款方式</Text>
                        <Select
                            className="vacationReq-wrap__input"
                            placeholder="请选择付款方式"
                            onChange={handleTypeChange}
                            value={type}
                        >
                            <Option value='银行卡'>银行卡</Option>
                            <Option value='支付宝'>支付宝</Option>

                        </Select>
                    </div>
                    <div className='vacationReq-wrap__div' >
                        <Text strong className="vacationReq-wrap__text">发票抬头</Text>
                        <Input
                            className="vacationReq-wrap__input"
                            placeholder="请输入发票抬头"
                            value={receip}
                            onChange={handleReceiptChange}
                        />
                    </div>
                </div>

                <div className='vacationReq-wrap__box' style={{ marginTop: '15px', width: '50%' }}>
                    <div className='vacationReq-wrap__div' >
                        <Text strong className="vacationReq-wrap__text">交易账号</Text>
                        <Input
                            className="vacationReq-wrap__input"
                            placeholder="请输入银行卡号/支付宝账号"
                            value={account}
                            onChange={handleAccountChange}
                        />
                    </div>
                </div>


                <div className='expenseReq-wrap__notice'>
                    <Text strong className="expenseReq-wrap__text">说明</Text>
                    <textarea
                        className="expenseReq-wrap__textarea"
                        value={notice}
                        type='textarea'
                        onChange={handleNoticeChange}
                    />
                </div>

                <div className='expenseReq-wrap__bottom'>
                    <Button type='danger' className='expenseReq-wrap__bottom--btn' onClick={handleSubmit}>确定</Button>
                    <Link to='/index/requestProcess/expense' style={{ height: '100%' }}><Button className='expenseReq-wrap__bottom--btn' >取消</Button></Link>
                </div>

            </div>



        </div>
    )
}

export default React.memo(ExpenseReq)
