var express = require('express');
var bodyparser = require('body-parser')
var mysql = require('mysql');
 
var app = express()
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended : false}))

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"to-do-list"
}) 

con.connect();

var user_name="";
var admin_name="";

app.get('/',function(req,res){
    res.render("login");
})

app.post('/',function(req,res){
    var log_email = req.body.email;
    var log_password = req.body.password;
    
    if(log_email && log_password){

        var query = "select * from admin where email='"+log_email+"' AND password='"+log_password+"'";
        con.query(query,function(error,result){
            if(error) throw error;

            if(result.length>0){
                admin_name = result[0].name;
                res.redirect("dashboard");
            }
            else{
                res.redirect('/');
            }
        })
    }
    else{
        res.send("PLzz Enter Valid Email And Password..!");
    }
})

app.get('/dashboard', function (req, res){
    if(admin_name == "")
    {
        res.redirect('/')
    }
    else{
        res.render("dashboard", { admin_name })
    }
})

app.get("/logout",function(req,res){
    admin_name="";
    res.redirect("/");
})

app.get('/user_login',function(req,res){
    res.render("user_login");
})

app.post('/user_login',function(req,res){
     
    var email= req.body.email;
    var password = req.body.password;

    var login_query= "select * from user where email='"+email+"' and password='"+password+"'"


    con.query(login_query,function(error,result,field){
        if(error) throw error;
        user_name = result[0].name;
        if(result.length==1){
            user_id=1;
            res.redirect('/user_dashboard');
        }
        else
        {
            res.redirect('/user_login');
        }
    })
})

app.get('/adduser',function(req,res){
    var query = "select * from user";
    con.query(query,function(error,result,index){
        if(error) throw error
        res.render("add_user",{result});
    })
})

app.post('/adduser',function(req,res){
    
    var name =req.body.name;
    var email=req.body.email;
    var password = req.body.password;

    var insert=" insert into user (name,email,password) values ('"+name+"','"+email+"','"+password+"')"

    console.log(insert);

    con.query(insert,function(error,result,field){
        if(error) throw error;
        res.redirect('/adduser');
    })
})

app.get('/index',function(req,res){
    var query = "select * from user";
    con.query(query,function(error,result,index){
        if(error) throw error
        res.render("index",{result});
    })
})

app.post('/index',function(req,res){
    
    var name =req.body.name;
    var email=req.body.email;
    var password = req.body.password;

    var insert=" insert into user (name,email,password) values ('"+name+"','"+email+"','"+password+"')"

    con.query(insert,function(error,result,field){
        if(error) throw error;
        res.redirect('/index');
    })
})


app.get('/update/:id',function(req,res){

    var id = req.params.id;

   var update = "select * from user where id='"+id+"'"

   con.query(update,function(error,result,field){

        if(error) throw error;
        res.render('update',{result});
   })
})

app.post('/update/:id',function(req,res){

    var id = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

   var update = "update user set name ='"+name+"', email = '"+email+"', password = '"+password+"' where id='"+id+"'";

   con.query(update,function(error,result,field){

        if(error) throw error;
        res.redirect('/adduser');
   })
})

app.get('/addtask',function(req,res){

    var login_query= "select * from user";

    con.query(login_query,function(error,result,field){
        if(error) throw error;
        res.render("add_task",{result});
    })
})

app.post('/addtask',function(req,res){
    
    var task_name = req.body.task_name;
    var user_name = req.body.user_name;

    var insert="insert into add_task(task_name,task_user,status)values('"+task_name+"','"+user_name+"','Pending')";

    con.query(insert,function(error,result,field){
        if(error) throw error;
        res.redirect('/viewtask');
    })
})

app.get('/viewtask',function(req,res){
    
    var insert = "select * from add_task";

    con.query(insert,function(error,result,field){
        if(error) throw error;
        res.render('view_task',{result});
    })
})

app.get('/user_dashboard',function(req,res){

    var query = "select * from add_task where task_user='"+user_name+"'";

    con.query(query,function(error,result,index){
        if(error) throw error;
        console.log(result);
        if(user_name == ""){
            res.redirect('/user_login')
        }
        else{
            res.render('user_dashboard',{result,user_name})
        }
    }) 
})

app.get("/user_logout",function(req,res){
    user_name="";
    res.redirect("/user_login");
})

app.get('/updatestatus/:role/:id',function(req,res){
    var status = req.params.role;
    var id = req.params.id;
    var query = "update add_task set status='"+status+"' where add_task.id="+id;

    con.query(query,function(error,result,field){
        if(error) throw error;
        res.redirect('/user_dashboard');
    })
})

app.listen(3000);

console.log("Hello..!");










