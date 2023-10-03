const express = require('express');
const router = express.Router();

const blogModel = require('../dbconn/schema_and_model');
const notes =  require('../dbconn/notes');
const path = require('path');

router.get('/', (req, res) => {
    const locals = {
        title: "Achieve's Institute | Home"
    }
    res.render('index', { locals });
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

router.get('/notes', async (req, res) =>{
    const locals = {
        title: "Achiever's Institute | Notes"
    }

    try{

        const image = await notes.find(
            {_id: "64dba1ab3c6107506bd7178a"}, {note_file: 1, _id: 0}
        );
        
        let data=0;
        image.forEach((e) =>{
            data = e.note_file;
        })
        console.log(data);
        // console.log(path.join(__dirname, '../uploads/'));
        res.sendFile(path.join(__dirname, '../uploads/MAJOR PROJECT PRESENTATION.pptx'));
        // res.send(path.join(__dirname, '../uploads/')+data+'.jpg');
        // res.render('notes', {locals, data});
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