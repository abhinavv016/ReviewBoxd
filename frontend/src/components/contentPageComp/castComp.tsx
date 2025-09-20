import fetchComp from "../../lib/fetchDetails";

export default async function Cast({ params }: { params: { media_type: string; id: string } }) {
    const result = await fetchComp(params)
    const cast = result.data.crew.cast

    const topCast = cast
        .map((actor: { name: any; }) => actor.name)

    return topCast
}