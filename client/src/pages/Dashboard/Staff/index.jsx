import styles from './index.module.css';
import STUFF from '../../../assets/images/default-avatar.jpg';
import { imageURL } from '../../../utils/axios-instance';

import Daily from '../Daily';
import { useEffect, useState } from 'react';


const Staff = ({ allData }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(allData);
    }, [allData]);

    return (
        <>
            <Daily url="/reports/rbyCash" setFunc={setData} />
            <ul className={`colored-scroll ${styles['staff']}`}>
                {data?.length > 0 ? data?.map((staff) => <li key={staff?.id} className={styles['staff__item']}>
                    <div className={styles['staff-item__left']}>
                        <img src={staff?.img ? `${imageURL}/img/${staff?.img}` : STUFF} alt={staff?.name} />
                        <div>
                            <p className={`subttile`}>{staff?.name}</p>
                        </div>
                    </div>
                    <div className={styles['staff-item__right']}>
                        <p>{staff?.sum}</p>
                        <p>so'm</p>
                    </div>
                </li>)
                    :
                    <h2 className={styles['staff-center']}>Ma'lumot mavjud emas</h2>
                }
            </ul>
        </>
    )
}
export default Staff;