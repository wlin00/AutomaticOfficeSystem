import React from 'react'
import { Typography } from 'antd'
import {Link} from 'react-router-dom'

import '../Personnel/Personnel.scss'


const Personnel = (e) => {


    const { Text } = Typography


    return (
        <div className='Personnel'>
         <div className='navWrap'>
         <div className='navItem'>
                    <Link 
                        to='/index/travelReq'
                        className='navBox'><img
                        src={require('../../../../../../pic/35.png')}
                        alt='pic'
                    />
                    </Link>
                    <Text className='navItem_text'>差旅申请</Text>
                </div>
            </div>

        </div>
    )
}

export default React.memo(Personnel)
