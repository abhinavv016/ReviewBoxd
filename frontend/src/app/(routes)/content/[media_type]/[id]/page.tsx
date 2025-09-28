import Cast from "@/components/contentPage/castComp";
import Crew from "@/components/contentPage/crewComp";
import Details from "@/components/contentPage/detailsComp";
import fetchComp from "@/lib/fetchDetails";

import Tabs from "@/components/contentPage/tabsComp";
import Navbar from "@/components/homePage/Navbar";
import WatchedMovie from "@/components/activity/watchMovie";
import WatchedSeries from "@/components/activity/watchSeries";

export default async function ContentPage({
    params,
}: {
    params: Promise<{ media_type: string; id: string }>;
}) {
    const { media_type, id } = await params;

    const result = await fetchComp({ media_type, id });
    const cast = await Cast({ params: { media_type, id } });
    const crewDetails = await Crew({ params: { media_type, id } });
    const details = await Details({ params: { media_type, id } });

    const directors = crewDetails.directors;
    const topCrew = crewDetails.topCrew;

    const studio = details.studio;
    const country = details.country;
    const spoken_language = details.spoken_language;
    const genres = details.genres;
    const networks = result.data.details?.networks?.[0]?.name || null;

    const content = result.data.details;

    return (
        <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden">
            {/* BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-x-0 top-0 h-80 md:h-full" // mobile height smaller
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${content.backdrop_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(40px) brightness(0.6)",
                    }}
                />

                {/* Main poster image */}
                <div className="absolute inset-0 flex justify-center items-start pt-20">
                    <img
                        src={`https://image.tmdb.org/t/p/original${content.backdrop_path}`}
                        className="w-full sm:w-[90%] md:w-[90%] h-auto max-h-80 md:max-h-[48rem] object-cover rounded-xl shadow-lg"
                    />
                </div>


                <div className="absolute inset-0 bg-black/50" />

                <div
                    className="hidden md:block absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to right, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 20%), " +
                            "linear-gradient(to left, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 20%), " +
                            "linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 70%)",
                    }}
                />
                <div
                    className="md:hidden absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to right, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 20%), " +
                            "linear-gradient(to left, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 20%), " +
                            "linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)",
                    }}
                />
            </div>

            {/* CONTENT */}
            <div className="relative z-10 px-4 md:px-10">
                <Navbar />

                <div className="flex flex-wrap md:flex-nowrap mt-20 md:mt-40 gap-6 md:gap-6 max-w-6xl mx-auto">
                    {/* POSTER */}
                    <div className="mx-auto md:mx-0 w-45 md:w-65 h-70 md:h-[25rem] border-2 border-slate-500 rounded-md flex-shrink-0">
                        <img
                            src={`https://image.tmdb.org/t/p/original${content.poster_path}`}
                            className="w-full h-full object-cover rounded-md shadow-lg"
                        />
                    </div>

                    {/* DETAILS */}
                    <div className="flex flex-col w-full md:w-[550px] mt-15 md:mt-0">
                        <span className="font-extrabold text-xl md:text-4xl">
                            {content.name || content.title}
                        </span>

                        <div className="flex flex-wrap items-center gap-4 text-sm md:text-xl mt-2">
                            <span>{(content.release_date || content.first_air_date)?.slice(0, 4)}</span>

                            {directors && (
                                <span>
                                    <strong>Directed by</strong> {directors}
                                </span>
                            )}

                            {networks && (
                                <span>
                                    <strong>Produced by</strong> {networks}
                                </span>
                            )}

                            {directors ? (
                                <WatchedMovie
                                    media={{
                                        id: content.id,
                                        title: content.title || content.name,
                                        poster_path: content.poster_path,
                                        media_type: media_type,
                                    }}
                                />
                            ) : (
                                <WatchedSeries
                                    media={{
                                        id: id,
                                        title: content.title || content.name,
                                        poster_path: content.poster_path,
                                        media_type: media_type,
                                    }}
                                />
                            )}
                        </div>

                        {content.tagline && (
                            <div className="mt-3 md:mt-4 text-sm md:text-lg italic text-center">{content.tagline}</div>
                        )}

                        <p className="mt-1 md:mt-0 text-sm md:text-lg text-center">{content.overview}</p>

                        <div>
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
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative text-white mt-10">jkadsfhjkdsahkjfjk</div>
        </div>
    );
}