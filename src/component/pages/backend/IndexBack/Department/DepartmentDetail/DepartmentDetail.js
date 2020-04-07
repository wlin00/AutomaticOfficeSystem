import React, { useEffect,useState,useContext } from 'react'
import { Typography, Modal, Button,Input,message } from 'antd'
import { Link } from 'react-router-dom'
import GroupContext from '../../../../../../context/group/groupContext'
import '../DepartmentDetail/DepartmentDetail.scss'




const DepartmentDetail = (props) => {

    //基本信息区域
    const { Text } = Typography

    //实例化context
    const groupContext = useContext(GroupContext)
    const { info,title,getIcons,depIcon=[], loading } = groupContext
 

    useEffect(() => {  //useEffect 重构生命周期didMount
        getIcons(props.match.params.param)
        // eslint-disable-next-line
    }, [])
    console.log(title,'tt')

    const [name, setName] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    const [notice, setNotice] = useState(''); // reactHook 重构： 使用useState重构state，进行状态接管
    console.log(depIcon)

    const getTitle =()=>{
        console.log(depIcon,'a')
        console.log(props.match.params.param,'b')

    }
    const handleNameChange = (val) => {
        if (val.target.value.length > 30) { return }
        setName(val.target.value)
    }
    const handleNoticeChange = (val) => {
        if(val.target.value.length>140){return}
        setNotice(val.target.value)
    }

    //弹窗    
    const [visible, setVisible] = useState(false)

    const showModal = () => {
        setVisible(true)
        console.log('add')
        console.log(depIcon)
    };

    const handleOk = e => {
        setVisible(false)
    };

    const handleCancel = e => {
        setVisible(false)
    };



    return (
        <div className='DepartmentDetail'>
            
            <div className='navText'>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>{`组织信息 - ${title}`}</Text>
                <Link to='/indexBack/department' className='DepartmentDetail-link' ><Button className='AccountEdit-btn' type='danger'>返回</Button></Link>
            </div>
    
            <div  className='DepartmentDetail-detail'>
                <Text className='DepartmentDetail-detail__text'>
                   {info}
                </Text>
            </div>
        </div>


    )
}

export default React.memo(DepartmentDetail)
