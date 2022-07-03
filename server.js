const fs = require('fs');
const path = require('path');
const express = require('express');
const uniqid = require('uniqid');
const PORT = process.env.PORT || 3001;
const app= express();
const notes = require('./db/db');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


function createNewNote(body, noteArray) {
    const note = body;
    
    noteArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(noteArray, null, 2)
    );
    return note;
}

function removeNote(id, noteArray) {
 
    let idIndex= noteArray.findIndex(element => element.id ==id);
    noteArray.splice(idIndex,1);
    
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(noteArray, null, 2)
    );
}

app.post('/api/notes', (req, res) =>{
    req.body.id=uniqid();
    const note = createNewNote(req.body, notes);
    res.json(note);
})

app.delete('/api/notes/:id', (req,res) => {

removeNote(req.params.id, notes);
    res.end('it worked');
    }
   );

app.get('/notes', (req,res) =>{
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('/api/notes', (req,res) => {
 res.json(notes);
})

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})


app.listen(PORT,() =>{
})