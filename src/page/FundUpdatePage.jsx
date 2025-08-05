import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function FundUpdatePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [fund, setFund] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        status: "pending",
        date: "",
        images: []
    });
    const [updating , setUpdating] = useState(false);
    useEffect(() => {
        const fetchFund = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/v1/fund/get/${id}`);
                const data = res.data.data;
                setFund(data);
                setFormData({
                    title: data.title,
                    amount: data.amount,
                    status: data.status,
                    date: data.date || "",
                    images: []
                });
            } catch (err) {
                console.error("Failed to fetch fund:", err);
            }
        };
        fetchFund();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setFormData(prev => ({
            ...prev,
            images: e.target.files
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("admintoken");
            if (!token) {
                alert("you're not logged in");
                return;
            }

            const form = new FormData();
            form.append("title", formData.title);
            form.append("amount", formData.amount);
            form.append("status", formData.status);
            if (formData.status === "used") form.append("date", formData.date);

            for (let i = 0; i < formData.images.length; i++) {
                form.append("images", formData.images[i]);
            }

            await axios.patch(
                `http://localhost:4000/api/v1/fund/update/${id}`,
                form,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            alert("Fund updated successfully!");
            navigate("/fund");
            setUpdating(false);
        } catch (err) {
            console.error("Update failed:", err);
            alert("Update failed!");
            setUpdating(false);
        }
    };

    if (!fund) {
        return <p className="text-center py-20">Loading fund details...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto py-10 px-6 min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl text-center font- font-bold mb-8 text-indigo-800">Update Fund</h1>
            <form onSubmit={handleSubmit} className=" bg-white p-8  rounded-lg shadow-lg w-[400px]">
                <div>
                    <label className="block text-md font-medium text-gray-700 mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 mb-4 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-md font-medium text-gray-700 mb-2">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full border px-4 py-2 mb-4 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block text-md font-medium text-gray-700 mb-2">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border mb-4 px-4 py-2 rounded"
                    >
                        <option value="pending">Pending</option>
                        <option value="used">Used</option>
                    </select>
                </div>
                {formData.status === "used" && (
                    <div>
                        <label className="block text-md font-medium text-gray-700 mb-2">Completion Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="mb-4 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                    </div>
                )}
                <div>
                    <label className="block text-md font-medium text-gray-700 mb-2">Replace/Add Images (Max 5)</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="mb-3 px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                </div>
                <button type="submit" onClick={() => setUpdating(true)}
                 className="border bg-indigo-600 hover:bg-indigo-800 text-white py-1  m-3 w-full rounded-md transition">
                    {!updating ? <p>Update</p>  : <p> Updating..</p>}
                </button>
            </form>
        </div>
    );
}

export default FundUpdatePage;
