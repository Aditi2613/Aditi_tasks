//  3: get transaction statistics
app.get('/api/transactions/stats', async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ message: 'Month is required for statistics' });
    }

    try {
        const stats = await Transaction.aggregate([
            { $match: { month: parseInt(month, 10) } }, 
            {
                $group: {
                    _id: null,
                    totalSale: { $sum: "$price" },
                    totalSoldItems: { $sum: { $cond: ["$sold", 1, 0] } },
                    totalNotSoldItems: { $sum: { $cond: ["$sold", 0, 1] } }
                }
            }
        ]);

        if (stats.length > 0) {
            res.status(200).json(stats[0]);
        } else {
            res.status(404).json({ message: 'No data found for the selected month' });
        }
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).send('Error fetching statistics');
    }
});