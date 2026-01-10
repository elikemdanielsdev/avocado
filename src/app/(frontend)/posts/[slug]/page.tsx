import { sanityFetch } from "@/sanity/lib/live";
import { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY, POST_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import { components } from "@/sanity/portableTextComponents";
import Link from "next/link";
import Image from "next/image";

export async function generateStaticParams() {
  const posts = await client.fetch(POSTS_QUERY);

  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: params,
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      {post?.mainImage ? (
        <Image
          className="w-full aspect-800/300"
          src={urlFor(post.mainImage)
            .width(800)
            .height(300)
            .quality(80)
            .auto("format")
            .url()}
          alt={post?.mainImage?.alt || ""}
          width="800"
          height="300"
        />
      ) : null}
      <h1 className="text-4xl font-bold text-balance">{post?.title}</h1>
      {post?.body ? (
        <div className="prose">
          <PortableText value={post.body} components={components} />
        </div>
      ) : null}
      <hr />
      <Link href="/posts">&larr; Return to index</Link>
    </main>
  );
}
