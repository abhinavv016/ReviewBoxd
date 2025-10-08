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
    try {
        const response = await axios.get(`${TMDB_BASE_URL}/tv/${id}/season/${season}`, {
            headers: {
                Authorization: `Bearer ${TMDB_BEARER_TOKEN}`
            }
        })
        res.json(response.data)
    } catch (error: any) {
        console.error("Failed fetching Seasons:", error.response?.status, error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch Seasons" });
    }
})

app.get("/posters", async (req: Request, res: Response) => {

    try {
        const pageRequests = Array.from({ length: 10 }, (_, i) =>
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

app.get("/films/page/:page", async (req: Request, res: Response) => {
    const page = parseInt(req.params.page!, 10) || 1;
    const tmdbPagesPerRequest = 5;
    const startTmdbPage = (page - 1) * tmdbPagesPerRequest + 1;

    try {
        const pageRequests = Array.from({ length: tmdbPagesPerRequest }, (_, i) =>
            axios.get(`${TMDB_BASE_URL}/discover/movie`, {
                headers: { Authorization: `Bearer ${TMDB_BEARER_TOKEN}` },
                params: { 
                    page: startTmdbPage + i,
                    include_adult: false,
                    sort_by: "vote_count.desc",
                    language: "en-US"
                },
                
            })
        );

        const responses = await Promise.all(pageRequests);
        const movies = responses.flatMap((response) => response.data.results);
        const uniqueMovies = Array.from(new Map(movies.map(m => [m.id, m])).values());
        res.json({
            currentPage: page,
            fetchedTmdbPages: `${startTmdbPage}–${startTmdbPage + tmdbPagesPerRequest - 1}`,
            totalMovies: movies.length,
            movies:uniqueMovies
        });
    } catch (error: any) {
        console.error("Failed to fetch movies from TMDB:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch movies from TMDB" });
    }
});

app.get("/shows/page/:page", async (req: Request, res: Response) => {
    const page = parseInt(req.params.page!, 10) || 1;
    const tmdbPagesPerRequest = 5;
    const startTmdbPage = (page - 1) * tmdbPagesPerRequest + 1;

    try {
        const pageRequests = Array.from({ length: tmdbPagesPerRequest }, (_, i) =>
            axios.get(`${TMDB_BASE_URL}/discover/tv`, {
                headers: { Authorization: `Bearer ${TMDB_BEARER_TOKEN}` },
                params: { 
                    page: startTmdbPage + i,
                    include_adult: false,
                    sort_by: "vote_count.desc",
                    language: "en-US"
                },
                
            })
        );

        const responses = await Promise.all(pageRequests);
        const shows = responses.flatMap((response) => response.data.results);
        const uniqueShows = Array.from(new Map(shows.map(m => [m.id, m])).values());
        res.json({
            currentPage: page,
            fetchedTmdbPages: `${startTmdbPage}–${startTmdbPage + tmdbPagesPerRequest - 1}`,
            totalShows: shows.length,
            shows:uniqueShows
        });
    } catch (error: any) {
        console.error("Failed to fetch shows from TMDB:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch shows from TMDB" });
    }
});


// ---------------- Start Server ---------------- //
const PORT = process.env.PORT_SERVER || 3001;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});