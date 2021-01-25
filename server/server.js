require('dotenv').config({ path: './.env' });

const express = require("express");
const mongoose = require("mongoose");
const todo = require("./models/todo");
const user = require("./models/user");
const bcrypt = require('bcryptjs');
const session = require('express-session')
const app = express();
const port = 5000;

const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mycluster.3wzbr.mongodb.net/todo-app?retryWrites=true&w=majority`

const MongoStore = require('connect-mongo')(session);

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("MongoDB is connected")
    } catch (error) {
        console.log(error);
    }
};

connectDB();

app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));
app.use(session({
    store: new MongoStore({url: dbUrl}),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

app.post("/api/signup", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        await user.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            todo: [{title: "myTodoString"}]
        });
        res.json({
            message: "User registered"
        })
    } catch (error) {
        res.json({
            message: "That email is already in use!"
        })
    }

    console.log(req.body);
});

app.post("/api/LogOut", async (req, res) => {
    console.log(req.sessionID);
    req.session.destroy()
    res.send("success")
});

app.post("/api/signin", async (req, res) => {
    const lgU = await user.findOne({"email": req.body.email});
    if (lgU) {
        const passwordIsValid = await bcrypt.compare(req.body.password, lgU.password);
        if(passwordIsValid){
            req.session.userID = lgU._id;
            res.send({
                match: true,
                uID: lgU._id
            })
        }if(!passwordIsValid){
            res.send({
                match:false
            })
        }
    } else {
        res.json({
            message: "no such user"
        })
        console.log("No such user!")
    }
});

app.get("/api/home", async (req, res) => {
    const currentUser = await user.findOne({"_id": req.session.userID});
    res.send({
        //uEmail: currentUser.email,
        //userID: currentUser._id
        todo: currentUser.todo
    });
});

app.post("/api/createTodo", async (req, res) =>{
        const newTodo = {title: req.body.title}
        await user.findByIdAndUpdate(req.session.userID,
            {$push: {todo: newTodo}},
            {safe: true, upsert: true});
        res.send("success")
})

app.post("/api/editTodo", async (req, res) =>{
    await user.updateOne(
        {"_id": req.session.userID, "todo._id": req.body._id},
        {"$set": {"todo.$.title": req.body.title}});
    res.send("success");
})

app.post("/api/Delete", async (req, res) => {
    await user.findByIdAndUpdate(req.session.userID,
        {$pull: {todo: {_id: req.body._id}}},
        {safe: true, upsert: true},
    )
    res.send("success")
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});