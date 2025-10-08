import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import { X, Package, DollarSign, Box, Star } from "lucide-react";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

const CreateProductModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModalProps) => {
  const [formData, setFormData] = useState({
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value) || 0
          : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    setFormData({
      productId: v4(),
      name: "",
      price: 0,
      stockQuantity: 0,
      rating: 0,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-700 animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Create New Product
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Product Name */}
          <div className="space-y-2">
            <label 
              htmlFor="productName" 
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <Package className="w-4 h-4" />
              <span>Product Name</span>
            </label>
            <input
              type="text"
              name="name"
              id="productName"
              placeholder="Enter product name"
              onChange={handleChange}
              value={formData.name}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label 
              htmlFor="productPrice" 
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <DollarSign className="w-4 h-4" />
              <span>Price</span>
            </label>
            <input
              type="number"
              name="price"
              id="productPrice"
              placeholder="0.00"
              step="0.01"
              min="0"
              onChange={handleChange}
              value={formData.price}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Stock Quantity */}
          <div className="space-y-2">
            <label 
              htmlFor="stockQuantity" 
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <Box className="w-4 h-4" />
              <span>Stock Quantity</span>
            </label>
            <input
              type="number"
              name="stockQuantity"
              id="stockQuantity"
              placeholder="0"
              min="0"
              onChange={handleChange}
              value={formData.stockQuantity}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <label 
              htmlFor="rating" 
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              <Star className="w-4 h-4" />
              <span>Rating (0-5)</span>
            </label>
            <input
              type="number"
              name="rating"
              id="rating"
              placeholder="0"
              step="0.1"
              min="0"
              max="5"
              onChange={handleChange}
              value={formData.rating}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm"
            >
              Create Product
            </button>
            <button
              onClick={onClose}
              type="button"
              className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2.5 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
