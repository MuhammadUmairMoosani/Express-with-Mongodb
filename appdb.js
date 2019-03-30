const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

mongoose.connect("paste your database link here",{ useNewUrlParser: true})
.then(console.log('Mongo Is Connected'))
.catch(err => console.log(err));

require('./models/students');
const Student = mongoose.model('students');
app.post('/student',(req,res) => {
    const newStudent = {
        id:req.body.id,
        name:req.body.name
    }
    new Student(newStudent)
    .save()
    .then(s=>{
        res.send("student is added");
    })
    .catch(err=> console.log(err));
})

app.get('/',(req,res) => {
    Student.find({})
    .then(s=>{
        res.send(s);
    })
    .catch(() => {console.log(err)});
})

app.put('/student/:id',(req,res) => {
    Student.findOne({id:req.params.id})
    .then(s=>{
        s.name = req.body.name;
        s.save()
        .then(() => {console.log('Data Updated')})
        .catch(() =>{console.log(err)});
    })
    .catch(() => console.log(err))
})

app.delete('/student/:id',(req,res) => {
    Student.remove({id:req.params.id})
    .then(() => {
        res.send('Data Deleted');
    })
    .catch(() => {console.log(err)});
})
app.listen('3000',()=> {console.log('Server Running')})
