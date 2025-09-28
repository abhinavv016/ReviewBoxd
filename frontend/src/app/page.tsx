import Collect from "@/components/detailsCard/cardCollect";
import HomeClient from "@/components/homePage/HomeClient";
import Navbar from "@/components/homePage/Navbar";
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

    const movies = moviesRes.data.slice(0, 6);
    const tv = tvRes.data.slice(0, 6);

    return (
        <div>
            <Navbar />
            <HomeClient movies={movies} tv={tv} />
            <Collect />
        </div>
    );
}