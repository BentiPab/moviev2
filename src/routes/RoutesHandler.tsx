import Homepage from "pages/Homepage/Homepage";
import { Navigate, Route, Routes } from "react-router-dom";
import MediasPage from "pages/MediasPage";
import MediaPage from "../pages/MediaPage/MediaPage";
import NotFoundPage from './../pages/NotFoundPage';
import PageUnderConstruction from "pages/PageUnderConstruction/PageUnderConstruction";
import SearchPage from "pages/SearchPage";

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
                <Route path="*" element={<PageUnderConstruction />} />
                {/*TODO: implement user account*/}
                {/* <Route path='details' element={ } /> */}
                {/* <Route path="login" element={<LoginPage />} />
                <Route path="favorites" element={<FavoritesPage />} /> */}
            </Route>
            {/* <Route path="/approved" element={<LoggedInPage />} /> */}
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default RoutesHandler;
