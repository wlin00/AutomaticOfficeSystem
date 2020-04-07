import React, { useState,useEffect,useContext } from 'react'
import { Typography, Input, Table, Tag } from 'antd'
import UserContext from '../../../../../../context/user/userContext'

import '../Table2/Table2.scss'
import Spinner from '../../../../../laout/Spinner'



const Table2 = (props) => {

    //基本信息
    const imgUser = require('../../../../../../pic/27.png')
    const { Text } = Typography
    const { Search } = Input

    //实例化context
    const userContext = useContext(UserContext)
    const {getDutyList,duty=[],getTable,table=[],loading,count=0} = userContext

    //不指定第二个参数，模拟mount+update周期
    useEffect(()=>{
        getTable(props.match.params.param,5,1) //默认获取第一页数据
        getDutyList()  //拉取职务信息外键
        
    },[props.match.params.param])


    console.log('table-nth ',table,count,'duty',duty)
    //分页
    const [currentPage, setCurrentPage] = useState(1)
    const paginationProps = {
        showSizeChanger: false,
        showQuickJumper: false,
        showTotal: () => `共${count}条`,
        pageSize: 5,
        current: currentPage,
        total: count,
        onShowSizeChange: (current, pageSize) => changePageSize(pageSize, current),
        onChange: (current) => changePage(current),
    }

    const changePageSize=(a,b)=>{
        console.log(a,b)
    }

    const changePage=(v)=>{
        console.log('changePage',v)
        setCurrentPage(v)
        getTable(props.match.params.param,5,v) //分页请求，分页按页码加载

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
                {<img className='Table2-img'
                    src={src}
                    alt='pic'
                />}
            </span>,
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            render: text => <span>{text}</span>,
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
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <span>
                    {tags.map(tag => {
                        let color =  'geekblue';
                        
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </span>
            ),
        },
        // {
        //     title: '操作',
        //     key: 'action',
        //     render: (text, record) => (
        //         <span>
        //             <span style={{color:'red'}}>删除</span>
        //         </span>
        //     ),
        // },
    ];

    const data = [];
    if(table.length >0){
        table.forEach((item,index)=>{
            data.push({
                key:item.id,
                img: item.portraits.includes('default.png')  ? imgUser : 'http://52.80.161.97:9616/AutomaticOfficeSystem/portraits/' + item.portraits,
                name: item.name ? item.name : '未填写',
                phone: item.tel? item.tel : '未填写',
                mail: item.email ? item.email : '未填写',
                tags: item.id && item.duty && duty.length > 0 ? [`${((duty[item.duty-1].dutyName))}`]  : ['未填写']
            })
        })
    }

   if(loading){return <Spinner></Spinner>}
    return (
        <div className='Table2'>
            <div className='Table2-table' style={{ marginBottom: '10px' }}>
                <Table columns={columns} dataSource={data} pagination={paginationProps} />
            </div>
        </div>
    )
}

export default React.memo(Table2)




