import { Metadata } from "next";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic"; // SSR: Rendered on every request

export const metadata: Metadata = {
	title: "Featured Products | Next.js SEO Masterclass",
	description: "Browse our collection of high-quality products. Optimized for SEO with SSR.",
};

export default async function Home() {
	const products = await getProducts();

	// JSON-LD for Product List
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		itemListElement: products.map((product, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: {
				"@type": "Product",
				name: product.title,
				description: product.description,
				image: product.image,
				offers: {
					"@type": "Offer",
					price: product.price,
					priceCurrency: "USD",
				},
			},
		})),
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<div className="flex min-h-screen flex-col bg-neutral-50 dark:bg-neutral-950">
				<header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/80 px-4 py-4 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/80">
					<div className="mx-auto flex max-w-7xl items-center justify-between">
						<h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-2xl">
							Next.js SEO Masterclass
						</h1>
						<nav>
							<ul className="flex gap-4 text-sm font-medium text-neutral-600 dark:text-neutral-400">
								<li>
									<a href="/" className="hover:text-neutral-900 dark:hover:text-white">
										Home
									</a>
								</li>
								<li>
									<a href="/products" className="hover:text-neutral-900 dark:hover:text-white">
										Products
									</a>
								</li>
								<li>
									<a href="/about" className="hover:text-neutral-900 dark:hover:text-white">
										About
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</header>

				<main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:py-12">
					<section aria-labelledby="products-heading">
						<div className="mb-8 text-center sm:text-left">
							<h2
								id="products-heading"
								className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl"
							>
								Featured Products
							</h2>
							<p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
								Check out our latest collection. This page is server-side rendered (SSR) for optimal
								performance and freshness.
							</p>
						</div>

						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{products.map((product, index) => (
								<ProductCard
									key={product.id}
									product={product}
									priority={index < 4}
								/>
							))}
						</div>
					</section>
				</main>

				<footer className="border-t border-neutral-200 bg-white py-8 dark:border-neutral-800 dark:bg-neutral-900">
					<div className="mx-auto max-w-7xl px-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
						<p>© 2024 Next.js SEO Masterclass. Built with Next.js, Tailwind CSS, and Love.</p>
					</div>
				</footer>
			</div>
		</>
	);
}
