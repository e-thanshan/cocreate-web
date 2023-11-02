import Navbar from "../components/Navbar"
import Pill from "../components/Pill"
import ProjectCard from "../components/ProjectCard"
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../firebase";
import { useEffect, useState } from "react";
const ProfilePage = () => {
    const skills = ["Java", "C++", "C#"];
    const [data, setData] = useState([]);
    // const fetchProjects = async () => {
    //     const docSnap = await getDoc(doc(db, "Users", urlParams.get("id"))).then(doc => {
    //         let projectData = doc.data();
    //         if(projectData.Projects){
    //             let temp = [];
    //             projectData.Projects.forEach(temp.push);
    //             projectData.Projects = temp;
    //         }
    //         projectData.id = doc.id;
    //         if (newItem.creator) {
    //             newItem.creator.
    //         }
    //     });
    // }

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="pt-32 p-6">
                <div className="flex items-center">
                    <div className=" bg-gray-500 border-2 h-20 w-20 rounded-full">
                    </div>
                    <div className="pl-2">
                        <p className="text-4xl">John Doe</p>
                        <p className="text-xl">@exampleUser123</p>
                    </div>
                </div>
                
                <div className="pl-[5.5rem]">
                    <p>Bio:</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam nulla explicabo deleniti molestias provident est reiciendis velit voluptate nam esse quo dicta, sequi odit, harum quia consequuntur quae tenetur aperiam.</p>
                    <p className="pt-3">Skills:</p>
                    <div className="flex gap-1.5">
                        {data.Languages.map((v, i) => {
                            return (
                                <Pill key={i} data={v} />
                            );
                        })}
                    </div>
                </div>
                <p className="text-2xl py-8">Projects: </p>
                <div className="grid grid-cols-4">
                    {data.map((v, i) => {
                                return (
                                    <ProjectCard key={i} data={v}/>
                                );
                            })}
                    </div>
            </div>

        </div>
    );
};

export default ProfilePage;