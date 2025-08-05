import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function Admin({ isLoggedIn, setIsLoggedIn }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            const response =await axios.post("https://gramfund-server.onrender.com/api/v1/admin/login",
                { email, password }
            );
            const token = response.data.token;
            // Store token in localStorage
            localStorage.setItem("admintoken", token);

            //update login
            setIsLoggedIn(true);

            //navigate to dashboard
            navigate("/admin/dashboard");
        }
        catch(err){
            console.log(err);
            alert("credentials are invalid, try again")
        }
    }
    return (
        <div className="flex flex-col justify-center items-center min-h-screen ">
            <form onSubmit={submitHandler} className="bg-white p-8  rounded-lg shadow-lg w-80 md:w-[400px]">
                <h1 className="text-3xl font-bold mb-9 text-center text-indigo-700">Admin Login </h1>
                <div className="mb-4 flex flex-col">
                    <label htmlFor="email" className="block text-md font-medium text-gray-700 mb-6">
                        Email
                        <input type="email" name="email" value={email} placeholder="enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                    </label>
                    <label htmlFor="password" className="block text-md font-medium text-gray-700 mb-6 relative">
                        Password
                        <input type={showPassword ? "text" : "password"} name="password" value={password} placeholder="enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                        <span onClick={() => setShowPassword((prev) => !prev)} className="absolute bottom-2 right-[4px]">
                            {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) :
                                (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
                        </span>
                    </label>
                </div>
                <button type="submit" className="border bg-indigo-600 hover:bg-indigo-800 text-white py-1  m-3 w-full rounded-md transition">Log In</button>
            </form>
        </div>
    )
}
export default Admin;