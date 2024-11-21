import { comparePassword, hashpassword } from "../helpers/userHelper.js";
import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken'



export const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(200).send({
                success: false,
                message: "Please add all fields"
            })
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "User already exists"
            })
        }

        const hashedPassword = await hashpassword(password)
        
        const user = await new userModel({ name, email, password: hashedPassword }).save();
        res.status(201).send({
            success: true,
            message: "New User created",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something Went Wrong",
            error
        });
    }
}

export const userlogin = async (req, res) => {
    try {
     const {email, password} = req.body;
if(!email || !password){
    return res.status(200).send({
        success: false,
        message: "Please add all fields"
    })
}

// const not existingemail 
const user = await userModel.findOne({email})
if(!user){
    return res.status(200).send({
        success: false,
        message: "User does not exist"
    })
}

const match = await comparePassword(password, user.password)
if(!match){
    return res.status(200).send({
        success: false,
        message: "Invalid Password"
    })
}


    //   token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET,{
        expiresIn: "7d",
    });
    res.status(200).send({
        success:true,
        message:"User Logged In Successfully",
        user:{
            name:user.name,
            email:user.email,
             password:user.password,
             role: user.role,
             _id: user._id,
            },
         token,
    });


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something Went Wrong",
            error
        })
    }
}


export const addUser = async(req,res)=>{
try {
    const {name,email,password}= req.body
    if(!name || !email || !password){
        return res.status(200).send({
            success: false,
            message:"Please add all fields"
        })
    }
    const adduser  = await new userModel({name, email, password}).save()
    if(adduser){
        res.status(200).send({
            success:true,
            message:`New User Created`,
            adduser
        })
    }
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Something went wrong", 
        error
    })
}
}

export const allUsers = async(req,res)=>{
try {
    const allusers  = await userModel.find({})
    if(allusers){
        res.status(200).send({
            success:true,
            message:`Total no of users is ${allusers.length}`,
            allusers
        })
    }
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Something went wrong", 
        error
    })
}
}


export const updateUser = async (req, res) => {
    try {
      const { id } = req.params; // User ID from request parameters
      const {name, email, role} = req.body; // Data to update from request body
  
      const updatedUser = await userModel.findByIdAndUpdate(id, {name,email,role}, { new: true });
  
  
      res.status(200).send({
        success: true,
        message: "User updated successfully",
        updatedUser,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Failed to update user",
        error,
      });
    }
  };

  
  export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params; // User ID from request parameters
  
      const deletedUser = await userModel.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }
  
      res.status(200).send({
        success: true,
        message: "User deleted successfully",
        deletedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Failed to delete user",
        error,
      });
    }
  };



  export const getuserTask = async (req,res)=>{
    try {
        const {userid} = req.headers
        const alltask = await taskModel.find({ assignedTo: { $in: userid }});
                  if(alltask){
            res.status(200).send({
                success: true,
                message:`Total no of tasks is ${alltask.length}`,
                alltask
            })
        }
    } catch (error) {
       res.status(500).send({
        success: false,
        message: "Something went wrong",
        error
       }) 
    }
  };

  export const usertaskStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updateTask = await taskModel.findByIdAndUpdate(id, { status }, { new: true });
  
      if (!updateTask) {
        return res.status(404).send({
          success: false,
          message: "Task not found",
        });
      }
  
      res.status(200).send({
        success: true,
        message: "Task updated successfully",
        updateTask,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };
  