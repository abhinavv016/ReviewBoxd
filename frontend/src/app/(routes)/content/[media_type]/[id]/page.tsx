import Cast from "@/components/contentPageComp/castComp";
import Crew from "@/components/contentPageComp/crewComp";
import Details from "@/components/contentPageComp/detailsComp";
import fetchComp from "@/components/contentPageComp/fetchComp";
import Navbar from "@/components/navbar";
import Tabs from "@/components/contentPageComp/tabsComp";
import WatchedMovie from "@/components/watchedComponent/watchMovie";

export default async function ContentPage({
    params,
}: {
    params: { media_type: string; id: string };
}) {
    const result = await fetchComp(params);

    const cast = await Cast({ params });
    const crewDetails = await Crew({ params });
    const details = await Details({ params });

    const directors = crewDetails.directors;
    const topCrew = crewDetails.topCrew;

    const studio = details.studio;
    const country = details.country;
    const spoken_language = details.spoken_language;
    const genres = details.genres

    const content = result.data.details;


    return (
        <>
            <div className="text-white relative">

                {/* content background_poster */}
                <div>
                    <img
                        src={`https://image.tmdb.org/t/p/original${content.backdrop_path}`}
                        className="absolute h-195 w-full z-0"
                    />
                    <div
                        className="absolute h-195 w-full z-10 backdrop-opacity-80"
                        style={{
                            background:
                                'linear-gradient(to top, rgba(0, 0, 0, 1) 5%, rgba(0, 0, 0, 0) 90%), ' +
                                'linear-gradient(to right, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 20%), ' +
                                'linear-gradient(to left, rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 0) 20%)',
                        }}
                    />
                </div>

                {/* Navbar */}
                <div className="relative z-20">
                    <Navbar />
                </div>

                {/* Content poster */}
                <div className="flex relative z-30 mt-[35rem]">
                    <div className="absolute top-0 left-30 w-70 border-2 border-slate-500 rounded-md">
                        <img
                            src={`https://image.tmdb.org/t/p/original${content.poster_path}`}
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>

                    <div className="flex items-center ml-120 mt-40 text-white">
                        <div className="flex flex-col items-start ">

                            <div className="flex items-center gap-4">
                                {/* title of the content */}
                                <span className="font-extrabold text-4xl">
                                    {content.name || content.title}
                                </span>

                                {/* first air or release data */}
                                <span className="text-2xl mt-2">
                                    {(content.release_date || content.first_air_date)?.slice(0, 4)}
                                </span>

                                {/* directors name */}
                                <span className="text-2xl mt-2">
                                    <strong>Directed by</strong> {directors || "N/A"}
                                </span>
                            </div>

                            {/* tagline of movie */}
                            <div className="mt-8 w-140 text-center">
                                <b><i>{content.tagline}</i></b>
                            </div>

                            {/* overview of movie */}
                            <div className="mt-2 w-140 ">
                                <p>{content.overview}</p>
                            </div>

                            <div className="flex gap-5 ">
                                <Tabs
                                    cast={cast ?? []}
                                    crew={topCrew ?? []}
                                    details={{
                                        studio: studio ?? [],
                                        country: country ?? [],
                                        spoken_language: spoken_language ?? [],
                                        genres: genres ?? [],
                                    }}
                                />
                                {directors && <WatchedMovie/> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
