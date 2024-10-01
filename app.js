const express = require('express')
const PORT = 3000
const path = require('path')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const BlogPost = require('./models/blogapp')
const fileUpload = require('express-fileupload')
const userModel = require('./models/userModel')


const app = new express
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// app.use(fileUpload())

mongoose.connect('mongodb://localhost/my_app_database')

app.set('view engine','ejs')


//register a user
app.get('/auth/register', (req, res) =>{
    res.render('register')
})

app.post('/users/register', async(req, res)=>{
    try {
       const user = await userModel.create(req.body)
       res.redirect('/')
       console.log(user)
       
    } catch (error) {
        console.log(error)
    }
})

// to retrieve page using specific route
app.get('/', async(req, res) =>{
    const post = await BlogPost.find({})
    res.render('index', {
        post
    })
})
app.get('/about', (req, res) =>{
    res.render('about')
})
app.get('/contact', (req, res) =>{
    res.render('contact')
})
app.get('/post/:id', async(req, res) =>{
    try {
        const post = await BlogPost.findById(req.params.id)
        res.render('post',{
            post
        })
    } catch (error) {
        console.log(error)
    }
    
})
app.get('/posts/new', (req, res) =>{
    res.render('create')
})
app.post('/posts/store', fileUpload(), async (req,res)=>{
    // model creates a new doc with browser data
    try {
        let image = req.files.image;
        image.mv(path.resolve(__dirname,'public/assets/img',image.name))
        const post = await BlogPost.create({
            ...req.body, 
            image:'/assets/img/' + image.name
        })
        res.redirect('/')
        console.log(post)

    } catch (error) {
        console.log(error)
    }


})
    


app.listen(PORT, () =>{
    console.log(`server is running on ${PORT}`)
})