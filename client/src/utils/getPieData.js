const getPieData = (res) => {
    if (res?.length > 0) {
        const formattedData = res.map(elem => ({ name: elem.name, color: elem.color, value: Math.trunc(elem.sum / 100) }));
        // const allSum = res.data.data?.sum.reduce((acc, elem) => acc += +elem.sum, 0);
        return formattedData;
    } else {
        return [];
    }
    // if (res) {
    //     const formattedData = res.data.data?.sum.map(elem => ({ name: elem.name, color: elem.color, value: Math.trunc(elem.sum / 100) }));
    //     const allSum = res.data.data?.sum.reduce((acc, elem) => acc += +elem.sum, 0);
    //     return { formattedData, allSum };
    // }
}

export default getPieData;