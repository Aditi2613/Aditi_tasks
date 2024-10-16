// 4: Get pie chart data
app.get('/api/transactions/pie-chart', async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ message: 'Month is required for pie chart data' });
    }

    try {
      
        const soldCountPromise = Transaction.countDocuments({
            month: parseInt(month, 10),
            sold: true
        });

        const notSoldCountPromise = Transaction.countDocuments({
            month: parseInt(month, 10), 
            sold: false
        });

       
        const [soldCount, notSoldCount] = await Promise.all([soldCountPromise, notSoldCountPromise]);

        res.status(200).json({ sold: soldCount, notSold: notSoldCount });
    } catch (error) {
        console.error('Error fetching pie chart data:', error.message || error);
        res.status(500).send('Error fetching pie chart data');
    }
});