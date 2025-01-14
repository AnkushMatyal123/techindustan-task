import { createBrowserRouter, Outlet } from "react-router-dom";
import ProductsPage from "./modules/products";
import ProductDetails from "./modules/product-details";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <main>
        <Outlet />
      </main>
    ),
    children: [
      { path: "/", element: <ProductsPage /> },
      { path: "/:productId", element: <ProductDetails /> },
    ],
  },
]);
