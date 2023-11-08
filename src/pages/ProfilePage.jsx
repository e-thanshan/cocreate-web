import Navbar from "../components/Navbar"
import Pill from "../components/Pill"
import ProjectCard from "../components/ProjectCard"
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../firebase";
import { useEffect, useState } from "react";
const ProfilePage = () => {
    const [data, setData] = useState([]);
    const urlParams = new URLSearchParams(window.location.search);
    const fetchData = async () => {
        const docSnap = await getDoc(doc(db, "Users", urlParams.get("id")));
        let userData = docSnap.data();
        userData.id = docSnap.id;

        const projectArray = [1];
        if (userData.Projects) { 
            userData.Projects.forEach(async (project, i) => {
                await getDoc(doc(db, 'Projects', project._key.path.segments.at(-1))).then(res => {
                    // projectArray[i] = res.data();
                    projectArray[i] = { ...res.data(), id: res.id };
                })
                .catch(err => console.error(err));
            });
            userData.Projects = projectArray;
        }
        
        console.log(userData);

        setData(userData);
    }
    

    useEffect(() => {
        fetchData();
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
                    </div>
                </div>
                <p className="text-2xl py-8">Projects: </p>
                <div className="grid grid-cols-4">
                    {data.Projects && data.Projects?.map(project => {
                        return (
                            <div className="col-span-1">
                                <ProjectCard key={project.id} data={project} />
                            </div>
                        );
                    })}    
                </div>
            </div>

        </div>
    );
};

export default ProfilePage;