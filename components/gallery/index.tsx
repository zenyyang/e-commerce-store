"use client";

import Image from "next/image";
import { Tab } from "@headlessui/react";

import { Image as ImageType } from "@/types";
import GalleryTab from "@/components/gallery/gallery-tab";

interface GalleryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <Tab.Group as="div" className="md:p-6 grid grid-cols-11 p-5">
      <div className="mx-auto w-full h-full max-w-2xl col-span-2 sm:block">
        <Tab.List className="grid grid-rows-4 gap-6">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className="sm:ml-10 ml-6 aspect-square w-full col-span-8 ">
        {images.map((image) => (
          <Tab.Panel key={image.id}>
            <div className="md:aspect-[3/4] aspect-[3/4] h-full w-full relative sm:rounded-lg overflow-hidden">
              <Image
                src={image.url}
                alt="Image"
                fill
                className="object-cover object-center"
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
