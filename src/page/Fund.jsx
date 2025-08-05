import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Fund({ isLoggedIn }) {

    const [allFunds, setAllFunds] = useState([]);
    const [loading, setLoading] = useState(true);
    //get the fund info from backend (get request)
    useEffect(() => {
        const getFunds = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/v1/fund/get");
                setAllFunds(response.data.data);
            }
            catch (error) {
                console.log("some error occured during fund fetching ", error);
            }
            finally {
                setLoading(() => false);
            }
        }
        getFunds();
    }, []);

    //kya select kia hai ->all, completed, pending me se
    const [filtered, setFiltered] = useState("All");
    // filteredFund -> vhi dalna jo dropdown me select kia hai
    let filteredFund;
    if (filtered === "All") {
        filteredFund = allFunds;
    }
    else if (filtered === "Completed") {
        filteredFund = allFunds.filter(f => f.status === "used");
    }
    else {
        filteredFund = allFunds.filter(f => f.status === "pending");
    }
    // console.log(filteredFund);

    //calculating
    const totalFund = allFunds.reduce((sum, item) => sum + item.amount, 0);
    const usedFund = allFunds.filter((check) => check.status === "used").reduce((sum, item) => sum + item.amount, 0);
    const remainingFund = totalFund - usedFund;
    // console.log(usedFund);
    // console.log("totalfund: ", totalFund);

    //index for image scrolling
    // const [imageIndexes, setImageIndexes] = useState({});

    if (loading) {
        return (<p className="flex justify-center items-center min-h-screen text-xl font-semibold text-indigo-600">
            loading the data...
        </p>);
    }

    return (
        <div className="min-h-screen text-center  px-6 py-10">
            <h1 className="text-4xl font-bold text-indigo-700 text-center my-10">
                Village Development Funds
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 p-3 m-10 md:ml-20 text-white  gap-10">
                <div className="bg-indigo-600 rounded-xl p-6 shadow-md max-w-[250px]">
                    <h2 className="text-xl font-semibold">Total Fund</h2>
                    <p className="text-xl md:text-3xl font-bold pt-2">{totalFund}</p>
                </div>
                <div className="bg-green-600 rounded-xl p-6 shadow-md max-w-[250px]">
                    <h2 className="text-xl font-semibold">Used Fund</h2>
                    <p className="text-3xl font-bold pt-2">{usedFund}</p>
                </div>
                <div className="bg-orange-500 rounded-xl p-6 shadow-md max-w-[250px]">
                    <h2 className="text-xl font-semibold">Remaining Fund</h2>
                    <p className="text-3xl font-bold pt-2">{remainingFund}</p>
                </div>
            </div>
            {/* drop=-down list  */}
            <div className="flex md:justify-end justify-center md:mr-20 mt-14">
                <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none  focus:ring-indigo-200" name="filtered"
                    value={filtered} onChange={(e) => setFiltered(e.target.value)}>
                    <option value="All">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                </select>
            </div>
            {/* cards of works */}
            <div className="grid grid-cols-1 md:grid-cols-3  gap-8  my-8">
                {
                    filteredFund.map((item) => (
                        <div key={item.id} className="bg-white text-gray-700 rounded-xl shadow-lg p-5 hover:shadow-xl transition mb-5">
                            <div className="mb-4">
                                <Swiper
                                    spaceBetween={10}
                                    slidesPerView={1}
                                    loop={true}
                                    className="rounded overflow-hidden">
                                    {item.image.map((src, index) => (
                                        <SwiperSlide key={index}>
                                            <img
                                                src={src}
                                                alt={`${item.title}-${index}`}
                                                className="w-full h-56 object-cover"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>


                            <div>
                                <h2 className="text-xl font-semibold m-2"> {item.title} </h2>
                                <p className="text-gray-700 mb-1">
                                    <span className="font-semibold">Amount:</span> ₹{item.amount}
                                </p>
                                <p className="text-gray-700 mb-1">
                                    <span className="font-semibold">Status:</span> {item.status}
                                </p>
                                {item.status === "used" ? (<p className="text-gray-700 mb-1"><span className="font-semibold"> Date: </span> {item.date} </p>) :
                                    (<p className="text-gray-700 mb-1"> Not Completed</p>)}

                                {isLoggedIn ? (<button className="bg-indigo-600 text-white p-1 mt-2 px-4 text-md rounded-md hover:bg-indigo-700 transition">
                                    <Link to={`/fund/edit/${item._id}`}>Edit</Link>
                                </button>)
                                    : (<p className="text-gray-700 m-2 mt-3">Having issue? {">>"}
                                        <Link to="/complain" className="bg-indigo-600 text-white p-2 text-sm rounded-md hover:bg-indigo-700 transition">
                                            Complain
                                        </Link>
                                    </p>)}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div >


    );
}
export default Fund;