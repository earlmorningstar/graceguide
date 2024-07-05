import { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Bible from "./pages/Bible";
import LoadingComponent from "./pages/LoadingComponent";
import Blog from "./pages/Blog";
import BlogDetailPage from "./pages/BlogDetailPage";
import BibleReader from "./pages/BibleReader";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/bible", element: <Bible /> },
      { path: "/blog", element: <Blog /> },
      { path: "/blog-detail", element: <BlogDetailPage /> },
      {path: "/bible-reader", element: <BibleReader />},
    ],
  },
]);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsLoading(false);
    };

    fetchInitialData();
  }, []);

  return (
    <>
      <LoadingComponent isLoading={isLoading}>
        <RouterProvider router={router} />
      </LoadingComponent>
    </>
  );
}

export default App;
