"use client";
import { toast } from "react-hot-toast";

import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";

interface InfoProps {
  data: Product[];
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const onAddToCart = () => {
    cart.addItem(data[0]);

    toast.success("Item added to cart");
  };
  return (
    <div className="sm:pl-12 sm:pr-12 ">
      <h1 className="text-3xl font-bold text-gray-800">{data[0].name}</h1>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data[0].price} />
        </p>
      </div>
      <hr className="my-4" />
      <p className="sm:text-xl font-light text-lg"> {data[0].desc}</p>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>
            {data[0].size.name} ({data[0].size.value})
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data[0]?.color?.value }}
          ></div>
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button
          onClick={onAddToCart}
          className="flex items-center justify-center gap-x-2 font-normal w-full"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Info;
