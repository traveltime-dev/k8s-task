import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());


app.use('*', (req, res, next) => {
  console.log('Base URL');
  console.log(req.baseUrl);
  console.log('\nBody');
  console.log(req.body);
  console.log('\n');
  next();
});

app.get('/api/is-alive', (req, res) => {
  res.send(`Server is running. Last check - ${new Date().toLocaleString()}`)
});

app.post('/api/calculate', (req, res) => {
  const { items }: { items: Array<{name: string, cost: number}>} = req.body;
  if (items) {
    const total = items.reduce(
      (acc, curr) => ({ ...acc, cost: curr.cost + acc.cost}),
      { name: 'total', cost: 0 },
    );

    const randomDiscount = new Date().getSeconds();

    res.send({
      total: total.cost,
      discount: randomDiscount,
      finalCost: (total.cost * (100 - randomDiscount) / 100).toFixed(2),
    })
  } else res.status(400).send('Badly formated request');
});

app.listen(8080, () => {
  console.log('Example app listening at http://localhost:8080');
});
