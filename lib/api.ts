import { Product } from "./types";

const API_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
    const res = await fetch(`${API_URL}/products`, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }
    return res.json();
}

export async function getProduct(id: string): Promise<Product> {
    const res = await fetch(`${API_URL}/products/${id}`, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch product ${id}: ${res.status} ${res.statusText}`);
    }
    return res.json();
}
