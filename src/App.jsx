import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "./router";

const App = () => (
  <>
    <RouterProvider router={router} />
    <ToastContainer position="top-center" autoClose={2500} />
  </>
);

export default App;
