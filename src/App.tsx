import { Provider } from "react-redux";
import { store } from "./store";
import { CartProvider } from "./components/cart-provider";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes";

export default function App() {
  return (
    <Provider store={store}>
      <CartProvider>
        <RouterProvider router={routes} />
      </CartProvider>
    </Provider>
  );
}
