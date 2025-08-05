import { Navigate } from "react-router-dom";

function ProtectedRoute({children}){
    const token = localStorage.getItem("admintoken");
    if(!token)
    {
        return <Navigate to="/admin"></Navigate>
    }
    return (children);
}
export default ProtectedRoute;