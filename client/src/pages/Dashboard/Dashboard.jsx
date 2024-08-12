import styles from './Dashboard.module.css';

import Layout from '../../components/Layout/Layout.jsx';
import LineChart from './LineChart';
import PieChart from './PieChart';

import { useState } from 'react';
import Tabs from '../../components/Tabs';
import Sales from './Sales';
import Staff from './Staff';




const Dashboard = () => {
	const [all, setAll] = useState(null);

	return (
		<Layout>
			<div className={`${styles.dashboard} colored-scroll`}>
				<header className={styles['dashboard__header']}>
					<h1 className='title'>Sotish statistikasi</h1>
					<Tabs setFunc={setAll} />
				</header>
				<main className={`${styles['dashboard__main']} l`}>
					<div className={styles['dashboard__sales']}>
						<LineChart />
					</div>
					<div className={styles['dashboard__income']}>
						<PieChart allData={all} />
					</div>
				</main>
				<footer className={styles['dashboard__footer']}>
					<div className={styles['dashboard__footer-left']}>
						<Sales allData={all?.data?.data?.foodReport} />
					</div>
					<div className={styles['dashboard__footer-right']}>
						<Staff allData={all?.data?.data?.cashier} />
					</div>
				</footer>
			</div>
		</Layout>
	)
}

export default Dashboard;