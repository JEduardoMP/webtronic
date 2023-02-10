const express = require('express');
const cors = require('cors');
const {todoRouter} = require('./routes');
const {globalErrorHandler} = require('./middelwares');

require('dotenv').config({path: './.env'});

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', (req, res) => {
  res.send('Connected to the app');
  console.log('Connected');
});
app.use('/api/v1', todoRouter);

app.use(globalErrorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is runing in port ${PORT}`);
});

module.exports = {app};
