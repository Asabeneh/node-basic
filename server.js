const express = require('express');
const hbs =require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

const app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

app.use((req,res,next) =>{
    const now = new Date().toLocaleDateString();
    let log = `${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err) => {
        console.log('Unable to append to server.log');
        
    });
    
    next();
});
hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
})

app.use(express.static(__dirname + '/public'));


app.get('/',(req, res) => {
    res.render('home.hbs',{
        pageTitle:'This is the  Home',
        message:'Welcome to Home'
    });

});

app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle:'About Us',
        message:'Read more about our mission'
    })

});
app.get('/contact',(req, res) => {
    res.render('contact.hbs',{pageTitle:'Contact Us',message:'We will provide you the necessary information'});
});

app.use('/maintenance',(req,res) => {
    res.render('maintenance.hbs')
})

app.listen(port,() => {
    console.log(`The server is running on port ${port}`)
})