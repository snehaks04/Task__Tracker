// import { useRecoilState } from "recoil"

// import { options,ButtonId } from "../store/Add"
// export function TaskCard({ id, title, priority, description, assignee  }) {
//     const [click,setClick]=useRecoilState(options)
//     const [btnId,setBtnId]=useRecoilState(ButtonId)
  
//     return (
//         <div className="bg-slate-200 m-3 p-3  ">
//             <div className="flex justify-between " >
//                 <div className="text-lg font-semibold">{title}</div>
//                 <div>
//                     <button className="bg-btn text-white p-1">{priority}</button>
//                 </div>
//             </div>
//             <div className="border w-full border-gray-400 my-3 border-dotted"></div>
//             <div className=" text-wrap w-full break-words text-left h-auto">
//                {description}</div>
                 
//                 <div className="flex justify-between mt-3">  
//                 <div className="text-md font-semibold">
//                     {assignee}
//                     </div>
//                 <div>
//                     <button id={id} className="bg-btn text-white w-4 h-6 " onClick={(e)=>{
//                        setBtnId(e.target.id)
//                        console.log(click)
//                         setClick(!click)
                       
//                     }}>:</button>
                  
//                 { click && (btnId==id && <Options/>)}
//                 </div>
//                      </div>
//                      <div className="text-left m-2 mt-6"><button className="bg-btn text-white py-1 px-5 ">Assign</button></div>
                     
           
//         </div>
//     )
// }
// function Options(){
//     const [click,setClick]=useRecoilState(options)
//     return (
//         <div className="bg-slate-200 absolute top-94 mt-5  left-30 p-5">
//             <div> 
//                  <button onClick={setClick(!click)}>Edit</button>
//             <hr />
//             <button>Delete</button></div>
          
//         </div>
//     )
// }
// TaskCard.jsx
import { useRecoilState } from "recoil"
import {toast} from 'react-hot-toast'
import {useEffect,useState} from "react"
// import {toast} from "react-hot-toast"
import axios from 'axios'

import { options, ButtonId,EditClick, pAtom, DeleteClick,statuss} from "../store/Add"

export function TaskCard({ id, title, priority, description, assignee,status }) {
    const [click, setClick] = useRecoilState(options)
    const [btnId, setBtnId] = useRecoilState(ButtonId)
  

    return (
        <div className="bg-slate-200  m-3 p-3 ">
            <div className="flex justify-between">
                <div className="text-lg font-semibold">{title}</div>
                <div>
                    <button className="bg-btn text-white p-1">{priority}</button>
                </div>
            </div>
            <div className="border w-full border-gray-400 my-3 border-dotted"></div>
            <div className="text-wrap w-full break-words text-left h-auto">
                {description}
            </div>
            <div className="flex justify-between mt-3">  
                <div className="text-md font-semibold">
                    {assignee}
                </div>
                <div>
                    <button 
                        id={id} 
                        className="bg-btn text-white w-4 h-6" 
                        onClick={() => {setBtnId(id)
                        setClick(!click)}}  
                    >
                        :
                    </button>
                    
                    {(click && btnId === id) && <Options id={id} />}
                  
                   
                </div>
            </div>
            <div className="text-left m-2 mt-6">
            <button className="bg-btn text-white py-1 px-5">
            {status === "Pending" ? "Assign" : status}
                </button>

            </div>
        </div>
    )
}

// Options.jsx


export function Options({ id }) {
    const [click, setClick] = useRecoilState(options)
    const [editClick, setEditClick] = useRecoilState(EditClick)
    const [delClick, setDelClick] = useRecoilState(DeleteClick)

    return (
        <div className="bg-gray-300 absolute top-94  shadow-md mt-5 left-30 p-5">
            <div> 
                <button onClick={() => {setEditClick(!editClick)
                console.log(editClick)
                }}>Edit</button>
            
                <div >
                   
                     {editClick && (
                            <Edit id= {id}/>
                        )}
                </div>
                <hr  className="border border-gray-500 my-2 w-full "/>
                <button onClick={()=>setDelClick(!delClick)}>Delete</button>
                {delClick && <DeleteTask id={id} />}
            </div>
            
        </div>
    )
}

