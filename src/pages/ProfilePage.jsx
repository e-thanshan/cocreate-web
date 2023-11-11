import Navbar from "../components/Navbar"
import Pill from "../components/Pill"
import ProjectCard from "../components/ProjectCard"
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../firebase";
import { useEffect, useState } from "react";
const ProfilePage = () => {
    const [data, setData] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [projects, setProjects] = useState([]);
    const urlParams = new URLSearchParams(window.location.search);

    const fetchData = async () => {
        const docSnap = await getDoc(doc(db, "Users", urlParams.get("id")));
        let userData = docSnap.data();
        userData.id = docSnap.id;

        if (userData.languages) { 
            await userData.languages.forEach(async (language, i) => {
                await getDoc(doc(db, 'Languages', language._key.path.segments.at(-1))).then(res => {
                    // projectArray[i] = res.data();
                    setLanguages([...languages, {data: res.data(), id: res.id}]);
                })
                .catch(err => console.error(err));
            });
        }

        if (userData.Projects) { 
            await userData.Projects.forEach(async (project, i) => {
                await getDoc(doc(db, 'Projects', project._key.path.segments.at(-1))).then(res => {
                    // projectArray[i] = res.data();
                    setProjects([...projects, {data: res.data(), id: res.id}]);
                })
                .catch(err => console.error(err));
            });
        }
        
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
                    <div className="border-2 h-20 w-20 rounded-full overflow-hidden object-center">
                        <img src={data.profilePic} alt="" />
                    </div>
                    <div className="pl-2">
                        <p className="text-4xl">{data.Name}</p>
                        <p className="text-xl text-turq">@{data.username}</p>
                    </div>
                </div>
                
                <div className="pl-[5.5rem]">
                    <p>Bio:</p>
                    <p>{data.bio}</p>
                    <p className="pt-3 pb-1">Skills:</p>
                    <div className="flex gap-1.5">
                        {languages.map(language => {
                            return (
                                <div className="col-span-1">
                                    <Pill key={language.id} data={language.data.name} />
                                </div>
                            );
                        })}    
                    </div>
                </div>
                <p className="text-2xl py-8">Projects: </p>
                <div className="md:grid grid-cols-4">
                    {projects.map(project => {
                        return (
                            <div className="col-span-1">
                                <ProjectCard key={project.id} data={project.data} />
                            </div>
                        );
                    })}    
                </div>
            </div>

        </div>
    );
};

export default ProfilePage;