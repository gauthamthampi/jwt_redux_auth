import express from "express"
const router = express.Router();
import { postSignup,postLogin, getEditUserProf,editProfile} from "../controller/usersCntrl.js";
import {getUserData,adduser, getEditUser,putEditUser, deleteUser , deleteEmail} from "../controller/adminCntrl.js"; 


 
router.post("/signup",postSignup)
router.post("/login" ,postLogin)
router.get("/adminhome",getUserData)
router.post("/adduser",adduser)
router.get("/edituser/:email",getEditUser)
router.put("/edituser/:email",putEditUser)
router.get("/deleteuser/:email",deleteUser)


router.get("/profile/:email",getEditUserProf)
router.put("/profileedit/:email",editProfile)

router.get("/deleteemail/:email",deleteEmail)






export default router; 