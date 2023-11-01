import Navbar from "../components/Navbar"
import ProjectCard from "../components/ProjectCard"
import Filter from "../components/Filter"

const ExplorePage = () => {
    const data = [
        {name: "Project1", description: "lorem ipsum"},
        {name: "Project2", description: "lorem ipsum"},
        {name: "Project3", description: "lorem ipsum"},
        {name: "Project4", description: "lorem ipsum"},
        {name: "Project5", description: "lorem ipsum"}
    ];

    return (
        <div>
            <Navbar />
            <div className="px-20 font-mono max-w-8xl mx-auto">
                <div className="py-10">
                    <h1 className="text-7xl pt-20 ">Explore</h1>
                    <h1 className="text-xl pl-1.5">Discover what the world has to offer.</h1>
                </div>
                <div className="grid grid-cols-3">
                    <div className="col-span-1"><Filter/></div>
                    <div className="col-span-2 grid grid-cols-3 gap-3">
                        {data.map(v => {
                            return (
                                <ProjectCard data={v}/>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ExplorePage;