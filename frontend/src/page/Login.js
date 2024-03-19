import React, { useState } from 'react'
import loginSignupImage from '../assets/login-animation.gif'
import {BiShow,BiHide} from "react-icons/bi"
import { Link, useSearchParams } from 'react-router-dom'
import { BsEmojiSmileUpsideDown } from 'react-icons/bs'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginRedux } from '../redux/userSlice'


const Login = () => {
  const [showPassword,setShowPassword] = useState(false);
  const [data,setData] = useState({
    email:"",
    password:"",
  });
  const navigate = useNavigate();
  const userData = useSelector(state => state)


  const dispatch = useDispatch()
  


  const handleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };
  

  const handleOnChange = (e) =>{
    const {name,value} = e.target
    setData((preve)=>{
      return {
        ...preve,
        [name]:value
      }
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (email && password) {
        try {
            const fetchData = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            // Check if the response status is OK (200)
            if (fetchData.ok) {
                const dataRes = await fetchData.json();
                console.log(dataRes);
          
                toast(dataRes.message);

                if (dataRes.alert) {
                    dispatch(loginRedux(dataRes))
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);
                }
                console.log(userData)
            } else {
                // Handle non-OK response status
                console.error("Server response not OK:", fetchData.statusText);
                toast("Server error, please try again later.");
            }
        } catch (error) {
            // Handle other errors (e.g., network issues)
            console.error("Error during fetch:", error);
            toast("Error during login, please try again later.");
        }
    } else {
        alert("Please enter required fields");
    }
};



  return (
    <div className='p-3 md:p-4'>
      <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4' onSubmit={handleSubmit}>
        <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto'>
          <img src={loginSignupImage} className='w-full'/>
        </div>
        <form className='w-full py-3 flex flex-col'>
          
          <label htmlFor='email'>Email</label>
          <input type={'email'} id='email' name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.email} onChange={handleOnChange}/>

          <label htmlFor='password'>Password</label>
          <div className='flex px-2 py-1 bg-slate-200 mt-1 mb-2 rounded focus-within:outline focus-within:outline-blue-300'>
            <input type={showPassword?"text":"password"} id='password' name='password' className='w-full bg-slate-200 border-none outline-none' value={data.password} onChange={handleOnChange}/>
            <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword/*?<BiShow/>:<BiHide/>*/}</span>
          </div>

          <button className='w-full max-w-[150px] bg-pink-500 hover:bg-pink-600 cursor-pointer text-white text-xl font-medium m-auto py-1 rounded-full mt-4' >Login</button>
        </form>
        <p className='text-left text-sm mt-2'>Don't have an account? <Link to={"/Signup"} className='text-blue-500 underline'>Sign Up</Link></p>
      </div>
    </div>
  )
}

export default Login
