import { useNavigate } from 'react-router-dom';
export function Home(){
    const navigate=useNavigate()
    return (
        <div className="pt-10">
            <div className="flex justify-between">
                <div className="text-2xl pl-20 font-bold ">
                    Taskie
                </div>
                <div className="flex text-md font-semibold pr-10">
                    <button className="mr-4" onClick={()=>navigate("/")}>Home</button>
                    <button  className="mr-4"  onClick={()=>navigate("/signup")}>Signup</button>
                    <button  className="mr-4" onClick={()=>navigate("/signin")}>Signin</button>
                </div>
            </div>
      
        <div className='flex  justify-between items-center '>
            <div className='w-3/2 text-center text-slate-400 font-bold font-mono ml-40 text-3xl'>“  Plan your work for today and every day, then work your plan.  ” </div>
         
             <img src="/src/assets/taskImage.jpg"  className="w-3/6  m-7 " alt="" />
        </div>

        </div>
    )
} 
