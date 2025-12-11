import { Product } from "./types";

// ... (imports)

const API_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch(`${API_URL}/products`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Accept": "application/json"
            }
        });
        if (!res.ok) {
            console.warn(`[getProducts] Failed to fetch products: ${res.status} ${res.statusText}`);
            return [];
        }
        return res.json();
    } catch (error) {
        console.error("[getProducts] Error:", error);
        return [];
    }
}

export async function getProduct(id: string): Promise<Product> {
    try {
        const res = await fetch(`${API_URL}/products/${id}`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Accept": "application/json"
            }
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch product ${id}: ${res.status} ${res.statusText}`);
        }
        return res.json();
    } catch (error) {
        console.error(`[getProduct] Error fetching id ${id}:`, error);
        throw error;
    }
}
