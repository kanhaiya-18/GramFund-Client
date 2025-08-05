import { NavLink } from "react-router-dom";

function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-12">
            <div className="max-w-3xl w-full text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-indigo-700">Hello Admin</h1>
                <p className="text-gray-600 mt-3 text-lg">
                    Here are all the details about the village development funds
                </p>
            </div>

            <div className="grid gap-10 md:grid-cols-2 text-center w-full max-w-3xl">
                {/* view and edit fund card */}
                <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:scale-105 transition duration-300">
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-2">View & Update Projects</h2>
                    <p className="text-gray-600 mb-4">
                        See the list of all ongoing and completed fund projects.
                    </p>
                    <NavLink to="/fund">
                        <button className="bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition">
                            Go to Projects
                        </button>
                    </NavLink>
                </div>

                {/* add funds*/}
                <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:scale-105 transition duration-300">
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-2">Add New Project</h2>
                    <p className="text-gray-600 mb-4">
                        Click below to add a new fund/project to the system.
                    </p>
                    <NavLink to="/fund/newfunds">
                        <button className="bg-indigo-700 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition">
                            Add Project
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
