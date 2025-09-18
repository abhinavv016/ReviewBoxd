import fetchComp from "./fetchComp";

export default async function Details({ params }: { params: { media_type: string; id: string } }) {
    const result = await fetchComp(params)
    const studio = result.data.details.production_companies?.map((c: any) => c.name) || [];
    const country = result.data.details.production_countries?.map((c: any) => c.name) || [];
    const spoken_language = result.data.details.spoken_languages?.map((l: any) => l.english_name) || [];
    const genres = result.data.details.genres?.map((g: any) => g.name) || [];
    
    
    return { studio, country, spoken_language, genres }
}


