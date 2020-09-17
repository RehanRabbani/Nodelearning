const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const app = express()

const dbUri = 'mongodb+srv://rehan:humtum123@node-rest-shop.299ce.mongodb.net/node?retryWrites=true&w=majority';
mongoose.connect(dbUri, { useNewUrlParser: true,useUnifiedTopology: true })
 .then( (result) => app.listen(3000))
 .catch( (error) => console.log(error));

app.get('/about-blog', (req , res) => {
    const blog = new Blog({
        title:'new Blog 2',
        snippet:'about my new blog',
        body:'more about blog'
    });
    
    blog.save().then( (result) => {
      res.send(result);
    }).catch((error) => console.log(error))
}) 

app.get('/all-blog', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        console.log(error);
    })
})

app.get('/single-blog' ,(req, res) => {
    Blog.findById('5f637372c060289838de3bbf')
    .then((result) =>{
        res.send(result);
    })
    .catch((error) => {
        console.log(error);
    })
})

app.get('/', function (req, res) {
  res.sendFile('./views/index.html', { root : __dirname});
});

app.get('/about',function (req,res) {
    res.sendFile('./views/about.html' , {root: __dirname});
});
app.get('/aboutus', (req, res) => {
    console.log("aboutus");
        res.redirect('/about');
})
app.use((req,res)=>{
    res.sendFile('./views/404.html', {root: __dirname});
});



