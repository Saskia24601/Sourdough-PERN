import { Edit2Icon, TrashIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";
import { useProductStore } from "../store/useProductStore";
import React from "react";

function ProductCard({ product }) {
  const { deleteProduct } = useProductStore();
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <figure className="relative pt-[80.25%]">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
        />
      </figure>

      {/* Product Details */}
      <div className="card-body ">
        <h2 className="card-title text-lg font-semibold">{product.name}</h2>
        <p className="text-2xl font-bold text-primary">
          £{Number(product.price).toFixed(2)}
        </p>

        {/* Card Actions */}
        <div className="card-actions justify-end mt-4">
          <Link
            to={`/product/${product.id}`}
            className="btn btn-sm btn-info btn-outline"
          >
            <Edit2Icon className="size-4 mr-2" />
          </Link>
          <button
            className="btn btn-sm btn-error btn-outline"
            onClick={() => deleteProduct(product.id)}
          >
            <TrashIcon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
