import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from '../pages/Home';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Favorites from '../pages/Favorites';
import { Fragment } from "react";
import useAuth from '../hooks/useAuth'; 

interface PrivateProps {
    Component: React.ComponentType;
}

const PrivateRoute = ({ Component }: PrivateProps) => {
    const { signed } = useAuth();

    return signed ? <Component /> : <Navigate to="/signin" />;
}

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path="/home" element={<PrivateRoute Component={Home} />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/favorites" element={<PrivateRoute Component={Favorites} />} />
                    <Route path="/" element={<Navigate to="/signin" />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    );
}

export default RoutesApp;
