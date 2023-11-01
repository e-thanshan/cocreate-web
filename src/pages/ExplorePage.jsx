import Navbar from "../components/Navbar"
import ProjectCard from "../components/ProjectCard"

const ExplorePage = () => {
    return (
        <div>
            <Navbar />
            <div className="px-20 font-mono">
            <h1 className="text-5xl pt-20 ">Explore</h1>
            <h1 className="text-2xl">Discover what the world has to offer.</h1>
            <div className="grid grid-cols-3 gap-3">
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
            </div>
            
            </div>
        </div>
    );
}

export default ExplorePage;