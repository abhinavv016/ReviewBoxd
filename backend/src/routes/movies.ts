import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();
const api_key = process.env.TMDB_API_KEY;

const PROXY_BASE_URL = "http://localhost:3001";

router.get("/movies/popular", async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`${PROXY_BASE_URL}/movies/popular`);
        const results =
            response.data.results?.map((movie: any) => ({
                id: movie.id,
                title: movie.title,
                release_date: movie.release_date,
                poster_path: movie.poster_path
                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                    : null,
            })) || [];
        res.json(results.slice(0, 5));
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error in fetching the content",
        });
    }
});

router.get("/tv/popular", async (req: Request, res: Response) => {
    try {
        const response = await axios.get(`${PROXY_BASE_URL}/tv/popular`);
        const results =
            response.data.results?.map((tv: any) => ({
                id: tv.id,
                name: tv.name,
                release_date: tv.release_date,
                poster_path: tv.poster_path
                    ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
                    : null,
            })) || [];
        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Error in fetching the content",
        });
    }
});

router.get("/search", async (req: Request, res: Response) => {
    const query = req.query.q as string;

    if (!query) {
        return res.status(400).json({ error: "Query is required!!" });
    }
    try {
        const response = await axios.get(`${PROXY_BASE_URL}/search`, {
            params: { query },
        });
        const { content } = response.data;

        const results = content.map((item: any) => ({
            id: item.id,
            title: item.title || item.name,
            release_date: item.release_date || item.first_air_date,
            overview: item.overview,
            popularity: item.popularity,
            media_type: item.media_type,
            poster_path: item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : null,
        }));

        res.json(results);
    } catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ error: "Something went wrong while fetching movies" });
    }
});

router.get("/content/:media_type/:id", async (req, res) => {
    const { media_type, id } = req.params;

    if (!["movie", "tv"].includes(media_type)) {
        return res.status(400).json({ error: "Invalid media_type" });
    }

    try {
        const response = await axios.get(`${PROXY_BASE_URL}/${media_type}/${id}`);
        const{details, crew} = response.data
        res.json({
            details,
            crew
        });
    } catch (err: any) {
        console.error(
            "Failed fetching content:",
            err.response?.status,
            err.response?.data
        );
        res.status(500).json({ error: "Failed to fetch content" });
    }
});

router.get("/content/tv/:id/season/:season", async(req: Request, res: Response) => {
    const{ id, season } = req.params;

    try {
        const response = await axios.get(`${PROXY_BASE_URL}/tv/${id}/season/${season}`);
        const Seasons = response.data
        res.json({
            Seasons
        });
    } catch (err: any) {
        console.error(
            "Failed fetching content:",
            err.response?.status,
            err.response?.data
        );
        res.status(500).json({ error: "Failed to fetch content" });
    }
})

router.get("/content/:media_type/:id/keywords", async (req, res) =>{
    const {media_type, id } = req.params;
    if (!["movie", "tv"].includes(media_type)) {
        return res.status(400).json({ error: "Invalid media_type" });
    }
    try {
        const response = await axios.get(`${PROXY_BASE_URL}/${media_type}/${id}/keywords`);
        res.json(response.data);
    }catch(err){
        res.status(500).json({ error: "Failed to fetch keywords" });
    }
})

router.get("/posters", async (req, res) => {
  try {
    const { data } = await axios.get(`${PROXY_BASE_URL}/posters`);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posters from proxy" });
  }
});
export default router;
