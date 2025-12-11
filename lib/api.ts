import { Product } from "./types";

// ... (imports)

const API_URL = "https://dummyjson.com";

export async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch(`${API_URL}/products?limit=20`, {
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            console.warn(`[getProducts] Failed to fetch products: ${res.status} ${res.statusText}`);
            return [];
        }

        const data = await res.json();

        // Map DummyJSON structure to our Product interface
        return data.products.map((p: any) => ({
            id: p.id,
            title: p.title,
            price: p.price,
            description: p.description,
            category: p.category,
            image: p.thumbnail, // Use thumbnail as the main image
            rating: {
                rate: p.rating || 0,
                count: p.reviews ? p.reviews.length : 0
            }
        }));
    } catch (error) {
        console.error("[getProducts] Error:", error);
        return [];
    }
}

export async function getProduct(id: string): Promise<Product> {
    try {
        const res = await fetch(`${API_URL}/products/${id}`, {
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch product ${id}: ${res.status} ${res.statusText}`);
        }

        const p = await res.json();

        return {
            id: p.id,
            title: p.title,
            price: p.price,
            description: p.description,
            category: p.category,
            image: p.thumbnail,
            rating: {
                // DummyJSON returns a sinlge number for rating, we map it to our structure
                rate: p.rating || 0,
                count: p.reviews ? p.reviews.length : 0
            }
        };
    } catch (error) {
        console.error(`[getProduct] Error fetching id ${id}:`, error);
        throw error;
    }
}
