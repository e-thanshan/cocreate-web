import { useEffect, useState } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../firebase";
import Pill from "../components/Pill"

const ProjectCard = ({data, id}) => {
    const [languages, setLanguages] = useState([]);

    const fetchData = async () => {

        if (data.Languages) { 
            await data.Languages.forEach(async (language, i) => {
                await getDoc(doc(db, 'Languages', language._key.path.segments.at(-1))).then(res => {
                    console.log(languages);
                    console.log(res.data());

                    setLanguages([...languages, {data: res.data(), id: res.id}]);
                })
                .catch(err => console.error(err));
            });
        }

        if (data.creator) {
            await getDoc(doc(db, 'Users', data.creator._key.path.segments.at(-1))).then(res => {
                data.creator = { ...res.data(), id: res.id };
            })
                .catch(err => console.error(err));
        }
        
    }

    useEffect(() => {
        fetchData();
    }, []);

    
    return (
        <div className="overflow-hidden border rounded-lg bg-white shadow-lg w-full cursor-pointer" onClick={() => window.location.href = '/project?id=' + id}>
            <div className="px-4 py-5 sm:p-6 ">
                <div className="font-bold text-lg">
                    {data.name}
                </div>
                <div className="font-boldg text-turq">
                   <a href={`/user?id=${data.creator.id}`}>@{data.creator.username}</a>
                </div>
                
                <div className="pt-5 text-sm xl:text-md max-h-44 overflow-hidden text-ellipsis">
                    {data.Description}
                </div>

                <div className="flex gap-2 pt-4 flex-wrap">
                    {languages.map((language, i) => {
                        console.log(language);
                        return (
                            <div key={i} className="">
                                <Pill key={language.id} data={language.data.name} />
                            </div>
                        );
                    })}   
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;