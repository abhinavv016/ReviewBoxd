import Collect from "@/components/cardComp/cardCollect";
import HomeClient from "@/components/fetchCardComp/HomeClient";
import Navbar from "@/components/navbar";
import axios from "axios";

interface MediaProps {
    id: number;
    title: string;
    name?: string;
    poster_path: string | null;
    backdrop_path: string | null;
    media_type: string;
}

export default async function Home() {
  
    const moviesRes = await axios.get<MediaProps[]>("http://localhost:4000/movies/popular");
    const tvRes = await axios.get<MediaProps[]>("http://localhost:4000/tv/popular");

    const movies = moviesRes.data.slice(0, 5);
    const tv = tvRes.data.slice(0, 5);

    return (
        <div>
            <Navbar />

            <HomeClient movies={movies} tv={tv} />
            <Collect />
        </div>
    );
}