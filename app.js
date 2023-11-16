const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to DB
const dbURI = 'mongodb+srv://amiladealwis:ygda2011@chemicalclassification.7agcv71.mongodb.net/chemicals?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then(result => app.listen(3000))
    .catch(err => console.log(err))

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/blogs', blogRoutes);

// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});
app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});
app.use((req, res) => {
    res.status(404).render('404', { title: 'Not Available' });
});