import express from 'express';

const app = express();

const port = 3618;

app.get('/', (req, res) => {
  res.json({ 
    code: 200,
    message: 'Hello World!' ,
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`服务地址: http://localhost:${port}`);
});
