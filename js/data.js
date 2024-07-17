export const data={
    "customers": [
        {
        "id": 1,
        "name": "Ahmed Ali"
        },
        {
        "id": 2,
        "name": "Aya Elsayed"
        },
        
        {
        "id": 3,
        "name": "Mina Adel"
        },
        {
        "id": 4,
        "name": "Sarah Reda"
        },
        {
        "id": 5,
        "name": "Mohamed Sayed"
        },
        {
        "id": 6,
        "name": "Buthaina Abdeldaym"
        },
        {
        "id": 7,
        "name": "Alaa Abdelrhman"
        },
        {
        "id": 8,
        "name": "Khaled Hemdan"
        }
    ],
    "transactions": [
        {
        "id": 1,
        "customer_id": 1,
        "date": "2022-01-01",
        "amount": 1000
        },
        {
        "id": 2,
        "customer_id": 1,
        "date": "2022-01-02",
        "amount": 2000
        },
        {
        "id": 3,
        "customer_id": 2,
        "date": "2022-01-01",
        "amount": 550
        },
        {
        "id": 4,
        "customer_id": 3,
        "date": "2022-01-01",
        "amount": 500
        },
        {
        "id": 5,
        
        "customer_id": 2,
        "date": "2022-01-02",
        "amount": 1300
        },
        {
        "id": 6,
        "customer_id": 4,
        "date": "2022-01-01",
        "amount": 750
        },
        {
        "id": 7,
        "customer_id": 3,
        "date": "2022-01-02",
        "amount": 1250
        },
        {
        "id": 8,
        "customer_id": 5,
        "date": "2022-01-01",
        "amount": 2500
        },
        {
        "id": 9,
        "customer_id": 5,
        "date": "2022-01-01",
        "amount": 300
        },
        {
        "id": 10,
        "customer_id": 5,
        "date": "2022-01-02",
        "amount": 875
        },
        {
        "id": 11,
        "customer_id": 4,
        "date": "2022-01-02",
        "amount": 1700
        },
        {
        "id": 12,
        "customer_id": 6,
        "date": "2022-01-01",
        "amount": 600
        },
        {
        "id": 13,
        "customer_id": 6,
        "date": "2022-01-02",
        "amount": 1400
        },
        {
        "id": 14,
        "customer_id": 7,
        "date": "2022-01-02",
        "amount": 900
        },
        {
        "id": 15,
        "customer_id": 8,
        "date": "2022-01-01",
        "amount": 300
        },
        {
        "id": 16,
        "customer_id": 8,
        "date": "2022-01-02",
        "amount": 920
        },
    ]
}

export let dates=new Set();
for (let i = 0; i < data.transactions.length; i++) {
    dates.add(data.transactions[i].date);
}
dates=Array.from(dates);


export let totalAmount = dates.map(date => {
    const totalAmountPerDate = data.transactions
      .filter(transaction => transaction.date === date)
      .reduce((total, transaction) => total + transaction.amount, 0);
    return totalAmountPerDate;
});

