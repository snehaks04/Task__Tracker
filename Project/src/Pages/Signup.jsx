import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import axios from 'axios'

export function Signup(){
    const navigate=useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className='  grid place-items-center  h-screen'>
        <div >
      
      <p className='text-center relative top-3 text-3xl font-bold'>Sign Up</p>
      <div className='  bg-ishade w-60 h-64 p-2 ' >

        <div className='m-3 '>
          <label className='mb-3 font-medium text-gray-500 ' htmlFor="Email">Email</label><br />
          <input  className="  mt-3 w-full border-2 border-black" type="email" name="Email" id="Email"  onChange={(e)=>{setEmail(e.target.value)}} required />
        </div>
        <div className='m-3'>
          <label className='mb-3 font-medium text-gray-500 ' htmlFor="password">Password</label><br />
          <input className=" mt-3 w-full border-2 border-black" type="password" name='password' id='password' onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        <button className="mt-6 p-1 rounded-md  bg-black text-white w-full" onClick={async(e)=>{
          e.preventDefault();
      
            try{
          const data= await axios.post("http://localhost:3000/signup",{
            email:email,
            password:password
          }).then(res=>{return res.data}) 
            console.log(data)
            console.log(data.error)
          if(data.error){
         
            toast.error(data.error)
            return navigate("/signup")
          }
            toast.success("User Created :)")
            navigate('/signin')
          
          
            } catch{
                navigate('/signup')
            }
         
        }}>Signup</button>
      </div>
      </div>
        </div>
    )
}