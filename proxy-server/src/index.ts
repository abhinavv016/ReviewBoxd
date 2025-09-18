import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config({ path: ".env" });

const app = express();

// Enable CORS (adjust origin in production)
app.use(cors());

const TMDB_BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

if (!TMDB_BEARER_TOKEN) {
    throw new Error("❌ TMDB_BEARER_TOKEN is missing in .env");
}

const axiosInstance = axios.create({
    baseURL: TMDB_BASE_URL,
    headers: { Authorization: `Bearer ${TMDB_BEARER_TOKEN}` },
});

// ---------------- Routes ---------------- //

// Get popular movies
app.get("/movies/popular", async (_req: Request, res: Response) => {
    try {
        const { data } = await axiosInstance.get("/movie/popular", {
            params: { language: "en-US", page: 1 },
        });
        res.json(data);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch popular movies" });
    }
});

// Get popular series
app.get("/tv/popular", async (_req: Request, res: Response) => {
    try {
        const { data } = await axiosInstance.get("/tv/popular", {
            params: { language: "en-US", page: 1 },
        });
        res.json(data);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch popular TV shows" });
    }
});

// Search combined movies and series
app.get("/search", async (req: Request, res: Response) => {
    const query = req.query.query as string;
    if (!query) {
        return res.status(400).json({ error: "Query is required" });
    }

    try {
        const { data } = await axiosInstance.get("/search/multi", {
            params: { query, language: "en-US" },
        });
        res.json({ content: data.results });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Failed to search TMDB" });
    }
});

// Fetch movies/series details + credits
app.get("/:media_type/:id", async (req: Request, res: Response) => {
    const { media_type, id } = req.params;

    try {
        const [details, crew] = await Promise.all([
            axiosInstance.get(`/${media_type}/${id}`, { params: { language: "en-US" } }),
            axiosInstance.get(`/${media_type}/${id}/credits`, { params: { language: "en-US" } }),
        ]);

        res.json({
            details: details.data,
            crew: crew.data,
        });
    } catch (error: any) {
        console.error(
            "Failed fetching content:",
            error.response?.status,
            error.response?.data || error.message
        );
        res.status(500).json({ error: "Failed to fetch content" });
    }
});

// Get posters for background
app.get("/posters", async (_req: Request, res: Response) => {
    try {
        const { data } = await axiosInstance.get("/movie/top_rated", {
            params: { page: 1 },
        });

        const posters = data.results.map(
            (movie: { poster_path: string }) => `${IMAGE_BASE}${movie.poster_path}`
        );

        res.json(posters);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch the posters" });
    }
});

// ---------------- Start Server ---------------- //
const PORT = process.env.PORT_SERVER || 3001;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});