"use client";

import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "@/store/cart-slice";
import { Product } from "@/store/product-slice";
import { Button } from "./ui/button";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="border p-4 rounded-lg border-gray-300 hover:border-gray-400"
    >
      <Link to={`/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-contain bg-gray-400 mb-4 rounded"
        />
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
      </Link>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-lg font-bold mb-4">${product.price.toFixed(2)}</p>
      <Button onClick={() => dispatch(addToCart(product))}>Add to Cart</Button>
    </motion.div>
  );
}
