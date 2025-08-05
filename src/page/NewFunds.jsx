import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewFunds() {
    const [fillForm, setFillForm] = useState({
        id: "",
        title: "",
        amount: "",
        date: "",
        status: "pending",
    });
    const navigate = useNavigate();

    function changeHandler(e) {
        const { name, value } = e.target;
        setFillForm((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    function submitHandler(e) {
        e.preventDefault();
        const token = localStorage.getItem("admintoken");
        if (!token) {
            alert("You're not authorized. Please log in first.");
            return;
        }
        const data = {
            ...fillForm,
            id: Number(fillForm.id),
            amount: Number(fillForm.amount)
        };
        const func = async () => {

            try {
                const res = await axios.post("https://gramfund-server.onrender.com/api/v1/fund/create", data,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                if (res) {
                    alert("Project added successfully");
                    navigate("/fund");
                }
            }
            catch (e) {
                console.log("some error occured ", e);
                alert("please fill all the details properly");
            }
        }
        func();
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-3xl md:text-5xl font-bold my-12 text-center text-indigo-700">Enter Project Details</h1>
            <form className="bg-white p-8  rounded-lg shadow-lg w-80 md:w-[400px] flex flex-col"
                onSubmit={submitHandler}>

                <label htmlFor="id" className="block text-md font-medium text-gray-700 mt-5">Id</label>
                <input type="number" onChange={changeHandler} value={fillForm.id} name="id"
                    className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300" />

                <label htmlFor="title" className="block text-md font-medium text-gray-700 mt-5">Title</label>
                <input type="text" onChange={changeHandler} value={fillForm.title} name="title"
                    className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300" />

                <label htmlFor="amount" className="block text-md font-medium text-gray-700 mt-5">Amount</label>
                <input type="number" onChange={changeHandler} value={fillForm.amount} name="amount"
                    className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300" />



                <label htmlFor="status" className="block text-md font-medium text-gray-700"> Status
                    <select onChange={changeHandler} value={fillForm.status} name="status"
                        className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300">
                        <option value="used">used</option>
                        <option value="pending">pending</option>
                    </select>
                </label>
                {fillForm.status === "used" && <label htmlFor="date" className="block text-md font-medium text-gray-700 mt-5">Date
                    <input type="Date" onChange={changeHandler} value={fillForm.date} name="date"
                        className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                </label>}
                <button type="submit"
                    className="mt-7 bg-green-600 text-white p-1 px-4 text-md rounded-md hover:bg-green-700 transition">
                    Add
                </button>

            </form>
        </div>
    );
}
export default NewFunds;