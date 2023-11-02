import Navbar from "../components/Navbar"
import ProjectCard from "../components/ProjectCard"
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import Pill from "../components/Pill"

const ExplorePage = () => {
    const [data, setData] = useState([]);
    const skills = ["Java", "C++", "C#"];
    const fetchProjects = async () => {
        await getDocs(collection(db, "Projects")).then((querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setData(newData);
            console.log(newData);
        })
    }

    useEffect(() => {
        fetchProjects();
    }, []);


    return (
        <div>
            <Navbar />
            <div className="px-20 font-mono max-w-8xl mx-auto">
                <div className="py-10">
                    <h1 className="text-7xl pt-20 ">Explore</h1>
                    <h1 className="text-xl pl-1.5">Discover what the world has to offer.</h1>
                </div>
                <div className="grid grid-cols-3">
                    <div className="col-span-1">
                        <div>
                            <div className="justify-between items-center flex border-2 w-5/6 h-10 rounded-lg">
                                <input type="text" className="w-full h-full pl-2"></input>
                                <div className="pr-2">
                                    <MagnifyingGlassIcon className='h-6 w-6' />
                                </div>
                            </div>
                            <div className="pt-5">
                                <div id="dropdownButton" data-dropdown-toggle="dropdown" className="group justify-between items-center flex border-2 w-5/6 h-10 rounded-lg">
                                    <div className="flex px-2">
                                        {skills.map((v, i) => {
                                            return (
                                                <Pill key={i} data={v} />
                                            );
                                        })}
                                    </div>
                                    <div className="pr-2">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.5 8.25L12 15.75L4.5 8.25" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <ul className="absolute hidden group-hover:block pt-40 w-[30%]">
                                        <li>
                                            <div className="justify-between items-center flex border-2 w-5/6 h-10 rounded-lg">
                                                <input type="text" className="w-full h-full pl-2"></input>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="justify-between items-center flex border-2 w-5/6 h-10 rounded-lg">
                                                <input type="text" className="w-full h-full pl-2"></input>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="justify-between items-center flex border-2 w-5/6 h-10 rounded-lg">
                                                <input type="text" className="w-full h-full pl-2"></input>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <h2 className="pt-32 text-lg">Topics</h2>

                            <div className="justify-between items-center flex border-2 w-5/6 h-10 rounded-lg">
                                <input type="text" className="w-full h-full pl-2" placeholder="Filter by topic..."></input>
                                <div className="pr-2">
                                    <PlusIcon className='h-6 w-6' />
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="justify-between items-center flex border-2 w-5/6 h-40 rounded-lg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 grid grid-cols-3 gap-3">
                        {data.map((v, i) => {
                            return (
                                <ProjectCard key={i} data={v} />
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ExplorePage;