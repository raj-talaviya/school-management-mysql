
const express = require('express')

const router = express.Router()
const homeController = require('../controller/homeController')

router.post('/', homeController.index)



var staff_name="";
var admin_name="";

// School Dashboard
router.get('/school_dashboard', homeController.schoolDashbaord)

//School Logout
router.get("/logout",function(req,res){
    admin_name="";
    res.redirect("/");
})

//Staff Login
router.get('/staff_login',function(req,res){
    res.render("staff_login");
})

router.post('/staff_login',function(req,res){
     
    var email= req.body.email;
    var password = req.body.password;

    if(email && password){
        var login_query= "select * from staff where email='"+email+"' and password='"+password+"'"
        con.query(login_query,function(error,result,field){
            if(error) throw error;

            if(result.length>0){
                staff_name = result[0].name;
                res.redirect('/staff_dashboard');
            }
            else
            {
                res.redirect('/staff_login');
            }    
        })
    }
    else{
        res.send("Plzz Enter Valid Email And Password..!");
    }    
})

//Staff Logout
router.get("/staff_logout",function(req,res){
    staff_name="";
    res.redirect("/staff_login");
})

//Staff Dashboard
router.get('/staff_dashboard', function (req, res){
    if(staff_name == "")
    {
        res.redirect('/staff_login')
    }
    else{
        res.render("staff_dashboard", { staff_name})
    }
})

//Add Staff
router.get('/addstaff',function(req,res){
    res.render("add_staff");
})
 
router.post('/addstaff',function(req,res){
    
    var name =req.body.name;
    var email=req.body.email;
    var password = req.body.password;

    var insert=" insert into staff (name,email,password) values ('"+name+"','"+email+"','"+password+"')"

    console.log(insert);

    con.query(insert,function(error,result,field){
        if(error) throw error;
        res.redirect('/addstaff');
    })
})

//Add Student
router.get('/addstudent',function(req,res){
    var query = "SELECT standard.std AS std, division.division FROM standard LEFT JOIN division ON standard.id = division.id;";
    con.query(query,function(error,result,index){
        if(error) throw error
        res.render("add_student",{result});
    })
})
 
router.post('/addstudent',function(req,res){
    
    var name = req.body.name;
    var std = req.body.std;
    var div = req.body.div;
    var roll_no = req.body.roll_no;

    var insert=" insert into student(name,std,division,roll_no) values ('"+name+"','"+std+"','"+div+"','"+roll_no+"')"

    console.log(insert);

    con.query(insert,function(error,result,field){
        if(error) throw error;
        res.redirect('/addstudent');
    })
});

//Add Result
router.get('/addresult/:id',function(req,res){
    var id=req.params.id;
    var query="select * from student where id="+id;
    con.query(query,function(error,result,index){
        if(error) throw error
        res.render("student_result",{result});
    })
})

router.post('/addresult/:id',function(req,res){
    
    var name = req.body.name;
    var std = req.body.std;
    var div = req.body.div;
    var roll_no = req.body.roll_no;    
    var sub1 = parseInt(req.body.sub1);
    var sub2 = parseInt(req.body.sub2);
    var sub3 = parseInt(req.body.sub3);
    var sub4 = parseInt(req.body.sub4);
    var sub5 = parseInt(req.body.sub5);
    var total = parseInt(sub1+sub2+sub3+sub4+sub5);
    var average = total/5;
    
    if(sub1>35 && sub2>35 && sub3>35 && sub4>35 && sub5>35){
        result="Pass"
    }
    else{
        result="Fail"
    }

    var query = "insert into student_result(name,std,division,roll_no,sub1,sub2,sub3,sub4,sub5,total,average,result)values('"+name+"','"+std+"','"+div+"','"+roll_no+"','"+sub1+"','"+sub2+"','"+sub3+"','"+sub4+"','"+sub5+"','"+total+"','"+average+"','"+result+"')"

    con.query(query,function(error,result,index){
        if(error) throw error;
        res.redirect('/viewstudent');
    })
})

//View Staff
router.get('/viewstaff',function(req,res){
    var query = "select * from staff";
    con.query(query,function(error,result,index){
        if(error) throw error
        res.render("view_staff",{result});
    })
})

//Staff Update
router.get('/update/:id',function(req,res){

    var id = req.params.id;

   var update = "select * from staff where id='"+id+"'"

   con.query(update,function(error,result,field){

        if(error) throw error;
        res.render('update_staff',{result});
   })
})

router.post('/update/:id',function(req,res){

    var id = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

   var update = "update staff set name ='"+name+"', email = '"+email+"', password = '"+password+"' where id='"+id+"'";

   con.query(update,function(error,result,field){

        if(error) throw error;
        res.redirect('/addstaff');
   })
})

