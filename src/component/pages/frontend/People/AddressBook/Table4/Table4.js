import React, { useState } from 'react'
import { Typography, Input, Table, Tag } from 'antd'

import '../Table4/Table4.scss'



const Table4 = (e) => {


    const { Text } = Typography
    const { Search } = Input

    //分页
    const [currentPage, setCurrentPage] = useState(1)
    const paginationProps = {
        showSizeChanger: false,
        showQuickJumper: false,
        showTotal: () => `共7条`,
        pageSize: 5,
        current: currentPage,
        total: 7,
        onShowSizeChange: (current, pageSize) => changePageSize(pageSize, current),
        onChange: (current) => changePage(current),
    }

    const changePageSize=(a,b)=>{
        console.log(a,b)
    }

    const changePage=(v)=>{
        console.log(v)
        setCurrentPage(v)
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
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <span style={{color:'red'}}>删除</span>
                </span>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            phone: 13302929393,
            mail: 'wlin0z@163.com',
            tags: [ 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            phone: 13302929393,
            mail: '1033764511@qq.com',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            phone: 13302929393,
            mail: 'wlin0z@163.com',
            tags: [ 'manager'],
        },
        {
            key: '4',
            name: 'Joe Black2',
            phone: 13302929393,
            mail: 'wlin0z@163.com',
            tags: [ 'teacher'],
        },
        {
            key: '5',
            name: 'Joe Black3',
            phone: 13302929393,
            mail: 'wlin0z@163.com',
            tags: ['teacher'],
        },
        {
            key: '6',
            name: 'Joe Black4',
            phone: 15802929393,
            mail: 'wlin0z@163.com',
            tags: ['student'],
        },
        {
            key: '7',
            name: 'Jim Green',
            phone: 15802929393,
            mail: 'wlin0z@163.com',
            tags: ['student'],
        },




    ];


    return (
        <div className='Table4'>
            <div className='Table4-search' >
                <Text>搜索：</Text>
                <Search
                    maxLength={20}
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }}
                />
            </div>
            <div className='Table4-table' style={{ marginBottom: '10px' }}>
                <Table columns={columns} dataSource={data} pagination={paginationProps} />
            </div>
        </div>
    )
}

export default Table4