function Edit({id}){
    const [edit,setEdit]=useState({})
    
    const [editClick, setEditClick] = useRecoilState(EditClick)
    const [priority,setPriority]=useRecoilState(pAtom)
    const [status,setStatus]=useRecoilState(statuss)

    // const [close,setClose]=useRecoilState(EditClose)
    // function handleClose(){
    //     console.log(close)
    //     setClose(!close)
    // }
    function handleEditclick(){
        console.log(editClick)
        setEditClick(!editClick)
    }
    useEffect(()=>{
        axios.get("http://localhost:3000/"+id).then(res=>{
        console.log(res.data)
        setEdit(res.data)})
    },[])
    


    return (
        <div className="bg-grayy bg-opacity-55 fixed top-0 left-0 right-0 bottom-0  grid place-items-center h-screen w-screen ">
               <div className="w-96 h-80">
                <div className="flex p-2 bg-white justify-between">
                    <p className="text-2xl font-semibold">EDIT A TASK</p>
                    <div className={"mr-3 "} onClick={handleEditclick}>
                       
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                </div>
                <div className="bg-nutrall h-80 p-3 text-left">
                    <div className="m-2 ">
                    <label htmlFor="title" className="pr-3">Title: </label>
                    <br />
                    <input type="text" name="title" id="title" className=" border border-black w-full mt-2 pl-3 bg-gray-300"  defaultValue={edit.title} readOnly disabled/>
                    </div>
              
                    <div className="m-2 ">
                        <label htmlFor="description" className="pr-3">Description:</label>
                        <input type="text" className=" border border-black w-full mt-2 pl-3 bg-gray-300" name="description" id="description" defaultValue={edit.description}  readOnly disabled/>
                    </div>

                    <div className="m-2">
                        <label htmlFor="team" className="pr-3">Team:</label>
                        <input type="text" name="team" id="team" defaultValue={edit.team} className=" border border-black w-full mt-2 pl-3 bg-gray-300" readOnly disabled/>
                    </div>

                    <div className="m-2">  
                    <label htmlFor="assignee" className="pr-3">Assignee:</label>
                    <input type="text" name="assignee"  className=" border border-black w-full mt-2 pl-3 bg-gray-300" id="assignee" defaultValue={edit.assignee} readOnly disabled />
                    </div>

            <div className="flex mt-3 justify-between">
                <div >
                <label htmlFor="priority" className="mr-2">Priority:</label>
                <select name="priority" id="priority" value={priority} onChange={(e)=>{setPriority(e.target.value)}}>
                    <option value="s">--select--</option>
                    <option value="p0">P0</option>
                    <option value="p1">P1</option>
                    <option value="p2">P2</option>
                </select>
                </div>
                <div>
                <label htmlFor="status" className="mr-2" >Status:</label>
                <select name="status" id="status" value={status} onChange={(e)=>{setStatus(e.target.value)}} >
                    <option value="s">--select--</option>
                    <option value="Pending">Pending</option>
                    <option value="IN Progress">IN Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Deployed">Deployed</option>
                    <option value="Deffered">Deffered</option>
                </select>
                </div>
            </div>
              </div>




            <div className=" flex justify-end bg-white  h-16 items-center   m-0 ">
                
                    <div><button className="mx-3 mr-3 p-1 px-3 rounded-md bg-btn text-white " id={id} onClick={async (e)=>{
                        const ID=e.target.id;
                        try{
                            if(ID){
                        await axios.put("http://localhost:3000/"+ID,{
                        priority,
                        status
                        })

                        toast.success("Task Updated")
                        handleEditclick()
                    } else{
                        toast.error("Id is not present")
                    }
                    
                    } catch {
                        toast.error("Something Wrong ")
                    }
                    }}  >Submit</button></div>
                    <div>
                        <button className="mx-3 p-1 mr-3 px-3 rounded-md bg-btn text-white " onClick={() => {
                            setPriority("");
                            setStatus("")
                        }} >Reset</button>
                    </div>

                </div>
            </div>
  </div>
    )
}

