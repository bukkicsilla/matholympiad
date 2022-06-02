const path = require('path');

const express = require('express');

const blogRoutes = require('./routes/mo');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public')); 

app.use(blogRoutes);

app.use(function (error, req, res, next) {
  console.log(error);
  res.status(500).render('fivehundred');
});

app.listen(3000);
