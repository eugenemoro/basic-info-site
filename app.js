const path = require('path');
const express = require('express');
const app = express();

const options = {
  root: path.join(__dirname, 'public'),
};

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.status(200).sendFile('index.html', options, (err) => {
    console.log(err);
  });
});

app.get('/about', (req, res, next) => {
  res.status(200).sendFile('about.html', options, (err) => {
    console.log(err);
  });
});

app.get('/contact-me', (req, res, next) => {
  res.status(200).sendFile('contact-me.html', options, (err) => {
    console.log(err);
  });
});

app.get('*', (req, res) => {
  res.status(200).sendFile('404.html', options, (err) => console.log(err));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
