
const express = require('express')

const router = express.Router()
const homeController = require('../controller/homeController')

//School Login page
router.get('/login',homeController.login)

//school login
router.post('/login', homeController.loginProcess)

// School Dashboard
router.get('/school_dashboard', homeController.schoolDashbaord)

//School Logout
router.get("/logout",homeController.logout)

//Staff Login page
router.get('/staff_login',homeController.stafflogin)

//staff login
router.post('/staff_login',homeController.staff)

//Staff Logout
router.get("/staff_logout",homeController.stafflogout)

//Staff Dashboard
router.get('/staff_dashboard',homeController.staffdashboard)

//Add Staff
router.get('/addstaff',homeController.staffa)
 
router.post('/addstaff',homeController.addStaff)

//Add Student
router.get('/addstudent',homeController.student)
 
router.post('/addstudent',homeController.addStudent);

//Add Result
router.get('/addresult/:id',homeController.result)

router.post('/addresult/:id',homeController.addResult)

//View Staff
router.get('/viewstaff',homeController.viewStaff)

//Staff Update
router.get('/update/:id',homeController.staffU)

router.post('/update/:id',homeController.updateStaff)

//View Student
router.get('/viewstudent',homeController.viewStudent)

// Update student
router.get('/update2/:id',homeController.studentU)

router.post('/update2/:id',homeController.studentUpdate)

//manage result staff side
router.get('/manageresult',homeController.manageResult)

//view result
router.get('/viewresult',homeController.viewResult)

//update result
router.get('/update1/:id',homeController.updateRe)

router.post('/update1/:id',homeController.updateResult)

//Student Side
router.get('/student',homeController.studentad)

router.post('/student',homeController.studentadd);

//view student std and div 
router.get('/viewstudentstddiv',homeController.viewStudentStdDiv)

router.post('/viewstudentstddiv',homeController.viewStudentStdDiv2)

//Add std
router.get('/addstd',homeController.std)
router.post('/addstd',homeController.addStd);

//Add div
router.get('/adddiv',homeController.div)
router.post('/adddiv',homeController.addDiv);

module.exports = router