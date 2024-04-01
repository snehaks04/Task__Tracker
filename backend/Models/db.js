const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://admin:Mongomongo203@cluster0.0rbsm1g.mongodb.net/tasktrack')

const credentialsSchema=mongoose.Schema({
    email:String,
    password:String
});

const taskSchema=mongoose.Schema({
    title:String,
    description:String,
    team:String,
    assignee:String,
    priority:String,
    status:String,
    start:Date,
    due:Date
  
})
const Credentials=mongoose.model("Credentials", credentialsSchema);
const Taskk=mongoose.model("Task",taskSchema)

module.exports={Credentials,Taskk} 
