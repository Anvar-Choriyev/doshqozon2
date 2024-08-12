import styles from './index.module.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ComposedChart, Area, ResponsiveContainer } from 'recharts';
import Daily from '../Daily';

const data = [
    {
        interval: 0,
        name: '09:00',
        pv: 10,
    },
    {
        pv: 280,
    },
    {
        interval: 100,
        name: '12:00',
        pv: 210,
    },
    {
        pv: 420,
    },
    {
        interval: 200,
        name: '16:00',
        pv: 270,
    },
    {
        pv: 330,
    },
    {
        interval: 300,
        name: '20:00',
        pv: 350,
    },
    {
        pv: 250,
    },
    {
        interval: 400,
        name: '00:00',
        pv: 180,
    },
];

const Chart = () => {
    return (
        <>
            <Daily title='Sotish statistikasi' />
            <ResponsiveContainer width={'99%'} height={271} className='re-left'>
                <ComposedChart data={data}>
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={10} />
                    <YAxis dataKey="interval" tickLine={false} axisLine={false} />
                    <CartesianGrid vertical={false} stroke='#FEBB1BD6' strokeWidth={1.5} />
                    <Area type="monotone" dataKey="pv" fill="#FEBB1BD6" stroke="none" />
                    <Line type="monotone" dataKey="pv" dot={false} strokeWidth={5} stroke="#FEBB1BD6" />
                </ComposedChart>
            </ResponsiveContainer>
        </>
    )
}

export default Chart;