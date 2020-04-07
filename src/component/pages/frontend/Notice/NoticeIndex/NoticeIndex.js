import React, { useEffect, useState, useContext } from 'react'
import { Carousel, Typography, Modal, Button, Input, message } from 'antd'
import RightContext from '../../../../../context/right/rightContext'
import Spinner from '../../../../laout/Spinner'
import l_1 from '../../../../../pic/l_1.png'
import l_2 from '../../../../../pic/l_2.png'
import l_3 from '../../../../../pic/l_3.png'

import '../NoticeIndex/NoticeIndex.scss'
import { Link, Route } from 'react-router-dom'  //用于链接跳转路由，替换a标签，不会造成页面刷新，并且可以缓存数据


const NoticeIndex = (e) => {
    const { Text } = Typography

    //实例化context
    const rightContext = useContext(RightContext)
    const { getMess, mess = [], getPic, pic = [], loading } = rightContext


    useEffect(() => {  //useEffect 重构生命周期didMount
        getMess()
        getPic() // 获取轮播图与信息

        // eslint-disable-next-line
    }, [])

    console.log('mess', mess)
    console.log('pic', pic)

    if (loading) {
        return (<Spinner></Spinner>)
    }
    return (<div>
        <div className='NoticeIndex'>
            <div className='NoticeIndex-top' style={{ position: 'relative', top: '-40px' }}>
                <Carousel style={{ height: '500px', marginBottom: '30px' }} autoplay>

                    {pic.length > 0 && pic.map(e => (
                        <div key={e.id}>
                            <img src={e.path} style={{ width: '100%', height: '530px' }} alt="" />
                        </div>
                    ))}

                </Carousel>
            </div>

            <div className="container" >
                <div style={{ position: 'relative', width: '100%', height: '50px' }}>
                    <Text strong style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '50px', color: '#ff0000', textAlign: 'center' }} className='navFont'>公示公告</Text>
                </div>

                <div className='NoticeIndex-bottom'>



                    {mess.length > 0 && mess.map(e => (
                        <Link
                            key={e.id}
                            to={`/notice/notice${e.id}`}
                            className='NoticeIndex-bottom__div'>
                            <div className='NoticeIndex-bottom__divLeft'><img style={{ width: '100px', height: '100px' }} src={e.preview} className='redLink' /></div>
                            <div className='NoticeIndex-bottom__divRight'>
                                <Text className='redLink' style={{ fontSize: '25px' }} strong>{e.title}</Text>
                                <p style={{ marginTop: '15px', maxHeight: '60px', overflow: 'hidden' }}>{e.content}</p>
                            </div>
                        </Link>

                    ))}





                </div>

            </div>
        </div>

    </div>
    )
}

export default React.memo(NoticeIndex)




//


