import React, { useState } from 'react'
import { Typography } from 'antd'
import { Calendar, Badge, Alert } from 'antd';
import moment from 'moment';

import '../DateManage/DateManage.scss'



const DateManage = (e) => {
    let date = new Date()
    let a = date.getFullYear()
    let b = date.getMonth() + 1;
    let c = date.getDate();
    let res_a = a.toString()
    let res_b = b < 10 ? '0' + b : b.toString()
    let res_c = c < 10 ? '0' + c : c.toString()
    // console.log(res_a, res_b, res_c)
    let res = res_a + '-' + res_b + '-' + res_c

    // console.log(a,b,c)
    const [value, setValue] = useState(moment(res))
    const [selectedValue, setSelectedValue] = useState(moment(res))

    //日历

    const onSelect = value => {
        setValue(value)
        setSelectedValue(value)
        console.log(value)
    };

    const onPanelChange = value => {
        setValue(value)
    };


    const { Text } = Typography

    const getListData = (value) => {
        let listData;
        switch (value.date()) {
            case 8:
                listData = [
                    { type: 'warning', content: '小组会议.' },
                    // { type: 'success', content: '任务报告.' },
                ];
                break;
            case 20:
                listData = [
                    { type: 'warning', content: '小组会议.' },
                    // { type: 'success', content: '任务报告.' },
                ];
                break;
            case 10:
                listData = [
                    // { type: 'warning', content: '.' },
                    { type: 'success', content: '任务交付.' },
                    // { type: 'error', content: 'This is error event.' },
                ];
                break;
            case 15:
                listData = [
                    // { type: 'warning', content: 'This is warning event' },
                    // { type: 'success', content: 'This is very long usual event。。....' },
                    // { type: 'error', content: 'This is error event 1.' },
                    // { type: 'error', content: 'This is error event 2.' },
                    // { type: 'error', content: 'This is error event 3.' },
                    { type: 'error', content: '流程审批.' },
                ];
                break;
            default:
        }
        return listData || [];
    }

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map(item => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content+'add'} />
                    </li>
                ))}
            </ul>
        );
    }

    const getMonthData = (value) => {
        if (value.month() === 8) {
            return 1394;
        }
    }

    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog</span>
            </div>
        ) : null;
    }

  


    return (
        <div className='DateManage'>

            <div className='DateManage-Calendar'>
                <Alert
                    message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`}
                />
                <Calendar style={{ width: '100%', height: '600px' }} dateCellRender={dateCellRender} monthCellRender={monthCellRender}
                    value={value} onSelect={onSelect} onPanelChange={onPanelChange} onSelect={onSelect} onPanelChange={onPanelChange}
                />,
  </div>

        </div>
    )
}

export default React.memo(DateManage)





