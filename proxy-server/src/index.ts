import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config({ path: ".env" });

const app = express();
app.use(cors());

const TMDB_BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

if (!TMDB_BEARER_TOKEN) {
    throw new Error("❌ TMDB_BEARER_TOKEN is missing in .env");
}

// ---------------- Routes ---------------- //

app.get("/movies/popular", async (_req: Request, res: Response) => {
    try {
        const { data } = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
            headers: { Authorization: `Bearer ${TMDB_BEARER_TOKEN}` },
        });
        res.json(data);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch popular movies" });
    }
});

app.get("/tv/popular", async (_req: Request, res: Response) => {
    try {
        const { data } = await axios.get(`${TMDB_BASE_URL}/tv/popular`, {
            headers: { Authorization: `Bearer ${TMDB_BEARER_TOKEN}` },
        });
        res.json(data);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch popular TV shows" });
    }
});

app.get("/search", async (req: Request, res: Response) => {
    const query = req.query.query as string;
    if (!query) return res.status(400).json({ error: "Query is required" });

    try {
        const { data } = await axios.get(`${TMDB_BASE_URL}/search/multi`, {
            headers: { Authorization: `Bearer ${TMDB_BEARER_TOKEN}` },
            params: { query },
        });
        res.json({ content: data.results });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Failed to search TMDB" });
    }
});

app.get("/:media_type/:id", async (req: Request, res: Response) => {
    const { media_type, id } = req.params;

    try {
        const [details, crew] = await Promise.all([
            axios.get(`${TMDB_BASE_URL}/${media_type}/${id}`, { headers: { Authorization: `Bearer ${TMDB_BEARER_TOKEN}` } }),
            axios.get(`${TMDB_BASE_URL}/${media_type}/${id}/credits`, { headers: { Authorization: `Bearer ${TMDB_BEARER_TOKEN}` } }),
        ]);

        res.json({
            details: details.data,
            crew: crew.data,
        });
    } catch (error: any) {
        console.error("Failed fetching content:", error.response?.status, error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch content" });
    }
});

app.get("/tv/:id/season/:season", async (req: Request, res: Response) => {
    const { id, season } = req.params;
    try{
        const response = await axios.get(`${TMDB_BASE_URL}/tv/${id}/season/${season}`, { 
            headers: { 
                Authorization: `Bearer ${TMDB_BEARER_TOKEN}` 
            } 
        })
        res.json(response.data)
    }catch(error: any){
        console.error("Failed fetching Seasons:", error.response?.status, error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch Seasons" });
    }
})

app.get("/posters", async (req: Request, res: Response) => {

    try {
        const pageRequests = Array.from({length: 10}, (_, i) => 
            axios.get(`${TMDB_BASE_URL}/movie/top_rated?page=${i + 1}`, {
            headers: { Authorization: `Bearer ${TMDB_BEARER_TOKEN}` },
        })
    )
        const response = await Promise.all(pageRequests)

        const posters = response.flatMap(response => 
            response.data.results.map(
                (movie: { poster_path: string }) => `${IMAGE_BASE}${movie.poster_path}`
            )
        )
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