import { MetadataRoute } from "next";
import { getProducts } from "@/lib/api";

const BASE_URL = "http://localhost:3001";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const products = await getProducts();

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
