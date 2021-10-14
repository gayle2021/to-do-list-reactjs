const express = require("express");
const mysql = require('mysql2');
const app = express();

app.use(express.json());



const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todo"
  });

app.get('/show', function(req, res){
    con.connect(function(err) {
        if (err) throw err;

        con.query(`SELECT * from todo`, 
        function (err, result, fields) {            
          if (err) throw err;
          res.send(result)

        });
    });
});
app.get('/showupcoming', function(req, res){
    con.connect(function(err) {
        if (err) throw err;

        con.query(`SELECT * from todo where status = "Upcoming"`, 
        function (err, result, fields) {            
          if (err) throw err;
          res.send(result)

        });
    });
});
app.get('/showongoing', function(req, res){
    con.connect(function(err) {
        if (err) throw err;

        con.query(`SELECT * from todo where status = "Ongoing"`, 
        function (err, result, fields) {            
          if (err) throw err;
          res.send(result)

        });
    });
});
app.get('/showcompleted', function(req, res){
    con.connect(function(err) {
        if (err) throw err;

        con.query(`SELECT * from todo where status = "Completed"`, 
        function (err, result, fields) {            
          if (err) throw err;
          res.send(result)

        });
    });
});

app.post('/add', (req,res) => {

    const task = req.body.task;
    const status = req.body.status;
    // console.log(status);
    con.connect(function (err) {
        if(err) throw err;
        con.query("insert into todo (`task`,`created_at`,`status`) values (?,now(),?)",[task,status], function (err, result, fields) {            
            if (err) throw err;
            // console.log(result);
            res.send(result); 
          });
    })
}) 

app.post("/updatestatus/:id/:status", (req, res) => {
  const id = req.params.id;
  const status = req.params.status;

  if(status === "Completed"){
    con.connect(function (err) {
      if(err) throw err;
      con.query('update todo set `completed_at`=now(),`status`=  "'+status+'" where `id`=' + id, function (err, result, fields) {            
          if (err) throw err;
          // console.log(result);
          res.send(result); 
        });
  })
  } 
else {
 con.connect(function (err) {
    if(err) throw err;
    con.query('update todo set `status`=  "'+status+'" where `id`=' + id, function (err, result, fields) {            
        if (err) throw err;
        // console.log(result);
        res.send(result); 
      });
})
}
});
app.post("/updatetask/:id", (req, res) => {
  const id = req.params.id;
  const task = req.body.task;
  // console.log(id);
 con.connect(function (err) {
    if(err) throw err;
    con.query('update todo set `task`="'+task+'" where id=' + id, function (err, result, fields) {            
        if (err) throw err;
        res.send(result); 
      });
})
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

 con.connect(function (err) {
    if(err) throw err;
    con.query('DELETE FROM `todo` WHERE id=' + id, function (err, result, fields) {            
        if (err) throw err;
        res.send(result); 
      });
})
});

app.get("/sevendreport",(req,res) => {

  con.connect((err)=> {
    if(err) throw err;
    con.query("SELECT * FROM todo WHERE completed_at > date_sub(now(), interval 1 week) and status = 'Completed'",(err,result,fields)=>{
      if(err) throw err;
      res.send(result);
    })
  })
})

app.post("/getinbetween",(req,res) => {

const start = req.body.start;
const end = req.body.end;
    con.connect((err)=> {
    if(err) throw err;
    con.query("SELECT * FROM `todo` WHERE `completed_at` BETWEEN ? AND ? and `status` = 'Completed'",[start,end],(err,result,fields)=>{
      if(err) throw err;
      res.send(result);
    })
  })
})

app.listen(8080);
console.log("running at 8080")  