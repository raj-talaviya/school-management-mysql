
module.exports = {
    index: function (req, res) {
        const log_email = req.body.email;
        const log_password = req.body.password;

        if (log_email && log_password) {
            const query = "select * from school where email='" + log_email + "' AND password='" + log_password + "'";
            con.query(query, function (error, result) {
                if (error) throw error;

                if (result.length > 0) {
                    admin_name = result[0].name;
                    res.redirect("/school_dashboard");
                }
                else {
                    res.redirect('/');
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
            res.redirect('/')
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
    },

    stafflogout : function(req,res){
        staff_name="";
        res.redirect("/staff_login");
    },

    staffdashboard : function (req, res){
        if(staff_name == "")
        {
            res.redirect('/staff_login')
        }
        else{
            res.render("staff_dashboard", { staff_name})
        }
    },
}