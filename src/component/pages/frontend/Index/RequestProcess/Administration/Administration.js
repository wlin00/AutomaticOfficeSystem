import React from 'react'
import { Typography } from 'antd'
import { Link } from 'react-router-dom'

import '../Administration/Administration.scss'


const Administration = (e) => {


    const { Text } = Typography


    return (
        <div className='Administration'>
            <div className='navWrap'>
                <div className='navItem'>
                    <Link
                        to='/index/overTimeReq'
                        className='navBox'><img
                            src={require('../../../../../../pic/33.png')}
                            alt='pic'
                        />
                    </Link>
                    <Text className='navItem_text'>加班申请</Text>
                </div>
                <div className='navItem'>
                    <Link
                        to='/index/vacationReq'
                        className='navBox'><img
                            src={require('../../../../../../pic/36.png')}
                            alt='pic'
                        />
                    </Link>
                    <Text className='navItem_text'>休假及外出申请</Text>
                </div>
                <div className='navItem'>
                    <Link 
                        to='/index/checkUnusual'
                        className='navBox'><img
                        src={require('../../../../../../pic/32.png')}
                        alt='pic'
                    />
                    </Link>
                    <Text className='navItem_text'>考勤异常申请</Text>
                </div>
                <div className='navItem'>
                    <Link 
                        to='/index/sealReq' 
                        className='navBox'><img
                        src={require('../../../../../../pic/31.png')}
                        alt='pic'
                    />
                    </Link>
                    <Text className='navItem_text'>用印申请</Text>
                </div>
                <div className='navItem'>
                    <Link 
                        to='/index/cardReq'
                        className='navBox'><img
                        src={require('../../../../../../pic/30.png')}
                        alt='pic'
                    />
                    </Link>
                    <Text className='navItem_text'>名片申请</Text>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Administration)
