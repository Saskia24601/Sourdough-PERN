import {
  ImageIcon,
  Package2Icon,
  Plus,
  PlusCircleIcon,
  PoundSterling,
} from "lucide-react";
import { useProductStore } from "../store/useProductStore";

import React from "react";

function AddProductModal() {
  const { addProduct, formData, setFormData, loading } = useProductStore();

  return (
    <dialog id="addProductModal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        {/* Close Button */}
        <form method="dialog" className="flex justify-end">
          <button className="btn btn-sm btn-circle btn-ghost">x</button>
        </form>

        {/* Header */}
        <h3 className="font-bold text-lg mb-4">Add New Product</h3>

        <form onSubmit={addProduct} className="space-y-6">
          <div className="grid gap-6">
            {/* Product Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Product Name
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Package2Icon className="size-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  className="input input-bordered w-full pl-10"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Product Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Product Price
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <PoundSterling className="size-5 text-gray-500" />
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="price"
                  placeholder="0.00"
                  className="input input-bordered w-full pl-10"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Product Image */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">
                  Image URL
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <ImageIcon className="size-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full pl-10"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-ghost">Cancel</button>
              </form>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  !formData.name ||
                  !formData.price ||
                  !formData.image ||
                  loading
                }
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <PlusCircleIcon className="size-5" />
                    <span>Add Product</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>Close</button>
      </form>
    </dialog>
  );
}
export default AddProductModal;
