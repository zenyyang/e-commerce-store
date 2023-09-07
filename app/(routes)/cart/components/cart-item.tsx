"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { toast } from "react-hot-toast";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

interface CartItemsProps {
  data: Product;
}

const CartItem: React.FC<CartItemsProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const onIncrement = () => {
    cart.addItem(data);
    toast.success("Cart Updated");
  };

  const onDecrement = () => {
    const matchingIndexes: number[] = [];

    // Find the indexes of matching items
    cart.items.forEach((item, index) => {
      if (item.id === data.id) {
        matchingIndexes.push(index);
      }
    });

    if (matchingIndexes.length > 0) {
      const lastIndex = matchingIndexes.pop();

      if (typeof lastIndex === "number") {
        const updatedCart = [...cart.items];
        updatedCart.splice(lastIndex, 1);

        // Update the cart items
        cart.setItem(updatedCart);
      }
    }
  };

  const countDuplicates = (productId: string) => {
    let count = 0;
    cart.items.forEach((item) => {
      if (item.id === productId) {
        count += 1;
      }
    });
    return count;
  };

  // Count duplicates for the current product
  let duplicateCount = countDuplicates(data.id);

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">{data.name}</p>
          </div>
          <div className="mt-1 flex item-sm">
            <p className="text-gray-500">{data.color.name}</p>
            <p className="text-gray-500 ml-4 border-l border-gray-200 pl-4">
              {data.size.name}
            </p>
          </div>
          <Currency value={Number(data.price)} />
          <div className="flex items-center mt-5 gap-5">
            <IconButton onClick={onDecrement} icon={<Minus size={15} />} />
            <p> {duplicateCount}</p>
            <IconButton onClick={onIncrement} icon={<Plus size={15} />} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
