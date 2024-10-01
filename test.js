// CRUD operation with MongoDB

const mongoose = require('mongoose')

const BlogPost = require('./models/blogapp')

// Async fuction to establish database connection
const createBlogPost = async () => {
    try {
        await mongoose.connect('mongodb://localhost/my_app_database')
        console.log('Connection established')

        // create the blogpost
        const newBlogPost = await BlogPost.create({
            title: 'The Mythbuster’s Guide to Saving Money on Energy Bills',
            body:  'If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. You know those bullet-point lists. You start spotting them everything at this time of year.They go like'
        })
        console.log(newBlogPost)
        
    } catch (error) {
        console.log('Error:', error)
    }
}

createBlogPost()

// function to read document
const findBlogPost = async () => {
    try {
        const newBlogPost = await BlogPost.find({})
        console.log(newBlogPost)
    } catch (error) {
        console.log('Error:', error)
    }
}

findBlogPost()


// function to find by id
var id = '66ea9469c8ff3fd6d84c74a8'
const findById = async () => {
    try {
        const newBlogPost = await BlogPost.findById(id)
        console.log(newBlogPost)
    } catch (error) {
        console.log('Error:', error)
    }
}

findById()


//Function to update document
var id = '66ea9469c8ff3fd6d84c74a8'
const updateBlogPost = async () => {
    try {
        const newBlogPost = await BlogPost.findByIdAndUpdate(id,
            {title:'Update title'})
        console.log(newBlogPost)
    } catch (error) {
        console.log('Error:', error)
    }
}

// Function to delete document
var id = '66ea9bfb8a275b86935d3b91'
const deleteBlogPost = async () => {
    try {
        const newBlogPost = BlogPost.findByIdAndDelete(id)
        console.log(newBlogPost)
    } catch (error) {
        console.log('Error:', error)
    }
}

