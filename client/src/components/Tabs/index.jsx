import styles from './index.module.css';
import { useEffect, useState } from 'react';
import { optionsList } from '../../mock/days';
import http from '../../utils/axios-instance';


const Tabs = ({ setFunc }) => {

    const [activeTab, setActiveTab] = useState('today');

    useEffect(() => {
        handleClick();
    }, []);

    const handleClick = async (tab = activeTab) => {
        // console.log(tab);
        try {
            const res = await http({ url: `/reports/dashboard?${tab.toLocaleLowerCase()}&all` });
            setActiveTab(tab);
            setFunc(res);
            // console.log(res);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <ul className={styles['tabs']}>
            {optionsList.map(day =>
                <li
                    className={`main-text ${day.value === activeTab ? styles['tab-item-active'] : styles['tab-item']}`}
                    key={day.value}
                    onClick={() => handleClick(day.value)}
                >
                    {day.label}
                </li>)}
        </ul>
    );
}
export default Tabs;