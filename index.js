const express = require('express');
const cors = require('cors');
const app = express();
const port = 8800;

app.use(cors());

// Sample transaction data
const transactions = [
    { id: 1, amount: 100, description: 'Groceries', date: '2023-03-01', sold: true },
    { id: 2, amount: 200, description: 'Gas', date: '2023-03-02', sold: true },
    { id: 3, amount: 50, description: 'Coffee', date: '2023-03-03', sold: false },
    { id: 4, amount: 300, description: 'Restaurant', date: '2023-04-01', sold: true },
    { id: 5, amount: 150, description: 'Groceries', date: '2023-04-02', sold: false },
];

// Endpoint to get price ranges
app.get('/price-ranges', (req, res) => {
    const { month } = req.query;

    // Filter transactions by month
    const filteredTransactions = transactions.filter(t => {
        const transactionMonth = new Date(t.date).getMonth() + 1;
        return transactionMonth === parseInt(month);
    });

    // Define price ranges
    const priceRanges = [
        { range: '0-100', min: 0, max: 100, count: 0 },
        { range: '101-200', min: 101, max: 200, count: 0 },
        { range: '201-300', min: 201, max: 300, count: 0 },
        { range: '301+', min: 301, max: Infinity, count: 0 },
    ];

    // Count transactions in each price range
    filteredTransactions.forEach(t => {
        for (const range of priceRanges) {
            if (t.amount >= range.min && t.amount <= range.max) {
                range.count++;
                break;
            }
        }
    });

    res.json(priceRanges);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});