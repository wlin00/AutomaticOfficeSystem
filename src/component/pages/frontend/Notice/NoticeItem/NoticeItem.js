import React, { useEffect,useState,useContext } from 'react'
import { Typography, Modal, Button,Input,message } from 'antd'
import { Link } from 'react-router-dom'
import '../NoticeItem/NoticeItem.scss'
import RightContext from '../../../../../context/right/rightContext'




const NoticeItem = (props) => {
    
    //基本信息区域
    const { Text } = Typography
    const parantNode = document.querySelector('.Notice')

    //实例化context
    const rightContext = useContext(RightContext)
    const {getMess, messTitle,messInfo, loading } = rightContext
 

    useEffect(() => {  //useEffect 重构生命周期didMount
        getMess(props.match.params.param)
        changeStyle1()
        return changeStyle2
        // eslint-disable-next-line
    }, [])
    console.log(messTitle,'tt_info')
 
    const changeStyle1 =()=>{

        if(parantNode){
            parantNode.classList.add('NoticeItem-add')
           }
    }

    const changeStyle2 =()=>{

        if(parantNode){
            parantNode.classList.remove('NoticeItem-add')
           }
    }




    return (
        <div className='NoticeItem'>
            
            <div className='navText'>
                <Text strong style={{ color: '#ff0000' }} className='navFont'>{`公式公告 - ${messTitle}`}</Text>
                <Link to='/notice' className='NoticeItem-link' ><Button className='NoticeItem-btn' type='danger'>返回</Button></Link>
            </div>
    
            <div  className='NoticeItem-detail'>
                <Text className='NoticeItem-detail__text'>
                   {messInfo}
                </Text>
            </div>
        </div>

    

    )
}

export default React.memo(NoticeItem)
