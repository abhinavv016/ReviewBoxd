import Link from "next/link";


export default function Films() {
    return (<>
        <div className="flex justify-between px-42 mt-10 text-white font-medium text-xl">
            <div>Films</div>
            <Link 
                href={"/films/page/1"}
                className="font-light text-base">more</Link>
        </div>
        <div className="flex justify-center mt-1">
            <div className="h-px w-[70rem] bg-[#99A9BB]"></div>
        </div>
    </>)
}