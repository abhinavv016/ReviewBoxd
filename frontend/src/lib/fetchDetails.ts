import axios, { AxiosResponse } from "axios";


interface FetchParams {
    media_type: string
    id: string
}

export default async function FetchComp({media_type, id}: FetchParams): Promise<AxiosResponse>{
    
    const result = await axios.get(`http://localhost:4000/content/${media_type}/${id}`);
    return result;
}