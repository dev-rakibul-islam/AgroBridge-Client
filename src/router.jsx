import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import AllCrops from "./pages/AllCrops/AllCrops";
import CropDetails from "./pages/CropDetails/CropDetails";
import AddCrop from "./pages/AddCrop/AddCrop";
import MyPosts from "./pages/MyPosts/MyPosts";
import MyInterests from "./pages/MyInterests/MyInterests";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/Error/NotFound";
import RouteError from "./pages/Error/RouteError";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <RouteError />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "crops",
        element: <AllCrops />,
      },
      {
        path: "crops/:id",
        element: (
          <PrivateRoute>
            <CropDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "add-crop",
        element: (
          <PrivateRoute>
            <AddCrop />
          </PrivateRoute>
        ),
      },
      {
        path: "my-posts",
        element: (
          <PrivateRoute>
            <MyPosts />
          </PrivateRoute>
        ),
      },
      {
        path: "my-interests",
        element: (
          <PrivateRoute>
            <MyInterests />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
