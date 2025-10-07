import axios from "axios";

export interface Content {
    id: number;
    title: string;
    release_date: string;
    poster_path: string | null;
    popularity: number;
    overview: string;
}

export async function fetchContent(query: string): Promise<Content[]> {
    try {
        const res = await axios.get<Content[]>("http://localhost:4000/search", {
            params: { q: query },
        });
        return res.data;
    } catch (err) {
        console.error("Error fetching movies:", err);
        throw new Error("Failed to fetch movies");
    }
}
