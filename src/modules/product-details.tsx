"use client";

import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchProductById } from "@/store/product-slice";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/store/cart-slice";
import { ShimmerEffect } from "@/components/ui/shimmer-effect";

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector(
    (state: RootState) => state.products.currentProduct
  );
  const status = useSelector((state: RootState) => state.products.status);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(parseInt(productId, 10)));
    }
  }, [dispatch, productId]);

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <ShimmerEffect width="100%" height="400px" />
          <div>
            <ShimmerEffect width="70%" height="36px" className="mb-4" />
            <ShimmerEffect width="100%" height="80px" className="mb-4" />
            <ShimmerEffect width="30%" height="32px" className="mb-4" />
            <ShimmerEffect width="120px" height="40px" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      <Link to="/">
        <Button variant="link">&larr; Back to Products</Button>
      </Link>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full rounded-lg shadow-md bg-gray-400"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <Button onClick={() => dispatch(addToCart(product))}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
