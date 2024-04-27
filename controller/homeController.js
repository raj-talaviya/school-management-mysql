const db = require("../db");

let staff_name="";
let admin_name="";

module.exports = {
    login: function(req,res){
        res.render("school_login");
    },

    loginProcess: function(req, res) {
        const log_email = req.body.email;
        const log_password = req.body.password;

        if (log_email && log_password) {
            const query = "select * from school where email='" + log_email + "' AND password='" + log_password + "'";
            db.query(query, function (error, result) {
                if (error) throw error;

                if (result.length > 0) {
                    admin_name = result[0].name;
                    res.redirect("/school_dashboard");
                }
                else {
                    res.redirect('/login');
                }
            })
        }
        else {
            res.send("Plzz Enter Valid Email And Password..!");
        }
    },


    schoolDashbaord:  function (req, res){
        if(admin_name == "")
        {
            res.redirect('/login')
        }
        else{
            res.render("school_dashboard", { admin_name })
        }
    },

    logout: function(req,res){
        admin_name="";
        res.redirect("/");
    },

    stafflogin: function(req,res){
        res.render("staff_login");
    },

    staff: function (req,res){
     
        var email= req.body.email;
        var password = req.body.password;
    
        if(email && password){
            var login_query= "select * from staff where email='"+email+"' and password='"+password+"'"
            db.query(login_query,function(error,result,field){
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
    },

    staffdashboard: function (req, res){
        if(staff_name == "")
        {
            res.redirect('/staff_login')
        }
        else{
            res.render("staff_dashboard", { staff_name})
        }
    },

    stafflogout: function(req,res){
        staff_name="";
        res.redirect("/staff_login");
    },

    staff: function(req,res){
        res.render("add_staff");
    },

    addStaff: function(req,res){
    
        var name =req.body.name;
        var email=req.body.email;
        var password = req.body.password;
    
        var insert=" insert into staff (name,email,password) values ('"+name+"','"+email+"','"+password+"')"
    
        console.log(insert);
    
        db.query(insert,function(error,result,field){
            if(error) throw error;
            res.redirect('/addstaff');
        })
    },

    student: function(req,res){
        var query = "SELECT standard.std AS std, division.division FROM standard LEFT JOIN division ON standard.id = division.id;";
        db.query(query,function(error,result,index){
            if(error) throw error
            res.render("add_student",{result});
        })
    },

    addStudent: function(req,res){
    
        var name = req.body.name;
        var std = req.body.std;
        var div = req.body.div;
        var roll_no = req.body.roll_no;
    
        var insert=" insert into student(name,std,division,roll_no) values ('"+name+"','"+std+"','"+div+"','"+roll_no+"')"
    
        console.log(insert);
    
        db.query(insert,function(error,result,field){
            if(error) throw error;
            res.redirect('/add_student');
        })
    },

    result: function(req,res){
        var id=req.params.id;
        var query="select * from student where id="+id;
        db.query(query,function(error,result,index){
            if(error) throw error
            res.render("student_result",{result});
        })
    },

    addResult: function(req,res){
    
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
    
        db.query(query,function(error,result,index){
            if(error) throw error;
            res.redirect('/viewstudent');
        })
    },

    viewStaff: function(req,res){
        var query = "select * from staff";
        db.query(query,function(error,result,index){
            if(error) throw error
            res.render("view_staff",{result});
        })
    },

    staffU: function(req,res){

        var id = req.params.id;
    
       var update = "select * from staff where id='"+id+"'"
    
       db.query(update,function(error,result,field){
    
            if(error) throw error;
            res.render('update_staff',{result});
       })
    },

    updateStaff: function(req,res){

        var id = req.params.id;
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;
    
       var update = "update staff set name ='"+name+"', email = '"+email+"', password = '"+password+"' where id='"+id+"'";
    
       db.query(update,function(error,result,field){
    
            if(error) throw error;
            res.redirect('/addstaff');
       })
    },

    viewStudent: function(req,res){
        var query = "select * from student ORDER BY NAME";
        db.query(query,function(error,result,index){
            if(error) throw error
            res.render("view_student",{result});
        })
    },

    studentU: function(req,res){

        var id = req.params.id;
    
       var update = "select * from student where id='"+id+"'";
    
       db.query(update,function(error,result,field){
    
            if(error) throw error;
            res.render('update_student',{result});
       })
    },

    studentUpdate: function(req,res){

        var id = req.params.id;
        var name = req.body.name;
        var std = req.body.std;
        var div = req.body.div;
        var roll_no = req.body.roll_no;
    
       var update = "update student set name ='"+name+"', std = '"+std+"', division = '"+div+"', roll_no='"+roll_no+"' where id='"+id+"'";
    
       db.query(update,function(error,result,field){
    
            if(error) throw error;
            res.redirect('/viewstudent');
       })
    },

    manageResult: function(req,res){
        var query = "select * from student_result";
        db.query(query,function(error,result,index){
            if(error) throw error
            res.render("manage_sr",{result});
        })
    },

    viewResult: function(req,res){
        var query = "select * from student_result";
        db.query(query,function(error,result,index){
            if(error) throw error
            res.render("manage_sr",{result});
        })
    },

    updateRe: function(req,res){
        var id=req.params.id;
    
        var query="select * from student_result where id="+id;
        db.query(query,function(error,result,index){
            if(error) throw error
            res.render("sr_update",{result});
        })
    },

    updateResult: function(req,res){
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
    
        db.query(query,function(error,result,index){
            if(error) throw error;
            res.redirect('/viewresult');
        })
    },

    studentad: function(req,res){
        var query = "SELECT standard.std AS std, division.division AS division FROM standard LEFT JOIN division ON standard.id = division.id;";
        db.query(query,function(error,result,index){
            if(error) throw error
                res.render("student",{result});
                console.log(result)
            })
        },
    
    studentadd: function(req,res){
        var name = req.body.name;
        var std = req.body.std;
        var div = req.body.div;
        var roll_no = req.body.roll_no;
    
        var insert=" insert into student(name,std,division,roll_no) values ('"+name+"','"+std+"','"+div+"','"+roll_no+"')";
        db.query(insert,function(error,result,field){
            if(error) throw error;
            res.redirect('/student');
        })
    },

    viewStudentStdDiv: function(req,res){
        var query="SELECT standard.std AS std, division.division FROM standard LEFT JOIN division ON standard.id = division.id;"
        // var query="select * from student"
        db.query(query,function(error,result,index){    
            if(error) throw error
            res.render('view_student_std_div',{result})
        })
    },

    viewStudentStdDiv2: function(req,res){
        var std = req.body.std;
        var div = req.body.div;
    
        var qr="select * from student where std ='"+std+"' and division='"+div+"'"
        db.query(qr,function(error,result,index){
            if(error) throw error
            res.render('view_student_std_div2',{result})
            console.log(qr)
        })
    },

    std: function(req,res){
        res.render("add_std");
    },

    addStd: function(req,res){
    
        var std = req.body.std;
    
        var insert=" insert into standard(std) values ('"+std+"')";
    
        db.query(insert,function(error,result,field){
            if(error) throw error;
            res.redirect('/addstd');
        })
    },

    div: function(req,res){
        res.render("add_div");
    },

    addDiv: function(req,res){
    
        var div = req.body.div;
    
        var insert=" insert into division(division) values ('"+div+"')";
    
        db.query(insert,function(error,result,field){
            if(error) throw error;
            res.redirect('/adddiv');
        })
    },
}