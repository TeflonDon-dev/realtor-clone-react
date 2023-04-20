import React, { useState } from 'react';
import {AiFillEyeInvisible,AiFillEye} from "react-icons/ai"
import { Link } from 'react-router-dom';
import OAuth from '../Components/OAuth';
import {createUserWithEmailAndPassword, getAuth,updateProfile} from "firebase/auth"
import {db} from "../Firebase"
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: ''
  });
  const { email, password, name } = formData;
  const navigate = useNavigate();

  function onchange(e) {
    setFormData((prevState) => ( {
      ...prevState,[e.target.id]:e.target.value
    }
    ))
  }
  async function onSubmit(e) {
    e.preventDefault();

    try {
      const auth = getAuth()
      const userCredentials=await createUserWithEmailAndPassword(auth,email,password)
      updateProfile(auth.currentUser, {
        displayName:name
      })
      const user = userCredentials.user
      const formDataCopy = { ...formData };
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("Sign up was successful");
      navigate("/")
    } catch (error) {
      toast.error("Something went wrong with the registration")
    }
    
  }
  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold '>Sign up</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md: w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60" alt="" className='w-full rounded-2xl' />
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
            <input className=' mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' type="text" id='name' value={name} onChange={onchange} placeholder='Full name' />
            <input className=' mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' type="email" id='email' value={email} onChange={onchange} placeholder='Email Address' />
            <div className=' relative mb-6'>
              <input className=' w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' type={showPassword ? "text" : "password"} id='password' value={password} onChange={onchange} placeholder='Password' />
              {showPassword ? <AiFillEyeInvisible onClick={()=>setShowPassword(prevState=>!prevState)} className=' absolute right-3 top-3 text-xl cursor-pointer'/> : <AiFillEye onClick={()=>setShowPassword(prevState=>!prevState)}  className=' absolute right-3 top-3 text-xl cursor-pointer'/>}
            </div>
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6'>Have an account?
                 <Link className=' text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1' to={"/sign-in"}>Sign in</Link>
              </p>
              <p>
                <Link className=' text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out' to={"/forgot-password"}>Forgot password?</Link>
              </p>
             
            </div>
            <button className=' hover:shadow-lg active:bg-blue-800 w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition ease-in-out duration-150' type="submit">Sign up</button>
          <div className=' my-4 before:border-t flex before:flex-1 items-center before:border-gray-300 after:border-t after:flex-1 after:border-gray-300'>
            <p className='text-center font-semibold mx-4'>OR</p>
          </div>
            <OAuth/>
          </form>
          
        </div>
      </div>
    </section>
  )
}
