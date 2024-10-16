// 4: get bar chart data for price ranges
app.get('/api/transactions/bar-chart', async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ message: 'Month is required for chart data' });
    }

    try {
        const priceRanges = [
            { range: "0-100", min: 0, max: 100 },
            { range: "101-200", min: 101, max: 200 },
            { range: "201-300", min: 201, max: 300 },
            { range: "301-400", min: 301, max: 400 },
            { range: "401-500", min: 401, max: 500 },
            { range: "501-600", min: 501, max: 600 },
            { range: "601-700", min: 601, max: 700 },
            { range: "701-800", min: 701, max: 800 },
            { range: "801-900", min: 801, max: 900 },
            { range: "901-above", min: 901, max: Number.MAX_SAFE_INTEGER }
        ];

        const chartData = []; 

        for (const range of priceRanges) {
            try {
                const count = await Transaction.countDocuments({
                    month: parseInt(month, 10), 
                    price: { $gte: range.min, $lte: range.max }
                });
                chartData.push({ range: range.range, count }); 
            } catch (error) {
                console.error(`Error fetching data for range ${range.range}:`, error);
                chartData.push({ range: range.range, count: 0 }); 
            }
        }

        res.status(200).json(chartData);
    } catch (error) {
        console.error('Error fetching chart data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});