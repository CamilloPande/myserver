// Import Express module

var express = require('express');
const cors = require('cors')

const port = process.env.PORT || 7000;

// The server use json, urlencoded, and the public directory (pages, css, script)

var app = express();
var bodyParser = require("body-parser")

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// CRUD operations

app.post('/personne/add', (req,res) => {
    con.query(`INSERT INTO personne(nom,prenom) values('${req.body.name}', '${req.body.age}')`);
    console.log("La personne a été ajouté");
});

app.delete('/personne/delete/:id',(req,res) => {
    let id = req.params.id;
    con.query(`DELETE FROM personne WHERE id = ${id}`);
    console.log("La personne a été supprimé");
})

app.put('/personne/update/:id',(req,res) => {
    let id = req.params.id;
    con.query(`UPDATE personne set nom = '${req.body.name}', prenom = '${req.body.age}' WHERE id = ${id}`);
    console.log("La personne a été modifié");
})

app.get('/personne/read/:id', (req,res)=>{
    let id = req.params.id;
    console.log("Lecture de la personne...")
    con.query(`SELECT * FROM personne WHERE id = ${id}`, function(err,result){
        if (err) throw err;
        res.json(result); 
    }) 
});

app.get('/personne/read', (req,res)=>{
        console.log("Lecture des personnes...")
        con.query(`SELECT * FROM personne`, function(err,result){
            if (err) throw err;
            res.json(result); 
        }) 
});


// The server Listen to the port 7000

app.listen(port,()=>{
    console.log("Server has started on port : 7000")
});

// Connect to the database

var mysql = require("mysql");

var con = mysql.createConnection({
    host : "sql5.freesqldatabase.com",
    database : "sql5673838",
    user : "sql5673838",
    password : "J9xJVvIycM",
    port: "3306"
})

con.connect(function(err){
    if(err) throw err;
    console.log("Connected to the database")
    })


