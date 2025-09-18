import fetchComp from "./fetchComp";

export default async function Crew({ params }: { params: { media_type: string; id: string } }) {
    const result = await fetchComp(params)
    const crew = result.data.crew.crew

    const directors = crew
        ?.filter((person: { job: string; }) => person.job === "Director")
        .map((person: { name: any; }) => person.name)
        .join(", ");

    const topCrew = crew
        .sort((a: any, b: any) => b.popularity - a.popularity)
        .map((actor: { name: any; }) => actor.name)
        .filter((name: string, index: number, self: string[]) => self.indexOf(name) === index);


    return { directors, topCrew }
}


