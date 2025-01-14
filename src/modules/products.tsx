"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchProducts, fetchCategories } from "@/store/product-slice";
import ProductList from "@/components/product-list";

export default function ProductsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { searchTerm, categoryFilter } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts({ searchTerm, category: categoryFilter }));
  }, [categoryFilter, dispatch, searchTerm]);

  useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">E-commerce App</h1>
      <ProductList />
    </div>
  );
}
