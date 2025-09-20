import axios, { AxiosResponse } from "axios";

interface FetchParams {
    id: string
    season: number
}

export default async function FetchSeasons({ id, season }: FetchParams): Promise<AxiosResponse>{
    
    const result = await axios.get(`http://localhost:4000/content/tv/${id}/season/${season}`);
    return result;
}