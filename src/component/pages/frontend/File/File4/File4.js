import React, { useEffect,useState } from 'react'
import { Typography,Table,Button,Modal } from 'antd'
import { Link } from 'react-router-dom'

import '../File4/File4.scss'




const File4 = (e) => {

 //弹窗    
 const [visible, setVisible] = useState(false)

 const showModal = (index) => {
     setVisible(true)
     console.log('index: '+index)
 };

 const handleOk = e => {
     setVisible(false)
 };

 const handleCancel = e => {
     setVisible(false)
 };
        //分页
const [currentPage, setCurrentPage] = useState(1)
const paginationProps = {
    showSizeChanger: false,
    showQuickJumper: false,
    showTotal: () => `共6条`,
    pageSize: 5,
    current: currentPage,
    total: 6,
    onShowSizeChange: (current, pageSize) => changePageSize(pageSize, current),
    onChange: (current) => changePage(current),
}

const changePageSize = (a, b) => {
    console.log(a, b)
}

const changePage = (v) => {
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
        title: '名称',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '上传时间',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: '上传人',
        dataIndex: 'name',
        key: 'name',
    },
   
    
    {
        title: '操作',
        key: 'action',
        render: (text, record,index) => (
            <span>
                <span className='redLink' style={{ color: 'red' }}>下载</span>
                <span onClick={()=>showModal(index+(currentPage-1)*5)} className='redLink' style={{ color: 'red',position:'relative',left:'10px' }}>删除</span>
            </span>
        ),
    },
];

const data = [
    {
        key: '1',
        title:'合同文件1',
        date:'2020-2-1',
        name:'张文桥1',
    },
    {
        key: '2',
        title:'合同文件2',
        date:'2020-2-1',
        name:'张文桥2',
    },
    {
        key: '3',
        title:'合同文件3',
        date:'2020-2-1',
        name:'张文桥3',
    },
    {
        key: '4',
        title:'合同文件4',
        date:'2020-2-1',
        name:'张文桥4',
    },
    {
        key: '5',
        title:'合同文件5',
        date:'2020-2-1',
        name:'张文桥5',
    },
    {
        key: '6',
        title:'合同文件6',
        date:'2020-2-1',
        name:'张文桥6',
    },
   
  
];

    useEffect(() => {  //useEffect 重构生命周期didMount
        console.log('indexBack-page ')
        // eslint-disable-next-line
    }, [])

    
    const { Text } = Typography

    return (
        <div className='File4'>
             <div>
            <Modal
                    title='提示'
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <p style={{fontWeight:'bold'}}>
                    确认删除此信息？
                    </p>
                </Modal>
            </div>
            <div className='navText'>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>销售材料</Text>
            </div>
            <ul className='File4-ul'>
                <li className='File4-ul__li'>
                    <Link to={`/fileback/upload/${4}`}><Button className='File2-ul__li--link' style={{fontSize:'15px'}}>上传文件</Button></Link>
                </li>    
            </ul>
            <div className='File4-wrap'>
              <Table columns={columns} dataSource={data} pagination={paginationProps} />
            </div>

        </div>
    )
}

export default File4
