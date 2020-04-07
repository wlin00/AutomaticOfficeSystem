import React, { useEffect, useState, useContext } from 'react'
import { Typography, Table, Input, Tag, Button, Modal, message, Select } from 'antd'
import { Link } from 'react-router-dom'
import GroupContext from '../../../../../context/group/groupContext'
import Spinner from '../../../../laout/Spinner'
import { SyncOutlined } from '@ant-design/icons';

import qs from 'qs'
import axios from 'axios'
import '../TeamManage/TeamManage.scss'




const TeamManage = (e) => {

    //基本信息
    const imgUser = require('../../../../../pic/27.png')
    const { Text } = Typography
    const { Search } = Input
    const { Option } = Select


    //实例化context
    const groupContext = useContext(GroupContext)
    const { setMode, mode, getSearchGroup, _group=[], _groupCount, getDepartment, department = [], getDutyList, duty = [], getGroup, group = [], groupCount = 0, loading } = groupContext

    //新建成员数据区域
    const [username, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [type, setType] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [type2, setType2] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管

    const [phone, setPhone] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [pwd, setPwd] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    // const [currentEdit, setCurrentEdit] = useState('')//当前删除的用户



    useEffect(() => {  //useEffect 重构生命周期didMount
        getGroup(5, 1)
        getDutyList()   //拉取职务信息外键
        getDepartment()   //拉取部门信息外键
        return handleComponentWillUnMount
    }, [])

    const handleComponentWillUnMount = () => {
        setMode(false)
    }





    //新建成员方法区域
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

    const clearAdd = () => { //清除添加用户输入框
        setType('')
        setType2('')
        setName('')
        setPhone('')
        setPwd('')
    }

    //新建成员页面逻辑部分
    const showModal1 = () => {
        setVisible1(true)
        console.log('dp', department)
        console.log('dt', duty)

    };

    const handleOk1 = e => {
        setVisible1(false)
        console.log('dp', type2, typeof String(type2))
        console.log('dt', type, typeof String(type))
        console.log('name', username, typeof username)
        console.log('pwd', pwd, typeof pwd)
        console.log('tel', phone, typeof String(phone))
        if (!type2 || !type || !username || !pwd || !phone) {
            message.info('请正确输入用户信息')
            clearAdd()
            return
        }
        if (username.length < 2 || username.length > 35) {
            message.info('用户姓名长度为2-35位之间')
            clearAdd()
            return
        }
        if (pwd.length < 6 || pwd.length > 25) {
            message.info('请设置密码长度为6-25位之间')
            clearAdd()
            return
        }
        if (phone.length < 8 || phone.length > 35) {
            message.info('联系方式长度为8-35位之间')
            clearAdd()
            return
        }

        //添加成员
        axios.put('/AutomaticOfficeSystem/organizationalManagement/api/v1/userInfo',
            qs.stringify({
                department: type2,
                duty: type,
                name: username,
                password: pwd,
                tel: phone,
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

                    message.info('新增成员成功');
                    clearAdd();
                    setCurrentPage(1)
                    setTimeout(() => {
                        getGroup(5, 1)
                    }, 200)

                }
                else {
                    message.info('更改失败，请重试');
                    clearAdd();
                    return
                }
            }, () => {
                return Promise.reject('请求失败，请重试')
            }).catch(err => {
                message.info(err)
                console.log(err)
                clearAdd()
            })
    };

    const handleCancel1 = e => {
        setVisible1(false)
        clearAdd()

    };



    //编辑成员数据区域
    const [_userusername, _setUserName] = useState('') //用户名
    const [_username, _setName] = useState(''); //  真实姓名
    const [_type, _setType] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [_type2, _setType2] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [_phone, _setPhone] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [_email, _setEmail] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管

    //编辑成员方法区域
    const _handleUserNameChange = (val) => {
        if (val.target.value.length > 25) { return }
        _setUserName(val.target.value)
    }
    const _handleTypeChange = (val) => {
        _setType(val)
    }
    const _handleType2Change = (val) => {
        _setType2(val)
    }
    const _handleNameChange = (val) => {
        if (val.target.value.length > 30) { return }
        _setName(val.target.value)
    }
    const _handlePhoneChange = (val) => {
        if (val.target.value.length > 25) { return }
        _setPhone(val.target.value)
    }
    const _handleEmailChange = (val) => {
        if (val.target.value.length > 25) { return }
        _setEmail(val.target.value)
    }

    const clearEdit = () => { //清除添加用户输入框
        _setType('')
        _setType2('')
        _setName('')
        _setPhone('')
        _setEmail('')
        _setUserName('')
    }

    //弹窗
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const [visible2, setVisible2] = useState(false)

    //独立数据区域
    const [delName, setDelName] = useState('')//当前删除的用户
    const reg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/ //邮箱正则验证



    //编辑成员页面逻辑部分
    const showModal2 = (id) => {
        setVisible2(true)
        if (!mode) {
            group.forEach(e => {
                if (e.id === id) {
                    _setUserName(e.username)
                    _setName(e.name)
                    _setType(e.duty)
                    _setType2(e.department)
                    _setPhone(e.tel)
                    _setEmail(e.email)
                }
            })
        }
        else {
            _group.forEach(e => {
                if (e.id === id) {
                    _setUserName(e.username)
                    _setName(e.name)
                    _setType(e.duty)
                    _setType2(e.department)
                    _setPhone(e.tel)
                    _setEmail(e.email)
                }
            })
        }


    };


    const handleOk2 = e => {
        setVisible2(false)
        // console.log(currentEdit)

        if (!_userusername || !_type2 || !_type || !_username || !_phone || !_email) {
            message.info('请正确输入用户信息')
            clearEdit()
            return
        }
        if (_userusername.length < 1 || _userusername.length > 35) {
            message.info('用户名长度为1-35位之间')
            clearEdit()
            return
        }
        if (_username.length < 2 || _username.length > 35) {
            message.info('姓名长度为2-35位之间')
            clearEdit()
            return
        }
        if (_phone.length < 6 || _phone.length > 35) {
            message.info('电话长度为6-35位之间')
            clearEdit()
            return
        }
        if (!reg.test(_email)) {
            message.info('请输入正确邮箱格式')
            clearEdit()
            return
        }

        console.log('username', _userusername, typeof _userusername)
        console.log('dp', _type2, typeof String(_type2))
        console.log('dt', _type, typeof String(_type))
        console.log('name', _username, typeof _username)
        console.log('email', _email, typeof _email)
        console.log('tel', _phone, typeof String(_phone))

        //编辑成员
        axios.patch('/AutomaticOfficeSystem/organizationalManagement/api/v1/userInfo',
            qs.stringify({
                userUsername: _userusername,
                department: _type2,
                duty: _type,
                name: _username,
                email: _email,
                tel: _phone,
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
                if (data.status === 200 || data.status === 204) {

                    message.info('编辑成员成功');
                    clearEdit();
                    setCurrentPage(1)
                    setTimeout(() => {
                        getGroup(5, 1)
                    }, 200)
                }
                else {
                    message.info('更改失败，请重试');
                    clearEdit();
                    return
                }
            }, () => {
                return Promise.reject('请求失败，请重试')
            }).catch(err => {
                message.info(err)
                console.log(err)
                clearEdit()
            })
    };

    const handleCancel2 = e => {
        setVisible2(false)
        clearEdit()
    };

    //删除成员部分   
    const showModal = (id) => {
        setVisible(true)
        console.log('del: ' + id)
        //mode===false  ： 普通模式
        //mode===true  ： 搜索模式

        if(!mode){
            group.forEach(e => {
                if (e.id === id) {
                    setDelName(e.username) //根据是否搜索来决定场景，来完成删除当前Del的成员
                }
            })
        }else{
            _group.forEach(e => {
                if (e.id === id) {
                    setDelName(e.username)
                }
            })
        }
    };

    const handleOk = e => {
        setVisible(false)
        console.log('ddd',delName)
        axios.delete(`/AutomaticOfficeSystem/organizationalManagement/api/v1/userInfo?userUsername=${delName}`)
            .then((data) => {
                if (data.status === 200) {
                    console.log(data)
                    message.info('删除成员成功！')
                    setCurrentPage(1)
                    setTimeout(() => {
                        getGroup(5, 1)
                    }, 200)
                }
            })
            .catch(() => { message.info('删除成员失败！') })
    };

    const handleCancel = e => {
        setVisible(false)

    };

    //分页
    const [currentPage, setCurrentPage] = useState(1)
    const paginationProps = {
        showSizeChanger: false,
        showQuickJumper: false,
        showTotal: () => `共${!mode ? groupCount : _groupCount}条`,
        pageSize: 5,
        current: currentPage,
        total: !mode ? groupCount : _groupCount,
        onShowSizeChange: (current, pageSize) => changePageSize(pageSize, current),
        onChange: (current) => changePage(current),
    }

    const changePageSize = (a, b) => {
        console.log(a, b)
    }

    const changePage = (v) => {
        console.log(v)
        setCurrentPage(v)

        //按是否搜索进行 分页查询的切换页码
        !mode ? getGroup(5, v) : getSearchGroup(currentSearch, 5, v)

    }


    //搜索区域
    const [currentSearch, setCurrentSearch] = useState('')
    const handleSearch = (v) => {
        if (!v) {
            message.info('请输入用户名来搜索~')
            return
        }
        setCurrentPage(1) //每次搜索重置页码
        getSearchGroup(v, 5, 1)
        setCurrentSearch(v)
    }

    //刷新按钮
    const handleRefresh = () => {
        getGroup(5, 1)

    }



    // const paginationProps = {
    //     showSizeChanger: true,
    //     showQuickJumper: false,
    //     showTotal: () => `共${totals}条`,
    //     pageSize: this.state.pageSize,
    //     current: page.pageNum,
    //     total: page.total,
    //     onShowSizeChange: (current, pageSize) => this.changePageSize(pageSize, current),
    //     onChange: (current) => this.changePage(current),
    // }




    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '联系方式',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: '邮箱',
            dataIndex: 'mail',
            key: 'mail',
        },
        {
            title: '职务',
            dataIndex: 'job',
            key: 'job',
        },

        {
            title: '部门',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <span>
                    {tags.map(tag => {
                        let color = 'geekblue';

                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </span>
            ),
        },



        {
            title: '操作',
            key: 'action',
            render: (text, record, index) => (
                <span>
                    <span onClick={() => { showModal2(record.key) }} className='redLink' style={{ color: 'red' }}>编辑</span>
                    <span onClick={() => {  showModal(record.key) }} className='redLink' style={{ color: 'red', position: 'relative', left: '10px' }}>删除</span>
                </span>
            ),
        },
    ];

    const data = [];
    if (!mode) {
        if (group.length >0) {
            group.forEach((item, index) => {
                data.push({
                    key: item.id,
                    //img: item.portraits == 'default.png' ? imgUser : 'http://52.80.161.97:9616/AutomaticOfficeSystem/portraits/' + item.portraits,
                    name: item.name ? item.name : '未填写',
                    phone: item.tel ? item.tel : '未填写',
                    mail: item.email ? item.email : '未填写',
                    job: item.id && item.duty && duty.length > 0 ? duty[item.duty - 1].dutyName : '未填写',
                    // tags: item.right === 0 ? ['普通用户'] : ['管理员']
                    tags: item.id && item.duty && department.length > 0 ? [`${((department[item.department - 1].name))}`] : ['未填写']
                })
            })
        }
    } else {
        if (_group.length >0) {
            _group.forEach((item, index) => {
                data.push({
                    key: item.id,
                    //img: item.portraits == 'default.png' ? imgUser : 'http://52.80.161.97:9616/AutomaticOfficeSystem/portraits/' + item.portraits,
                    name: item.name ? item.name : '未填写',
                    phone: item.tel ? item.tel : '未填写',
                    mail: item.email ? item.email : '未填写',
                    job: item.id && item.duty && duty.length > 0 ? duty[item.duty - 1].dutyName : '未填写',
                    // tags: item.right === 0 ? ['普通用户'] : ['管理员']
                    tags: item.id && item.duty && department.length > 0 ? [`${((department[item.department - 1].name))}`] : ['未填写']
                })
            })
        }
    }


    if (loading) { return (<Spinner></Spinner>) }




    return (
        <div className='TeamManage'>
            <div>
                <Modal
                    title='提示'
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <p style={{ fontWeight: 'bold' }}>
                        确认删除此成员？
                    </p>
                </Modal>
            </div>
            <div>
                <Modal
                    title="编辑成员"
                    visible={visible2}
                    onOk={handleOk2}
                    onCancel={handleCancel2}
                    destroyOnClose={true}
                >
                    <div className='TeamManage-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="List-wrap__text">真实姓名</Text>
                        <Input
                            disabled={true}
                            style={{ marginBottom: '10px' }}
                            className="TeamManage-wrap__input"
                            placeholder="请输入用户名"
                            value={_userusername}
                            onChange={_handleUserNameChange}
                        />
                    </div>
                    <div className='TeamManage-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="List-wrap__text">部门</Text>
                        <Select
                            style={{ marginBottom: '10px' }}
                            className="TeamManage-wrap__input"
                            placeholder="请选择部门"
                            onChange={_handleType2Change}
                            value={_type2}
                        >
                            {
                                department.length > 0 && department.map(e => (
                                    <Option value={e.id} key={e.id}>{e.name}</Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className='TeamManage-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="List-wrap__text">职务</Text>
                        <Select
                            style={{ marginBottom: '10px' }}
                            className="TeamManage-wrap__input"
                            placeholder="请选择职务"
                            onChange={_handleTypeChange}
                            value={_type}
                        >
                            {
                                duty.length > 0 && duty.map(e => (
                                    <Option value={e.id} key={e.id}>{e.dutyName}</Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className='TeamManage-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="List-wrap__text">真实姓名</Text>
                        <Input
                            style={{ marginBottom: '10px' }}
                            className="TeamManage-wrap__input"
                            placeholder="请输入真实姓名"
                            value={_username}
                            onChange={_handleNameChange}
                        />
                    </div>
                    <div className='TeamManage-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="List-wrap__text">邮箱</Text>
                        <Input
                            style={{ marginBottom: '10px' }}
                            className="TeamManage-wrap__input"
                            placeholder="请输入邮箱"
                            value={_email}
                            onChange={_handleEmailChange}
                        />
                    </div>
                    <div className='TeamManage-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="List-wrap__text">联系方式</Text>
                        <Input
                            style={{ marginBottom: '10px' }}
                            className="TeamManage-wrap__input"
                            placeholder="请输入联系方式"
                            type='number'
                            value={_phone}
                            onChange={_handlePhoneChange}
                        />
                    </div>
                </Modal>
            </div>

            <div>
                <Modal
                    title="添加成员"
                    visible={visible1}
                    onOk={handleOk1}
                    onCancel={handleCancel1}
                    destroyOnClose={true}
                >
                    <div className='TeamManage-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="List-wrap__text">部门</Text>
                        <Select
                            style={{ marginBottom: '10px' }}
                            className="TeamManage-wrap__input"
                            placeholder="请选择部门"
                            onChange={handleType2Change}
                        >
                            {
                                department.length > 0 && department.map(e => (
                                    <Option value={e.id} key={e.id}>{e.name}</Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className='TeamManage-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="List-wrap__text">职务</Text>
                        <Select
                            style={{ marginBottom: '10px' }}
                            className="TeamManage-wrap__input"
                            placeholder="请选择职务"
                            onChange={handleTypeChange}
                        >
                            {
                                duty.length > 0 && duty.map(e => (
                                    <Option value={e.id} key={e.id}>{e.dutyName}</Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className='TeamManage-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="List-wrap__text">真实姓名</Text>
                        <Input
                            style={{ marginBottom: '10px' }}
                            className="TeamManage-wrap__input"
                            placeholder="请输入真实姓名"
                            value={username}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className='TeamManage-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="List-wrap__text">密码</Text>
                        <Input
                            style={{ marginBottom: '10px' }}
                            className="TeamManage-wrap__input"
                            placeholder="请输入密码"
                            type='password'
                            value={pwd}
                            onChange={handlePwdChange}
                        />
                    </div>
                    <div className='TeamManage-wrap__div'>
                        <Text style={{ fontSize: 'normal' }} className="List-wrap__text">联系方式</Text>
                        <Input
                            style={{ marginBottom: '10px' }}
                            className="TeamManage-wrap__input"
                            placeholder="请输入联系方式"
                            type='number'
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                    </div>
                </Modal>
            </div>

            <div className='navText'>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>成员管理</Text>
            </div>
            <ul className='TeamManage-ul'>
                <li className='TeamManage-ul__li' style={{ marginRight: '2%' }}>
                    <Button onClick={showModal1} className='TeamManage-ul__li--link' style={{ fontSize: '15px' }}>添加成员</Button>
                </li>
                <li style={{ listStyle: 'none', position: 'relative', marginRight: '2%' }}>
                    <SyncOutlined onClick={handleRefresh} className='redLink refresh' style={{ fontSize: '23px' }} />
                </li>
                {mode &&
                    <li style={{ listStyle: 'none', position: 'relative' }}>
                        <span className='searchInfo'>为您搜索到<span style={{color:'red'}}>{_groupCount}</span>条数据～</span>
                    </li>
                }
                <li className='TeamManage-ul__li' style={{ position: 'absolute', width: '30%', right: '5%' }} >
                    <div className='TeamManage-ul__search' >
                        <Text style={{width:'65px'}}>搜索：</Text>
                        <Search
                            maxLength={15}
                            placeholder="输入用户信息搜索"
                            onSearch={handleSearch}
                            style={{ width: 200 }}
                        />
                    </div>
                </li>

            </ul>
            <div className='TeamManage-wrap'>
                <Table columns={columns} dataSource={data} pagination={paginationProps} />
            </div>

        </div>
    )
}

export default React.memo(TeamManage)
