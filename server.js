const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintence.hbs', {
//     waitingMessage: 'We are currently undergoing maintence'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('index.hbs', {
    title: 'Home Page',
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the home page of my website'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About Page',
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Error'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    projectsMessage: 'Hello and welcome to the projects page'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
