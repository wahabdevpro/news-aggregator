import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "./components/global/Footer";
import Header from "./components/global/Header";
import NotFoundPage from "./components/global/NotFound";
import { lazy, Suspense, useEffect } from "react";
import Loading from "./components/global/Loading";
import Alert from './components/global/Alert';
import { useNavigate } from "react-router-dom";
import APIService from "./services/APIService";
import { useDispatch } from "react-redux";
import AuthService from "./services/AuthService";
import ProtectedRoute from "./components/global/ProtectedRoute";
import localRoutes from "./utils/localRoutes";


const AuthPage = lazy(() => import("./pages/Auth"));
const PreferencesPage = lazy(() => import("./pages/Preference"));
const FeedPage = lazy(() => import("./pages/Feed"));
const MyFeedPage = lazy(() => import("./pages/MyFeed"));
const SearchNews = lazy(() => import("./pages/SearchNews"));


const MainAppComponent = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const apiService = APIService.getApiService();
    apiService.setupInterceptors(navigate, dispatch); // Setting up interceptors with navigation and dispatch

    // Init auth
    AuthService.initAuth();

  }, [navigate, dispatch]);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1600px",
        margin: "0 auto",
        height: "auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        overflowX: "hidden",
      }}
    >
      <Header key={"header"} />
      <Suspense fallback={<Loading />}>
      <Alert /> 
        <Routes>
          <Route path="/" exact element={<ProtectedRoute element={MyFeedPage} redirectTo={localRoutes.news} />} />
          <Route path={localRoutes.news} exact element={<FeedPage />} />
          <Route path={localRoutes.auth} exact element={<AuthPage />} />
          <Route path={localRoutes.search} exact element={<SearchNews />} />
          <Route path={localRoutes.preferences} exact element={<ProtectedRoute element={PreferencesPage} />} />
          <Route path="*" exact element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </Box>
  );
};




export default MainAppComponent;
