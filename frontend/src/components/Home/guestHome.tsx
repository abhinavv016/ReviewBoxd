import axios from "axios";
import Collect from "../detailsCard/cardCollect";
import HomeClient from "../homePage/HomeClient";
import { getRecentReviews } from "@/lib/recentReviews";

interface MediaProps {
    id: number;
    title: string;
    name?: string;
    poster_path: string | null;
    backdrop_path: string | null;
    media_type: string;
}

export default async function GuestHome() {
    const moviesRes = await axios.get<MediaProps[]>("http://localhost:4000/movies/popular");
    const tvRes = await axios.get<MediaProps[]>("http://localhost:4000/tv/popular");

    const movies = moviesRes.data.slice(0, 6);
    const tv = tvRes.data.slice(0, 6);
    const recentReviews = await getRecentReviews();
    return (
        <div>
            <HomeClient movies={movies} tv={tv} />
            <Collect />
            <div className="flex flex-col mt-10 px-4 md:px-20 lg:px-40">
                <div className="mt-10 text-[#8898A9] text-base font-medium">
                    JUST REVIEWED
                </div>
                <div className="h-px w-full max-w-6xl bg-[#99A9BB] mt-1 mx-auto"></div>
                <div className="flex justify-center">

                    <div className="flex flex-row gap-4 md:gap-5 py-4 max-w-6xl overflow-x-auto md:overflow-visible px-4 md:px-0">
                        {recentReviews.map((item) => (
                            <div key={item.id} className="w-[150px] h-[230px] rounded-md border-2 hover:border-[#04AB1D] overflow-hidden bg-slate-700 cursor-pointer">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${item.media.posterPath}`}
                                    alt={item.media.title}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center mt-20 text-white">
                    <p className="text-3xl">
                        Write and share reviews. Compile your own lists. Share your life in film/series.
                    </p>
                    <p className="flex">
                        Sign up to create your own.
                    </p>
                </div>
            </div>
        </div>
    )
}