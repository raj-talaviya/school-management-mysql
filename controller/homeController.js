
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
    }
}