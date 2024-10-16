// api 5:combined data from all three api
app.get('/api/transactions/combined-data', async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ message: 'Month is required for the combined response' });
    }

    try {
        const transactionsResponse = await axios.get(`http://localhost:${PORT}/api/transactions?month=${month}`);
        const statsResponse = await axios.get(`http://localhost:${PORT}/api/transactions/stats?month=${month}`);
        const barChartResponse = await axios.get(`http://localhost:${PORT}/api/transactions/bar-chart?month=${month}`);
        const pieChartResponse = await axios.get(`http://localhost:${PORT}/api/transactions/pie-chart?month=${month}`);

        const combinedResponse = {
            transactions: transactionsResponse.data,
            statistics: statsResponse.data,
            barChartData: barChartResponse.data,
            pieChartData: pieChartResponse.data
        };

        res.status(200).json(combinedResponse);
    } catch (error) {
        console.error('Error fetching combined data:', error);
        res.status(500).json({ message: 'Internal server error while fetching combined data' });
    }
});