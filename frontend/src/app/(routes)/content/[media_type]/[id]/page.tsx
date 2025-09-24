import Cast from "@/components/contentPageComp/castComp";
import Crew from "@/components/contentPageComp/crewComp";
import Details from "@/components/contentPageComp/detailsComp";
import fetchComp from "@/lib/fetchDetails";

import Tabs from "@/components/contentPageComp/tabsComp";
import Navbar from "@/components/navbar";
import WatchedMovie from "@/components/watchedComponent/watchMovie";
import WatchedSeries from "@/components/watchedComponent/watchSeries";

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
    const genres = details.genres;
    const networks = result.data.details?.networks?.[0]?.name || null;

    const content = result.data.details;

    return (
        <div className="relative w-full min-h-screen bg-black text-white overflow-x-hidden">
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${content.backdrop_path})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(40px) brightness(0.6)",
                    }}
                />

                <div className="absolute inset-0 flex justify-center items-start pt-20">
                    <img
                        src={`https://image.tmdb.org/t/p/original${content.backdrop_path}`}
                        className="w-[90%] max-h-[48rem] object-cover rounded-xl shadow-lg"
                    />
                </div>

                <div className="absolute inset-0 bg-black/50" />

                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(to right, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 20%), " +
                            "linear-gradient(to left, rgba(0,0,0,1) 5%, rgba(0,0,0,0) 20%), " +
                            "linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 70%)",
                    }}
                />

            </div>

            <div className="relative z-10 px-10">
                <Navbar />
                <div className="flex mt-40 gap-10 max-w-6xl mx-auto">
                    <div className="w-70 h-100 border-2 border-slate-500 rounded-md flex-shrink-0">
                        <img
                            src={`https://image.tmdb.org/t/p/original${content.poster_path}`}
                            className="w-full h-full object-cover rounded-md"
                        />
                    </div>

                    <div className="flex flex-col w-[550px]">
                        <span className="font-extrabold text-4xl">
                            {content.name || content.title}
                        </span>

                        <div className="flex items-center gap-4 text-xl mt-2">
                            <span>
                                {(content.release_date || content.first_air_date)?.slice(0, 4)}
                            </span>

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
                                <WatchedMovie />
                            ) : (
                                <WatchedSeries
                                    id={params.id}
                                    media_type={params.media_type}
                                />
                            )}
                        </div>

                        {content.tagline && (
                            <div className="mt-4 text-lg italic">
                                <center>{content.tagline}</center>
                            </div>
                        )}

                        <p className="mt-4">{content.overview}</p>

                        <div className="mt-6">
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
            <div className=" relative text-white">
                jkadsfhjkdsahkjfjk
            </div>
        </div>
    );
}