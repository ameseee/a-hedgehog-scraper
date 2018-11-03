const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const findHedgieImage = require('./scraper.js');

app.use(express.static(path.join(__dirname + '/public')));
app.use(cors);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Hedgehog Celebration';

app.get('/', (request, response) => {
  response.send('Welcome to Hedgehog Celebration!');
});

app.get('/api/v1/hedgie_images/:keyword', (request, response) => {
  var keyword = request.params.keyword;

  async function getHedgies() {
    const hedgieImages =  await findHedgieImage(keyword);
    response.json({ hedgieImages })
  }

  getHedgies()
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
