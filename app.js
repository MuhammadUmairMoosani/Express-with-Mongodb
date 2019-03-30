const express = require('express');
const app = express();


app.use(express.json());

var students = [
    {
        id: 01, name: "Faheem"
    },
    {
        id: 02, name: "Ibad"
    },
    {
        id: 03, name: "Zain"
    }
]

app.get('/', (req, res) => {
    res.send(students);
})

app.post('/student/', (req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name
    }
    students.push(student);
    res.send(student);
})

app.put('/student/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    student.name = req.body.name;
    res.send(student);
})

app.delete('/student/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    const index = students.indexOf(student);
    students.splice(index, 1);
    res.send(student);

})

app.listen(3000, () => {
    console.log('Server is Running');
})