// function DeleteTask({id}){
//     const [delClick, setDelClick] = useRecoilState(DeleteClick)
//     const [task,setTask]=useState({})
    
//     async function deleteTaskk(){
//         await axios.delete("http://localhost:3000/"+id)
//     }
//     useEffect(()=>{
//         deleteTaskk()
//     },[id])
//     function handleDelete(){
//         setDelClick(!delClick)
//     }

//     return (
//     <div className="bg-grayy bg-opacity-55 fixed top-0 left-0 right-0 bottom-0  grid place-items-center h-screen w-screen ">
//                <div className="w-96 h-80">
//                 <div className="flex p-2 bg-white justify-between">
//                     <p className="text-2xl font-semibold">DELETE A TASK</p>
//                     <div className={"mr-3 "} onClick={handleDelete}>
                       
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
//                             <path d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//                         </svg>
//                     </div>
//                 </div>
//                 <div className="bg-nutrall h-80 p-3 text-left">
//                 <div> Do You Wish to Delete Task</div>
//                 <div>
//                     <div>{task.title}</div>
//                     <div>
//                         <div><button onClick={async ()=>{
//                             console.log(id)
//                             try{
//                                 if(!id){
//                                     return toast.error("Task Not found")
//                                 }
//                           await axios.delete("http://localhost:3000/"+id)
//                           toast.success("Deleted Successfully")
//                           handleDelete()

//                             }catch{
//                                 toast.error("Something Wrong")
//                             }
//                             }} >Yes</button></div>
//                         <div><button onClick={handleDelete}>No</button></div>
//                     </div>
//                 </div>
//             </div>
//   </div>
//   </div>
//     )

// }


function DeleteTask({ id }) {
    const [delClick, setDelClick] = useRecoilState(DeleteClick);
    const [task,setTask]=useState({})

    async function getTask(){
 const d= await axios.get("http://localhost:3000/"+id);
  setTask(d)
  console.log(task )
    }
    useEffect(()=>{
        axios.get("http://localhost:3000/"+id).then(res=>{
            setTask(res.data)
        })
    },[id])
    // Function to handle task deletion
    async function deleteTask() {
        try {
      await axios.delete("http://localhost:3000/" + id);
        
            toast.success("Deleted Successfully");
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error("Something went wrong");
        }
    }

    // Function to handle canceling the deletion
    function handleCancel() {
        setDelClick(false); // Close the delete confirmation dialog
    }

    // Function to handle confirming the deletion
    function handleConfirmDelete() {
        deleteTask();
        setDelClick(false); // Close the delete confirmation dialog
    }

    return (
     
        <div className="bg-grayy bg-opacity-55 fixed top-0 left-0 right-0 bottom-0  grid place-items-center h-screen w-screen ">
            
            <div className="w-96 h-80">
                
                <div className="flex p-2 bg-white justify-between">
                    <p className="text-2xl font-semibold">DELETE A TASK</p>
                    
                    <div className="mr-3" onClick={handleCancel}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                </div>
                <div className="bg-nutrall h-fit p-3 text-left">
                    <div>Do You Wish to Delete Task</div>
                    <div className="flex justify-between mt-4 ">
                        <div className="font-semibold">{task.title}</div>
                       
                        <div className="flex ">
                        <div className="mr-4 bg-btn py-1 px-3 text-white">
                            <button onClick={handleConfirmDelete}>Yes</button>
                        </div>
                        <div className="mr-4  bg-btn  py-1 px-3 text-white">
                            <button onClick={handleCancel}>No</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
