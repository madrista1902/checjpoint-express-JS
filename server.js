const express = require('express');
const app = express();
const port = 2200;

app.set('view engine', 'pug');

app.use((req, res, next) => {
  const currentDay = new Date().getDay();
  const currentHour = new Date().getHours();
  const isWeekend = currentDay === 0 || currentDay === 6;
  const isWorkingHours = currentHour >= 9 && currentHour < 17 && !isWeekend;

  if (!isWorkingHours) {
    return res.send('This web site is only available during working hours (Monday to Friday, from 9 to 17).');
  }

  next();
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home.pug'); 
});

app.get('/services', (req, res) => {
  res.render('services.pug'); 
});

app.get('/contact', (req, res) => {
  res.render('contact.pug'); 
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
