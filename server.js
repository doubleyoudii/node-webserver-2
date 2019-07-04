const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


const port = process.env.PORT || 3000;
const app = express();    //express as a function

hbs.registerPartials(__dirname + '/views/partials');      
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  console.log('Middle ware successfully connect');
  const now = new Date().toString();
  const log = `Log: ${now} >> ${req.method} >> ${req.url}`;
  console.log(log);

  fs.appendFileSync('serverLog', log + '\n');
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {});
// })
//````````````````home``````````````````````````
app.get('/', (req, res) => {
  res.render('root.hbs', {
    user: "William",
    year: new Date().getFullYear()
  });
});

app.use(express.static(__dirname + '/public'))

app.get('/bad', (req, res) => {
  res.send(
    {
      errorMessage: "Page not Found",
      code: 404
    }
  );
})

app.listen(port, () => {
  console.log(`Connected to server port ${port}`)
});
