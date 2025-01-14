"use client";

import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import debounce from "lodash.debounce";
import { RootState, AppDispatch } from "@/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setCategoryFilter, setSearchTerm } from "@/store/product-slice";
import { Input } from "./ui/input";
import ProductCard from "./product-card";
import ProductNotFound from "./product-not-found";

export default function ProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, searchTerm, categories, status, categoryFilter } = useSelector(
    (state: RootState) => state.products
  );

  const handleCategoryChange = (value: string) => {
    dispatch(setCategoryFilter(value));
  };

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Search products..."
          defaultValue={searchTerm}
          onChange={debounce(
            (e) => dispatch(setSearchTerm(e.target.value)),
            500
          )}
          className="w-full sm:w-64 border border-gray-300"
        />
        <Select value={categoryFilter} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full sm:w-64 border-gray-300">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.slug} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {status === "loading" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-md h-64 animate-pulse bg-gray-200"
            />
          ))}
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          <AnimatePresence>
            {items?.length > 0 ? (
              items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <ProductNotFound />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
