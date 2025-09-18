import Navbar from "@/components/navbar";

export default function Welcome() {
    return <div>
        <Navbar />
        <div className="text-[50px] mt-[30rem] text-white font-[700] text-center text-lg/[48px] ">
            <h2>
                Take your first step into <br />
                a larger world...
            </h2>
        </div>
        <div className="flex items-center justify-center w-[760px] h-[147px] mx-auto text-center text-lg text-white">
                We’re your home for logging, rating and reviewing films, your watchlist of titles to see, your source for lists and inspiration, a cast and crew database and an activity stream of passionate film criticism, discussion and discovery.
        </div>
        <div className="flex items-center justify-center w-[760px] mx-auto text-3xl text-white">
            <h2>
                How Reviewboxd works
            </h2>
        </div> 
        {/* incomplete page */}

    </div>
}