import { PieChart, Pie, Cell, Label, Legend, ResponsiveContainer, } from 'recharts';
import http from '../../../utils/axios-instance';
import { useEffect, useState } from 'react';
import getPieData from '../../../utils/getPieData';
import Daily from '../Daily';

let defaultData = [
    { name: 'Taomlar', value: 1, color: '#777' },
];

const labelPrice = {
    fontWeight: 600,
    lineHeight: '23px',
    fontSize: '23px',
    fill: '#35383F',
}
const labelcurrency = {
    fontWeight: 500,
    lineHeight: '20px',
    fontSize: '20px',
    fill: '#35383F',
}

const format = (value) => {
    return <span style={{ color: '#000' }}>{value}</span>
}

const Chart = ({ allData }) => {

    const [data, setData] = useState({ all: null, sum: 0 });

    useEffect(() => {
        getAllDataHandler();
    }, [allData]);

    const getAllDataHandler = () => {
        const result = getPieData(allData?.data?.data?.sum);
        setData({ all: result, sum: allData?.data?.data?.allPayments });
    }

    return (
        <>
            <Daily url="/reports/circle" title='Umumiy daromad' setFunc={setData} />

            <ResponsiveContainer width={'99%'} height={287}>
                <PieChart >
                    <Pie
                        data={(data?.sum > 0 || data?.all?.legnth > 0) ? data.all : defaultData}
                        innerRadius={75}
                        dataKey="value"
                        paddingAngle={3}
                    >
                        {
                            data?.all?.length > 0
                                ?
                                data.all?.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={data?.sum > 0 ? entry.color : '#777'} />
                                ))
                                :
                                defaultData?.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))
                        }
                        <Label value={data?.sum ? data.sum : 0} position="centerBottom" dy={-20} style={labelPrice} />
                        <Label value="So'm" position="center" style={labelcurrency} dy={30} />
                    </Pie>
                    <Legend layout="horizontal" verticalAlign="bottom" align="center" formatter={format} iconType='circle' />
                </PieChart>
            </ResponsiveContainer>
        </>
    )
}

export default Chart;