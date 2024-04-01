import { Card } from '../Components/Card';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { useEffect, useState } from 'react';
import { TaskCard } from '../Components/TaskCard';
import { assigneeAtom,Email, click, descriptionAtom, disableAtom, pAtom,statuss, TeamAtom,sDate,DDate, TitleAtom } from '../store/Add';
import { useRecoilState,useRecoilValue,useSetRecoilState } from 'recoil';


export function Dashboard() {
    const [clickk, setClickk] = useRecoilState(click);
    const  setDisabled = useSetRecoilState(disableAtom);
    const email=useRecoilValue(Email)
    const navigate = useNavigate();
    const [list,setList]= useState([])
    const title= useRecoilValue(TitleAtom);
    const description = useRecoilValue(descriptionAtom)
    const team = useRecoilValue(TeamAtom)
    const assignee = useRecoilValue(assigneeAtom);
    const priority = useRecoilValue(pAtom)
    const status = useRecoilValue(statuss)
    const start=useRecoilValue(sDate)
    const due=useRecoilValue(DDate)
    const [fassignee,setFassignee]=useState("")
    const [fpriority,setFpriority]=useState("")
    const [fstart,setFstart]=useState("")
    const [fdue,setFdue]=useState("")
    const [sortt, setSortt] = useState(""); 
    // Filter function
    const filterTasks = (task) => {
        return (
            (task.assignee.includes(fassignee) || fassignee === "") &&
            (task.priority === fpriority || fpriority === "") &&
            (task.start === fstart || fstart === "") &&
            (task.due === fdue || fdue === "") 
        );
    };
    const sortTasks = (a, b) => {
      
        const priorityOrder = { "P0": 0, "P1": 1, "P2": 2 };
        const priorityA = a.priority;
        const priorityB = b.priority;
        return priorityOrder[priorityA] - priorityOrder[priorityB];
    };


const e = email.slice(0,1).toUpperCase()
    function handleClick() {
        setClickk(!clickk);
    }

    useEffect(()=>{
        axios.get("http://localhost:3000/new").then(res=>{
        console.log(res.data.r)
        setList(res.data.r)})
    },[list,handleData])
    async function handleData() {
        try {
            const response = await axios.post("http://localhost:3000/new", {
                title,
                description,
                team,
                assignee,
                priority,
                status:status,
                start,
                due

            });
            const data = response.data;
            if (data.error) {
                toast.error(data.error);
                setDisabled(true);
            } else {
                // Task added successfully, you can perform any actions here
                handleClick()
            }
        } catch (error) {
            console.log("An error occurred while creating the new item:", error);
            toast.error("An error occurred while creating the new item.");
            setDisabled(true);
        }
    }
    

    return (
        
        <div className="bg-slate-300 h-screen relative">
            <div className="flex justify-between mx-5 pt-8 lg:mx-10">
                <div className="font-bold text-2xl ml-2  lg:ml-6">
                    <p>Task Board</p>
                </div>
                <div className='flex items-center'>
                <div className="bg-slate-200 w-10 h-10 mr-4 flex items-center justify-center rounded-full font-semibold text-lg font-sans">
                    <p>{e}</p>
                </div>
                <div><button className='bg-btn px-4 py-1 text-white' onClick={()=>{
                    navigate('/')
                    toast.success("Logout Successfully")
                }}>Logout</button></div>
            </div>
            </div>
            <div className="mt-10 mx-10 border-2 bg-slate-300 p-5 ">
            <div className="flex flex-col   lg:flex lg:flex-row justify-between">

                    <div className="flex flex-col md:flex-col lg:flex-row ">
                        <label htmlFor="Filter" className="mr-5 lg:mt-4">Filter By:</label>
                        <input type="text" name="name" id="Assignee" placeholder="Assignee Name" onChange={(e)=>{setFassignee(e.target.value)}} className="h-7 pl-3 m-3 ml-20 w-40 lg:auto " />
                        <div className="mx-6">
                            <select name="Priority" id="priority" className="m-3 ml-30 px-3 lg:px-4 lg:mt-4 lg:ml-10"
>
                                <option value="default" onChange={(e)=>{setFpriority(e.target.value)}}>Priority</option>
                                <option value="p0">P0</option>
                                <option value="p1">P1</option>
                                <option value="p2">P2</option>
                            </select>
                        </div>
                        <div>
                            <label className="mr-3" htmlFor="Start" >Start date</label>
                            <input className="m-3 lg:mr-3" type="date" name="sdate" id="sdate" onChange={(e)=>{setFstart(e.target.value)}}/>
                        </div>
                        <div>
                            <label className="mr-3" htmlFor="End" >Due date</label>
                            <input className="m-3 lg:mr-3" type="date" name="ddate" id="ddate" onChange={(e)=>{setFdue(e.target.value)}}/>
                        </div>
                    </div>
                    <div>
                        <button className="bg-btn py-2 px-6 text-white" onClick={handleClick}>Add New Task</button>
                        {clickk && (
                            <AddTask handleData={handleData} handleClick={handleClick} />
                        )}
                    </div>
                  
                </div>
                <div className="flex mt-5">
                    <p className="mr-5">Sort By:</p>
                    <select className="px-3" name="sort" id="sort" onChange={(e)=>setSortt(e.target.value)}>
                        <option value="Priority">Priority</option>
                        <option value="P0">P0</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                    </select>
                </div>
           
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">

                <Card title={"Pending"} color={"bg-gg"}>
                {console.log("pending tasks:", list.filter(t => t.status === "Pending"))}
                {list.filter(t => t.status === "Pending" && filterTasks(t)).sort(sortTasks).map((task) => (
                    <TaskCard
                        key={task._id}
                        id={task._id}
                        title={task.title}
                        description={task.description}
                        assignee={task.assignee}
                        priority={task.priority} 
                        status={task.status} 
                    />
                ))}
                </Card>

                <Card title={"IN Progress"} color={"bg-oo"}>
                    {console.log("Progress tasks:", list.filter(t => t.status === "IN Progress"))}
                    {list.filter(t => t.status === "IN Progress" && filterTasks(t)).sort(sortTasks).map((task) => (
                        <TaskCard
                            key={task._id}
                            id={task._id}
                            title={task.title}
                            description={task.description}
                            assignee={task.assignee}
                            priority={task.priority} 
                            status={task.status}
                        />
                    ))}
                </Card>

                <Card title={"Completed"} color={"bg-g"}>
                    {console.log("Completed tasks:", list.filter(t => t.status === "Completed"))}
                    {list.filter(t => t.status === "Completed" && filterTasks(t)) .sort(sortTasks).map((task) => (
                        <TaskCard
                            key={task._id}
                            id={task._id}
                            title={task.title}
                            description={task.description}
                            assignee={task.assignee}
                            priority={task.priority} 
                            status={task.status}
                        />
                    ))}
                </Card>

                <Card title={"Deployed"} color={"bg-bb"}>
                    {console.log("Deployed tasks:", list.filter(t => t.status === "Deployed"))}
                    {list.filter(t => t.status === "Deployed" && filterTasks(t)) .sort(sortTasks).map((task) => (
                        <TaskCard
                            key={task._id}
                            id={task._id}
                            title={task.title}
                            description={task.description}
                            assignee={task.assignee}
                            priority={task.priority} 
                            status={task.status}
                        />
                    ))}
                </Card>

                <Card title={"Deferred"} color={"bg-p"}>
                    {console.log("Deferred tasks:", list.filter(t => t.status === "Deferred"))}
                    {list.filter(t => t.status === "Deferred" && filterTasks(t)) .sort(sortTasks).map((task) => (
                        <TaskCard
                            key={task._id}
                            id={task._id}
                            title={task.title}
                            description={task.description}
                            assignee={task.assignee}
                            priority={task.priority} 
                            status={task.status}
                        />
                    ))}
                </Card>

                </div>
            </div>
        </div>
    );
}

