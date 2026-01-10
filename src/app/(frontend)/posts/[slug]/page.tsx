import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { POSTS_QUERY, POST_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";

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
      <h1 className="text-4xl font-bold text-balance">{post?.title}</h1>
      <hr />
      <Link href="/posts">&larr; Return to index</Link>
    </main>
  );
}
