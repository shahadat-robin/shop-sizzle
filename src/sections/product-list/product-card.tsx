import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/slices/cart.slice";
import { Rate, Tooltip, Typography } from "antd";
import Image from "next/image";
import { BiCart } from "react-icons/bi";
import { IoMdHeartEmpty } from "react-icons/io";
import type { IProduct } from "./interface";
import ProductViewModal from "./product-view-modal";

export default function ProductCard(product: IProduct) {
  const dispatch = useAppDispatch();
  const price = +(product.price - (product.price * product.discountPercentage) / 100).toFixed(2);

  const handleAddToCart = (quantity: number) =>
    dispatch(addToCart({ productId: product.id, quantity, price }));

  return (
    <div className="border-[0.5px] group flex-col flex">
      <div className="overflow-hidden relative">
        <Image
          src={product.thumbnail}
          alt={product.title}
          height={200}
          width={200}
          className="w-full h-auto group-hover:scale-110 transition-all"
        />

        <div className="flex items-center justify-center gap-3 absolute bottom-0 left-0 right-0 text-lg transform translate-y-full group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
          <Tooltip title={"Add to wishlist"}>
            <span className="p-1.5 cursor-pointer hover:bg-brand hover:text-white transition duration-300 bg-white-secondary border rounded-full">
              <IoMdHeartEmpty />
            </span>
          </Tooltip>

          <ProductViewModal product={product} handleAddToCart={handleAddToCart} price={price} />

          <Tooltip title={"Add to cart"}>
            <span
              className="p-1.5 cursor-pointer hover:bg-brand hover:text-white transition duration-300 bg-white-secondary border rounded-full"
              onClick={() => handleAddToCart(1)}
            >
              <BiCart />
            </span>
          </Tooltip>
        </div>
      </div>

      <div className="p-3 flex-1 flex flex-col items-center justify-between text-center">
        <Typography.Title level={5} className="line-clamp-2">
          {product.title}
        </Typography.Title>
        <div>
          <Rate disabled defaultValue={product.rating} allowHalf className="text-sm" />
          <p>${price}</p>
        </div>
      </div>
    </div>
  );
}
