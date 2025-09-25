import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./Pages/Auth/Login";
import RegisterPage from "./Pages/Auth/RegisterPage";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import StaffLayout from "./Layout/StaffLayout";
import StaffRoutes from "./Routes/StaffRoutes";

function App() {
  const router = createBrowserRouter([
    { path: '/login', element: <Login /> },
    { path: '/register', element: <RegisterPage /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    {
      element: <StaffLayout />,
      children: StaffRoutes
    }
  ])

  return <RouterProvider router={router} />;
}

export default App
