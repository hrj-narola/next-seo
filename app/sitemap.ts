import { MetadataRoute } from "next";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/types";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	let products: Product[] = [];
	try {
		products = await getProducts();
	} catch (error) {
		console.error("Failed to fetch products for sitemap:", error);
	}

	const productUrls = products.map((product) => ({
		url: `${BASE_URL}/products/${product.id}`,
		lastModified: new Date(),
		changeFrequency: "weekly" as const,
		priority: 0.8,
	}));

	return [
		{
			url: BASE_URL,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		...productUrls,
	];
}