//View Student
router.get('/viewstudent',function(req,res){
    var query = "select * from student ORDER BY NAME";
    con.query(query,function(error,result,index){
        if(error) throw error
        res.render("view_student",{result});
    })
})

// Update student
router.get('/update2/:id',function(req,res){

    var id = req.params.id;

   var update = "select * from student where id='"+id+"'";

   con.query(update,function(error,result,field){

        if(error) throw error;
        res.render('update_student',{result});
   })
})

router.post('/update2/:id',function(req,res){

    var id = req.params.id;
    var name = req.body.name;
    var std = req.body.std;
    var div = req.body.div;
    var roll_no = req.body.roll_no;

   var update = "update student set name ='"+name+"', std = '"+std+"', division = '"+div+"', roll_no='"+roll_no+"' where id='"+id+"'";

   con.query(update,function(error,result,field){

        if(error) throw error;
        res.redirect('/viewstudent');
   })
})

//manage result staff side
router.get('/manageresult',function(req,res){
    var query = "select * from student_result";
    con.query(query,function(error,result,index){
        if(error) throw error
        res.render("manage_sr",{result});
    })
})

//view result
router.get('/viewresult',function(req,res){
    var query = "select * from student_result";
    con.query(query,function(error,result,index){
        if(error) throw error
        res.render("manage_sr",{result});
    })
})

//update result
router.get('/update1/:id',function(req,res){
    var id=req.params.id;

    var query="select * from student_result where id="+id;
    con.query(query,function(error,result,index){
        if(error) throw error
        res.render("sr_update",{result});
    })
})

router.post('/update1/:id',function(req,res){
    var id = req.params.id;
    var name = req.body.name;
    var std = req.body.std;
    var div = req.body.div;
    var roll_no = req.body.roll_no;    
    var sub1 = parseInt(req.body.sub1);
    var sub2 = parseInt(req.body.sub2);
    var sub3 = parseInt(req.body.sub3);
    var sub4 = parseInt(req.body.sub4);
    var sub5 = parseInt(req.body.sub5);
    var total = parseInt(sub1+sub2+sub3+sub4+sub5);
    var average = total/5;
    
    if(sub1>35 && sub2>35 && sub3>35 && sub4>35 && sub5>35){
        result="Pass"
    }
    else{
        result="Fail"
    }

    var query = "update student_result set name='"+name+"',std='"+std+"',division='"+div+"',roll_no='"+roll_no+"',sub1='"+sub1+"',sub2='"+sub2+"',sub3='"+sub3+"',sub4='"+sub4+"',sub5='"+sub5+"',total='"+total+"',average='"+average+"',result='"+result+"' where id='"+id+"'";

    con.query(query,function(error,result,index){
        if(error) throw error;
        res.redirect('/viewresult');
    })
})

//Student Side
router.get('/student',function(req,res){
    var query = "SELECT standard.std AS std, division.division AS division FROM standard LEFT JOIN division ON standard.id = division.id;";
    con.query(query,function(error,result,index){
        if(error) throw error
            res.render("student",{result});
            console.log(result)
        })
    })

router.post('/student',function(req,res){
    
    var name = req.body.name;
    var std = req.body.std;
    var div = req.body.div;
    var roll_no = req.body.roll_no;

    var insert=" insert into student(name,std,division,roll_no) values ('"+name+"','"+std+"','"+div+"','"+roll_no+"')";
    con.query(insert,function(error,result,field){
        if(error) throw error;
        res.redirect('/student');
    })
});

//view student std and div 
router.get('/viewstudentstddiv',function(req,res){
    var query="SELECT standard.std AS std, division.division FROM standard LEFT JOIN division ON standard.id = division.id;"
    // var query="select * from student"
    con.query(query,function(error,result,index){    
        if(error) throw error
        res.render('view_student_std_div',{result})
    })
})

router.post('/viewstudentstddiv',function(req,res){
    var std = req.body.std;
    var div = req.body.div;

    var qr="select * from student where std ='"+std+"' and division='"+div+"'"
    con.query(qr,function(error,result,index){
        if(error) throw error
        res.render('view_student_std_div2',{result})
        console.log(qr)
    })
})

//Add std
router.get('/addstd',function(req,res){
    res.render("add_std");
})
router.post('/addstd',function(req,res){
    
    var std = req.body.std;

    var insert=" insert into standard(std) values ('"+std+"')";

    con.query(insert,function(error,result,field){
        if(error) throw error;
        res.redirect('/addstd');
    })
});

//Add div
router.get('/adddiv',function(req,res){
    res.render("add_div");
})
router.post('/adddiv',function(req,res){
    
    var div = req.body.div;

    var insert=" insert into division(division) values ('"+div+"')";

    con.query(insert,function(error,result,field){
        if(error) throw error;
        res.redirect('/adddiv');
    })
});




module.exports = router