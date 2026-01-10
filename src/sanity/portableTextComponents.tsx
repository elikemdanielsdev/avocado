import Image from "next/image";
import { PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";

export const components: PortableTextComponents = {
  types: {
    image: (props) =>
      props.value ? (
        <Image
          className="rounded-lg not-prose w-full h-auto"
          src={urlFor(props.value)
            .width(1200)
            .height(800)
            .quality(100)
            .auto("format")
            .url()}
          alt={props?.value?.alt || ""}
          width="1200"
          height="800"
        />
      ) : null,
  },
};
