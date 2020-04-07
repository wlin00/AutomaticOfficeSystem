import React, { useEffect, useState, useContext } from 'react'
import { Typography, Table, Input, Tag, Button, Modal, message, Select } from 'antd'
import { Link } from 'react-router-dom'
import UserContext from '../../../../../../context/user/userContext'
import Spinner from '../../../../../laout/Spinner'
import { SyncOutlined } from '@ant-design/icons';

import qs from 'qs'
import axios from 'axios'
import '../SearchTable/SearchTable.scss'




const SearchTable = (props) => {

    //基本信息
    const imgUser = require('../../../../../../pic/27.png')
    const { Text } = Typography
    const { Search } = Input
    const { Option } = Select


    //实例化context
    const userContext = useContext(UserContext)
    const { val,setMode, mode, getSearchTable, _table=[], _count=0, getDepartment, department = [], getDutyList, duty = [], getGroup, group = [], groupCount = 0, loading } = userContext


    useEffect(() => {  //useEffect 重构生命周期didMount
        //由用户是否搜索来判断加载
        props.location.query ?  getSearchTable(props.location.query.name, 5, 1) : getGroup(5, 1)       
        getDutyList()   //拉取职务信息外键
        getDepartment()   //拉取部门信息外键
        return handleComponentWillUnMount
    }, [])

    const handleComponentWillUnMount = () => {
        setMode(false)
    }

    // console.log(mode,groupCount)
     console.log(props.location.query,'qqq')








   

    //分页
    const [currentPage, setCurrentPage] = useState(1)
    const paginationProps = {
        showSizeChanger: false,
        showQuickJumper: false,
        showTotal: () => `共${!mode ? groupCount : _count}条`,
        pageSize: 5,
        current: currentPage,
        total: !mode ? groupCount : _count,
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
        !mode ? getGroup(5, v) : getSearchTable(val, 5, v)

    }


    //搜索区域
    const [currentSearch, setCurrentSearch] = useState(val)
    const handleSearch = (v) => {
        if (!v) {
            message.info('请输入用户名来搜索~')
            return
        }
        setCurrentPage(1) //每次搜索重置页码
        getSearchTable(v, 5, 1)
        setTimeout(()=>{
            setCurrentSearch(v)
        })
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
            title: '头像',
            dataIndex: 'img',
            key: 'img',
            render: src => <span>
                {<img className='Table1-img'
                    src={src}
                    alt='pic'
                />}
            </span>,
        },
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



    ];

    // console.log(group)
    const data = [];
    // console.log('res', _group)
    // console.log('count', _groupCount)
    // console.log('mode', mode)
    // console.log('search', currentSearch)
    if (!mode) {
        if (group.length >0) {
            group.forEach((item, index) => {
                data.push({
                    key: item.id,
                    img: item.portraits.includes('default.png') ? imgUser : 'http://52.80.161.97:9616/AutomaticOfficeSystem/portraits/' + item.portraits,
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
        if (_table.length >0) {
            _table.forEach((item, index) => {
                data.push({
                    key: item.id,
                    img: item.portraits.includes('default.png') ? imgUser : 'http://52.80.161.97:9616/AutomaticOfficeSystem/portraits/' + item.portraits,
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
        <div className='SearchTable'>
             <div className='navText' style={{position:'relative'}}>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>用户搜索</Text>
                <div className='SearchTable-search' >
                <Text style={{minWidth:'65px'}}>搜索：</Text>
                <Search
                    maxLength={20}
                    placeholder="输入用户名搜索"
                    onSearch={handleSearch}
                    style={{ width: 200 }}
                />
            </div>
            </div>

            <ul className='SearchTable-ul'>
                <li style={{ listStyle: 'none', position: 'relative', left:'20px',marginRight: '2%',display:'flex',justifyContent:'space-around',alignItems:'center' }}>
                    <SyncOutlined onClick={handleRefresh} className='redLink ' style={{ fontSize: '23px' ,transform:'translateY(-50%)',top:'50%',position:'absolute'}} />
                </li>
                {mode &&
                    <li style={{ listStyle: 'none', position: 'relative', left:'20px' }}>
                        <span style={{transform:'translateY(-50%)'}} className='searchInfo'>为您搜索到<span style={{color:'red'}}>{_count}</span>条数据～</span>
                    </li>
                }   
                <Link to='/people/addressBook' className='AccountEdit-link' ><Button className='SearchTable-btn' type='danger'>返回</Button></Link>

            </ul>
            <div className='SearchTable-wrap'>
                <Table columns={columns} dataSource={data} pagination={paginationProps} />
            </div>

        </div>
    )
}

export default React.memo(SearchTable)
