import Homepage from "pages/Homepage";
import LoggedInPage from "pages/LoggedInPage";
import { Navigate, Route, Routes } from "react-router-dom";
import MediasPage from "pages/MediasPage";
import LoginPage from "pages/LoginPage";
import FavoritesPage from "pages/FavoritesPage";
import MediaPage from "../pages/MediaPage/MediaPage";

const RoutesHandler = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="homepage" />} />
            <Route path="homepage" element={<Homepage />} />
            <Route path="media">
                <Route path=":type">
                    <Route path=":list" element={<MediasPage />} />
                    <Route path=":title/:id" element={<MediaPage />} />
                </Route>
            </Route>
            <Route path="account">
                {/* <Route path='details' element={ } /> */}
                <Route path="login" element={<LoginPage />} />
                <Route path="favorites" element={<FavoritesPage />} />
            </Route>
            <Route path="/approved" element={<LoggedInPage />} />
        </Routes>
    );
};

export default RoutesHandler;
