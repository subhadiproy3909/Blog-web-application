const express = require('express');
const router = express.Router();

const blogModel = require('../dbconn/schema_and_model');
const notes =  require('../dbconn/notes');
const path = require('path');

router.get('/', async (req, res) => {
    const locals = {
        title: "Achieve's Institute | Home"
    }

    const blogData = await blogModel.find({}).limit(3);
    const noteData = await notes.find({}).limit(3);

    res.render('index', { locals, blogData, noteData });
})

const findData = async () =>{
    const result = await blogModel.find({});
    return result;
}

router.get('/blog', async (req, res) => {
    const locals = {
        title: "Achiever's Institute | Blogs"
    }

    const data = await findData();
    res.render('blog', { locals, data })
})

router.get('/blog/:title', async (req, res) =>{
    try {
        const locals = {
            title: req.params.title,
        }

        const data = await blogModel.findOne({title: req.params.title});

        // console.log(data);

        res.render('partials/blogDetailsView', {locals,data, layout: false});
    } catch (err) {
        console.error(`blog details error: ${err.message}`);
    }
})

router.get('/notes', async (req, res) =>{
    const locals = {
        title: "Achiever's Institute | Notes"
    }

    try{

        const data = await notes.find({});

        res.render("notes", {locals, data})
    }
    catch(error){
        console.log(error);
    }


})

router.get('/reviews', (req, res) =>{
    res.render('reviews');
})











// function insertData() {
//     const data = blogModel.insertMany([
//         {
//             title: "Building a Blog",
//             body: "This is the body text"
//         },

//         {
//             title: "Discover how to use Express.js",
//             body: "Discover how to use Express.js, a popular Node.js web framework, to build web applications."
//         },
//         {
//             title: "Learn Morgan",
//             body: "Learn Morgan - HTTP Request logger for NodeJS"
//         }
//     ])
// }

// insertData();


module.exports = router;