function AddTask({ handleData ,handleClick}) {

 const setTitle = useSetRecoilState(TitleAtom);
 const setDescription = useSetRecoilState(descriptionAtom);
 const setTeam = useSetRecoilState(TeamAtom);
 const setAssignee = useSetRecoilState(assigneeAtom);
 const setPriority = useSetRecoilState(pAtom);

 const setStatus=useSetRecoilState(statuss)
 const setStart =useSetRecoilState(sDate)
 const setDue =useSetRecoilState(DDate)

    // function handleClose() {
    //     setClickk(!clickk)
    // }

    return (
        <div className="bg-grayy bg-opacity-55 absolute grid place-items-center h-screen w-screen top-0 left-0">
            <div className="w-96 h-80">
                <div className="flex p-2 bg-white justify-between">
                    <p className="text-2xl font-semibold">CREATE A TASK</p>
                    <div className="mr-3" onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                </div>

                <div className="bg-nutrall h-fit pt-4 pl-3">
                    <div>
                        <label htmlFor="title">Title</label>
                        <input className="bg-lightgray border border-solid ml-16 w-60 border-slate-500" type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="description">Description</label>
                        <input className="bg-lightgray ml-3 w-60 border border-solid border-slate-500" type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="team">Team</label>
                        <input className="bg-lightgray ml-14 w-60 border border-solid border-slate-500" type="text" name="team" id="team" onChange={(e) => setTeam(e.target.value)} />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="assignee">Assignees</label>
                        <input className="bg-lightgray border ml-5 w-60 border-solid border-slate-500" type="text" name="assignee" id="assignee" onChange={(e) => setAssignee(e.target.value)} />
                    </div>

                    <div className='flex justify-between mb-3'>
                        <div className="mt-7">
                            <select name="priority" id="priority" onClick={(e) => setPriority(e.target.value)}>
                                <option value="selectt">--Select Priority--</option>
                                <option value="p0">P0</option>
                                <option value="p1">P1</option>
                                <option value="p2">P2</option>
                            </select>
                        </div>
                        <div className="mt-7 mr-10">
                            <select name="status" id="status" onClick={(e) => setStatus(e.target.value)}>
                            <option value="s">--select Status--</option>
                            <option value="Pending">Pending</option>
                            <option value="IN Progress">IN Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Deployed">Deployed</option>
                            <option value="Deffered">Deffered</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex'>
                        <div>
                            <label htmlFor="start">Start Date</label>
                            <input type="date" name="start" id="start" onChange={(e)=>{setStart(e.target.value)}}/>
                        </div>
                        <div>
                            <label htmlFor="Due">Due Date</label>
                            <input type="date" name="due" id="due" onChange={(e)=>{setDue(e.target.value)}}/>
                        </div>

                    </div>
                    <div className='flex justify-center'>
                    <button className="mt-6 p-1 rounded-md bg-black text-white px-10 mb-2 text-center  " onClick={handleData} >Add</button>
                </div></div>
            </div>
        </div>
    );
}
