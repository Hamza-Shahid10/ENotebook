import { Router } from "express";
import User from "../models/User.js";
const router = Router(); 

// Create a User using: POST "/api/auth/". Doesn't require Auth
router.post('/', (req, res)=>{ 
    console.log(req.body);
    const user = User(req.body);
    user.save()
    res.status(201).json({
        message: "User added succesfully",
        user : req.body});
} )


export default router;
