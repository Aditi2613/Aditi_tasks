//task01: Seeddb by fetching data from the api

app.get('/api/seed', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');

        await Transaction.deleteMany();

        const transactionsWithMonth = response.data.map(transaction => {
            const dateOfSale = new Date(transaction.dateOfSale);
            return {
                ...transaction,
                month: dateOfSale.getMonth() + 1 
            };
        });

        await Transaction.insertMany(transactionsWithMonth);
        res.status(200).send('Database seeded successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error seeding database');
    }
});