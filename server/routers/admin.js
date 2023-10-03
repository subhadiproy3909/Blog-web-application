// BUILDIN MOUDLES.

const express = require('express');
const router = express.Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { render } = require('ejs');


// LOCAL MODULES.
const blogModel = require('../dbconn/schema_and_model');
const user = require('../dbconn/user');
const note = require('../dbconn/notes');
const loginLayout = '../views/layouts/login_signup';
const adminLayout = '../views/layouts/admin';
const newAndEditLayout = '../views/layouts/admin_editAndNew_page';

const jwtSecret = process.env.JWTSECRET;


/*
* GET /
* ADMIN - CHECK LOGIN.
*/
const authMiddleware = (req, res, next) =>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"});
    }
}




router.get('/admin', async (req, res) => {
    try {
        const locals = {
            title: "Admin"
        }

        res.render('admin/signup_signin', { locals, layout: loginLayout })
    }
    catch (err) {
        console.log(err)
    }
});

router.post('/admin/Dashboard', async (req, res) => {
    const locals = {
        title: "Admin | Dashboard"
    }

    try {
        
            const {log_email, log_password} = req.body;
        
            const User = await user.findOne({username:log_email});
            if(!User){
                return res.status(401).json({message: "Invalid credentials"});
            }
        
            const isPasswordValid = await bcrypt.compare(log_password, User.password);
            if(!isPasswordValid){
                // return res.status(401).json( {message: "Invalid credentials"});
                res.redirect('/admin')
            }
        
            const token = jwt.sign({userId: User._id}, jwtSecret);
            res.cookie('token', token, {httpOnly: true});

            res.redirect('/admin/Dashboard/Blogs');
        
    } catch (error) {
        
    }
})


router.post('/signup', async (req, res) => {
    const locals = {
        title: "Admin"
    }

    try {
        const {email, password, cpassword} = req.body;
        
        const uQuery = await user.findOne(
            {username: email}, {username: 1, _id: 0}
        )

        
        if(uQuery == null){
            if(password === cpassword){
                try {
                    const hasedPassword = await bcrypt.hash(password, 10);
                    const data = new user(
                        {username: email, password: hasedPassword}
                    )

                    if(await data.save()){
                        console.log("Registered");
                        res.redirect('/admin');
                    }
                    else{
                        console.log("something went wrong");
                    }

                } catch (error) {
                    console.log("insertError:", error);
                }
            }
            else{
                console.log('not matching');
            }
        }
        else{
            console.log("present");
        }
        
    } catch (error) {
        console.log("signupError:", error);
    }

})

router.get('/admin/Dashboard/Blogs', authMiddleware, async (req, res) => {
    const locals = {
        title: "Admin | Dashboard"
    }
    try {

        const findData = await blogModel.find({});

        res.render('admin/blogs', { locals, findData, layout: adminLayout })
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/admin/Dashboard/Notes', authMiddleware, async (req, res) => {
    const locals = {
        title: "Admin | Dashboard | Notes"
    }
    try {
        const findData = await note.find({});
        res.render('admin/notes', { locals, findData, layout: adminLayout })
    }
    catch (error) {

    }
})


/*
* GET /
* ADMIN - NEW BLOG PAGE.
*/
router.get('/admin/Dashboard/Blogs/createBlog', async (req, res) => {
    try {
        const locals = {
            title: "Admin | Dashboard | Blogs | Add Blog"
        }

        res.render('admin/NewAndEdit_blog', { locals, layout: newAndEditLayout });
    }
    catch (error) {
        console.log(error);
    }
})




/*
* POST /
* ADMIN - SAVE NEW BLOG.
*/
router.post('/admin/Dashboard/Blogs/createBlog', async (req, res) => {
    try {

        // console.log(req.body);

        const reqBody = {
            title: req.body.title,
            body: req.body.body
        }

        await blogModel.create(reqBody);
        res.redirect('/admin/Dashboard/Blogs/createBlog');
    }
    catch (error) {
        console.log(error);
    }
})



/*
* PUT /
* ADMIN - UPDATE BLOG.
*/
router.put('/admin/Dashboard/Blogs', async (req, res) => {
    try {
        // console.log(req.body);


        const data = await blogModel.updateOne(
            { _id: req.body.id }, { $set: { title: req.body.title, body: req.body.content, updatedAt: Date.now() } }
        )

        if (data) {
            console.log(data);
            res.redirect('/admin/Dashboard/Blogs')
        }
    } catch (error) {
        console.log(error);
    }
})




/*
* GET /
* ADMIN - NEW NOTE PAGE.
*/
router.get('/admin/Dashboard/Notes/createNote', async (req, res) => {
    try {
        const locals = {
            title: "Admin | Dashboard | Notes | Add Note"
        }

        res.render('admin/NewAndEdit_note', { locals, layout: newAndEditLayout });
    }
    catch (error) {
        console.log(error);
    }
})




/*
* POST /
* ADMIN - SAVE NEW NOTE.
*/
const upload = multer({
    storage:multer.diskStorage({
        destination:function(req, file, cb){
            cb(null, "uploads");
        },
        filename:function(req, file, cb){
            const ext = file.originalname.split('.')[1];
            const filename = file.originalname.split('.')[0];
            cb(null, `${filename}.${ext}`);
        }
    })
}).single("note_file");

// const upload = multer({ dest: 'uploads' }, )
router.post('/admin/Dashboard/Notes/createNote', upload, async (req, res) => {
    
    try {
        const uploadData = new note({
            title: req.body.title,
            note_file: req.file.originalname.split('.')[0]
        })
        
        await uploadData.save();
        // res.send(req.file);
        res.redirect('/admin/Dashboard/Notes/createNote');
        
    } catch (error) {
        console.log(error);
    }

})




module.exports = router;