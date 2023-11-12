import Navbar from "../components/Navbar"
import Pill from "../components/Pill"
import ProjectCard from "../components/ProjectCard"
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from "../firebase";
import { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react';

const ProfilePage = () => {
    const [data, setData] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [projects, setProjects] = useState([]);
    const [bio, setBio] = useState("");
    const [name, setName] = useState("");
    const urlParams = new URLSearchParams(window.location.search);

    const user = JSON.parse(localStorage.getItem('user'));

    const fetchData = async () => {
        const docSnap = await getDoc(doc(db, "Users", urlParams.get("id")));
        let userData = docSnap.data();
        userData.id = docSnap.id;
        
        setName(userData.Name);
        setBio(userData.bio);

        if (userData.languages) { 
            try {
                const languagePromises = userData.languages.map(async (language, i) => {
                    const res = await getDoc(doc(db, 'Languages', language._key.path.segments.at(-1)));
                    return res.data();
                });
                const languageData = await Promise.all(languagePromises);
                setLanguages(languageData);
            } catch (err) {
                console.error(err);
            }
        }

        if (userData.Projects) { 
            try {
                const projectPromises = userData.Projects.map(async (project, i) => {
                    const res = await getDoc(doc(db, 'Projects', project._key.path.segments.at(-1)));
                    return { id: res.id, ...res.data() };
                });
                const projectData = await Promise.all(projectPromises);
                setProjects(projectData);
            } catch (err) {
                console.error(err);
            }
        }
        
        setData(userData);
    }
    const [isEditOpen, setIsEditOpen] = useState(false);
    function closeEditModal() {
        setIsEditOpen(false);
    }
    function openEditModal() {
        setIsEditOpen(true);
    }
    const submitEdit = async () => {
        await updateDoc(doc(db, "Users", urlParams.get("id")), {
            Name: name,
            bio
        });
        fetchData();
        closeEditModal();
    }
    

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="pt-32 p-6">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <div className="border-2 h-20 w-20 rounded-full overflow-hidden object-center">
                            <img src={data.profilePic} alt="" />
                        </div>
                        <div className="pl-2">
                            <p className="text-4xl">{data.Name}</p>
                            <p className="text-xl text-turq">@{data.username}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {user?.uid == data.authUID ? (
                              <button
                                type="button"
                                onClick={openEditModal}
                                className="text-white px-4 py-2 h-fit mt-5 md:mt-0 rounded-md bg-turq"
                              >
                                Edit
                              </button>
                        ) : (
                            <div></div>
                        )}
                    </div>

                </div>   
                
                <div className="pl-[5.5rem]">
                    <p className="text-lg">Bio:</p>
                    <p className="text-sm">{data.bio}</p>
                    <p className="pt-3 pb-1 text-lg">Skills:</p>
                    <div className="flex gap-1.5">
                        {languages.map((language, i) => {
                            return (
                                <div key={i} className="col-span-1">
                                    <Pill data={language.name} />
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
                                <ProjectCard key={project.id} data={project} id={project.id} />
                            </div>
                        );
                    })}    
                </div>
            </div>

            <Transition appear show={isEditOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeEditModal}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Edit Project
                        </Dialog.Title>
                        
                        <div>
                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                          Displayed Name:
                        </label>
                        <div className="mt-2">
                        <input
                          type="text"
                          placeholder='Edit Bio'
                          value = {name}
                          onChange = {(e) => setName(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-turq sm:text-sm sm:leading-6"
                          />
                        </div>
                        </div>

                        <div>
                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                          Bio:
                        </label>
                        <div className="mt-2">
                        <input
                          type="text"
                          placeholder='Edit Bio'
                          value = {bio}
                          onChange = {(e) => setBio(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-turq sm:text-sm sm:leading-6"
                          />
                        </div>
                        </div>

                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent text-white bg-turq px-4 py-2 text-sm font-medium hover:bg-white-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white-500 focus-visible:ring-offset-2"
                            onClick={() => submitEdit()}
                          >
                            Submit
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>  

        </div>
    );
};

export default ProfilePage;