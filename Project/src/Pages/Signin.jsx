import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {Email} from '../store/Add'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { useRecoilState } from 'recoil'

export function Signin(){
  const navigate=useNavigate()
    const [email, setEmail] = useRecoilState(Email)
    const [password, setPassword] = useState("")
    return (
       
        <div className='  grid place-items-center h-screen'>
        <div className=' '>
      
      <p className='text-center relative top-3 text-3xl font-bold'>Sign In</p>
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
           const data= await axios.post("http://localhost:3000/signin",{
            email:email,
            password:password
          }).then(res=>{
            return res.data
          })
localStorage.setItem("token",data.token)

     
          if(data.error){
            toast.error(data.error)
            return navigate("/signin")
          }
            
            navigate('/dashboard')
          
          
            } catch(err){
              console.log(err)
                navigate('/signin')
            }
          
        }}>Signin</button>
      </div>
      </div>
        </div>
    )
}
