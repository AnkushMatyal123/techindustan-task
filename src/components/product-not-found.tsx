import { motion } from "framer-motion";

const ProductNotFound = () => {
  return (
    <div>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="border p-4 rounded-lg "
      >
        <h1 className="text-3xl font-bold mb-6">Product Not Found</h1>
        <p className="text-lg mb-6">
          Sorry, we couldn't find the product you're looking for.
        </p>
      </motion.div>
    </div>
  );
};

export default ProductNotFound;
