import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/api";

// SSG: Generate static params for all products
export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((product) => ({
        id: product.id.toString(),
    }));
}

// Dynamic Metadata
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    try {
        const product = await getProduct(id);
        return {
            title: product.title,
            description: product.description,
            alternates: {
                canonical: `https://next-seo.com/products/${product.id}`,
            },
            openGraph: {
                title: product.title,
                description: product.description,
                images: [product.image],
                url: `https://next-seo.com/products/${product.id}`,
                type: "website",
            },
        };
    } catch (e) {
        return {
            title: "Product Not Found",
            description: "The product you are looking for does not exist.",
        };
    }
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    let product;
    try {
        product = await getProduct(id);
    } catch (e) {
        notFound();
    }

    // JSON-LD for Single Product
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        image: product.image,
        description: product.description,
        sku: product.id.toString(),
        offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="min-h-screen bg-neutral-50 px-4 py-8 dark:bg-neutral-950 sm:py-12">
                <main className="mx-auto max-w-7xl">
                    <div className="mb-8">
                        <Link
                            href="/"
                            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                        >
                            ← Back to Products
                        </Link>
                    </div>

                    <article className="grid gap-8 overflow-hidden rounded-2xl bg-white p-6 shadow-sm dark:bg-neutral-900 lg:grid-cols-2 lg:p-12">
                        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white p-8">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-contain"
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>

                        <div className="flex flex-col justify-center">
                            <div className="mb-4">
                                <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                    {product.category}
                                </span>
                            </div>

                            <h1 className="mb-4 text-3xl font-bold leading-tight text-neutral-900 dark:text-white sm:text-4xl">
                                {product.title}
                            </h1>

                            <div className="mb-6 flex items-center gap-4">
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <span className="text-xl">★</span>
                                    <span className="font-semibold">{product.rating.rate}</span>
                                </div>
                                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                    ({product.rating.count} reviews)
                                </span>
                            </div>

                            <p className="mb-8 text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
                                {product.description}
                            </p>

                            <div className="mt-auto flex flex-col gap-4 sm:flex-row sm:items-center">
                                <span className="text-4xl font-bold text-neutral-900 dark:text-white">
                                    ${product.price.toFixed(2)}
                                </span>
                                <button className="flex-1 rounded-full bg-blue-600 px-8 py-4 text-center font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/30">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </article>
                </main>
            </div>
        </>
    );
}
