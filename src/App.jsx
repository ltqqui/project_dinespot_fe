import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./Pages/Auth/Login";

function App() {
  const router = createBrowserRouter([
    { path: '/login', element: <Login /> },
    { path: '/', element: <Login /> },
  ])

  return <RouterProvider  router={router} />;
}

export default App
