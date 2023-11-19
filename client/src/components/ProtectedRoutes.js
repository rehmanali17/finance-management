import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import CustomAppBar from "components/AppBar";

const ProtectedRoutes = () => {
    const { user } = useSelector(state => state.auth);
    if (!user) {
        return <Navigate to="/" replace />;
    }
    return (
        <>
            <CustomAppBar />
            <Outlet />
        </>
    );
};

export default ProtectedRoutes;
