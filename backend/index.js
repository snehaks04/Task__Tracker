const express=require('express');
const bcrypt= require('bcrypt')
const {Credentials,Taskk}=require('../backend/Models/db')
const jwt=require('jsonwebtoken')
// const cookieParser=require('cookie-parser')
const {secret} = require('./jwt')
const cors=require("cors");
// const { authMiddleware } = require('./middleware');

const app= express()

app.use(cors())
// app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post('/signup',async (req,res)=>{
    

    const {email,password}=  req.body;
 const present=await Credentials.findOne({email})

 if(!email || !password ){
    return res.json({
        error:"Email and Password should not be Empty"
    })
 }


 if(present){ 
     console.log("Reached inside the route")
    return res.json({error:"Already Email Exists"})
 } 
  try{
    const hash=await bcrypt.hash(password,10)
   
     console.log(req.body)
    const b= await Credentials.create({
        email:email,
        password:hash
    })
     console.log(b+""+b._id)
     const userId=b._id
     console.log("userid"+userId)

    res.status(200).json({success:"user created",
       
    })
    } catch(err){
        console.log("Error"+err)
        res.json({error:"Something went wrong"})
    }

})

app.get("/signup",async (req,res)=>{
const r=await Credentials.find(req.body);
res.send(r)
})


app.get('/signin',(req,res)=>{
    res.json(req.body)
})

app.post("/signin",async(req,res)=>{
    const {email,password}=req.body;
   const user= await  Credentials.findOne({email})
   if(!user){
    return res.json(" email already present")
   }
   if(!email || !password ){
    return res.json({
        error:"Email and Password should not be Empty"
    })
 }
   const validPassword=await bcrypt.compare(password, user.password)
   if(validPassword){
//     const token = jwt.sign({
//         userId: user._id
//     }, secret);
//     console.log(token)

//    return res.json({
//         token: token
//     })  
jwt.sign({userId:user._id},secret,(err,token)=>{
    if(err){
        return res.json({error:"Something went wrong"})
    }
    res.json({
        token:token,
    })
})
   } else{
   return res.json({
        error:"Check Password"
    })
   }


})


app.post("/new" ,async (req,res)=>{
    const {title,description,team,assignee,priority,status,start,due}=req.body  
 console.log(req.body)
if(!title || !description || !team || !assignee ||!priority || !status || !start || !due){
    return res.json({
        error:"Something missing please check"
    })
}
await Taskk.create(req.body)
return res.json({
   
    success:"Task Added"
})
})
app.get("/new", async (req , res) =>{
  const r=await Taskk.find({})
res.json({
r
})
})
app.get("/:id", async (req,res)=>{
    const id=req.params.id;
    const d= await  Taskk.findById(id);
    console.log(d)
    res.json(d)
    })

app.put("/:id",async (req,res)=>{
    const id=req.params.id;
    const d= await  Taskk.findOneAndUpdate({_id:id},{
        priority:req.body.priority,
        status: req.body.status
    });
    return res.json({
        success:"Updated Succesfully",
        d
    })

})

// app.put("/:id", async (req, res) => {
//     const id = req.params.id;
//     try {
//         const d = await Taskk.findByIdAndUpdate({_id:id}, {
//             priority: req.body.priority,
//             status: req.body.status
//         });
       
//         if (!d) {
//             return res.status(404).json({ error: "Task not found" });
//         }
//         return res.json({
//             success: "Updated Successfully",
//             d
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// });
app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const d = await Taskk.deleteOne({_id:id});
        
        if (!d) {
            return res.status(404).json({ error: "Task not found" });
        }
        return res.json({
            success: "Deleted Successfully",
            d
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});





app.listen(3000,()=>{
    console.log("Server is Running")
})