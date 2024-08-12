import styles from './index.module.css';
import { Select, Space } from 'antd';
import http from '../../../utils/axios-instance';
import getPieData from '../../../utils/getPieData';
import { useState } from 'react';
import { optionsList } from '../../../mock/days';

const Daily = ({ title, setFunc, url }) => {


    const [defaultValue, setDefaultValue] = useState('today');

    const handleChange = async (value) => {
        console.log(url);
        setDefaultValue(value);
        try {
            const res = await http({ url: `${url}?${value}` });
            console.log(res);
            if (url === "/reports/circle") {
                const result = getPieData(res.data.data.sum);
                setFunc({ all: result, sum: res.data.data.allPayments });
            } else {
                setFunc(res.data.data);
            }
        } catch {

        }
    }
    return (
        <div className={styles.daily}>
            <h3 className={`name-text ${styles['daily-title']}`}>{title || 'Sotuvlar'}</h3>
            <Space>
                <Select
                    defaultValue={defaultValue}
                    style={{
                        width: 120,
                    }}
                    onChange={handleChange}
                    options={optionsList}
                />
            </Space>
        </div>
    )
}
export default Daily;