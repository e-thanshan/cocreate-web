import Navbar from "../components/Navbar";
import { useEffect, useState, Fragment } from "react";
import { doc, getDoc, getDocs, query, collection, where, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from "../firebase";
import { Link, redirect } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react'
import Pill from "../components/Pill";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { PlusIcon } from "@heroicons/react/24/outline";
const ProjectPage = () => {
    const [data, setData] = useState({});
    const [collabs, setCollabs] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [joinRequests, setJoinRequests] = useState([]);

    const urlParams = new URLSearchParams(window.location.search);

    const [isRequestOpen, setIsRequestOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isJROpen, setJROpen] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));
    const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
    if (user?.uid) {
      await getDocs(query(collection(db, "Users"), where("authUID", "==", user.uid))).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setUserData(newData[0]);
      });
    }
  }

    function closeRequestModal() {
      setIsRequestOpen(false);
    }
    function openRequestModal() {
      setIsRequestOpen(true);
    }
    function closeDeleteModal() {
      setIsDeleteOpen(false);
    }
    function openDeleteModal() {
      setIsDeleteOpen(true);
    }
    function closeEditModal() {
      setIsEditOpen(false);
    }
    function openEditModal() {
      setIsEditOpen(true);
    }
    function closeJRModal() {
      setJROpen(false);
    }
    function openJRModal() {
      setJROpen(true);
    }

    const [description, setDescription] = useState("");
    

    const fetchData = async () => {
        const docSnap = await getDoc(doc(db, "Projects", urlParams.get("id")));
        let projectData = docSnap.data();
        projectData.id = docSnap.id;

        setDescription(projectData.Description);

        if (projectData.creator) {
            await getDoc(doc(db, 'Users', projectData.creator._key.path.segments.at(-1))).then(res => {
                projectData.creator = { ...res.data(), id: res.id };
            })
                .catch(err => console.error(err));
        }

        if (projectData.Collaborators) { 
          try {
              const collabPromises = projectData.Collaborators.map(async (collab, i) => {
                  const res = await getDoc(doc(db, 'Users', collab._key.path.segments.at(-1)));
                  return res.data();
              });
              const collabData = await Promise.all(collabPromises);
              setCollabs(collabData);
          } catch (err) {
              console.error(err);
          }
      }

        if (projectData.Languages) { 
            try {
                const languagePromises = projectData.Languages.map(async (language, i) => {
                    const res = await getDoc(doc(db, 'Languages', language._key.path.segments.at(-1)));
                    return res.data();
                });
                const languageData = await Promise.all(languagePromises);
                setLanguages(languageData);
            } catch (err) {
                console.error(err);
            }
        }

        if (projectData.joinRequests) { 
          try {
              const joinRequestsPromises = projectData.joinRequests.map(async (jr, i) => {
                  const res = await getDoc(doc(db, 'Users', jr._key.path.segments.at(-1)));
                  return {...res.data(), id: res.id};
              });
              const joinRequestsData = await Promise.all(joinRequestsPromises);
              setJoinRequests(joinRequestsData);
          } catch (err) {
              console.error(err);
          }
      }
        setData(projectData);
    }


    const submitEdit = async () => {
      await updateDoc(doc(db, "Projects", urlParams.get("id")), {
        Description: description
      });
      fetchData();
      closeEditModal();
    }

    const submitDelete = async () => {
      await deleteDoc(doc(db, "Projects", urlParams.get("id")));
      window.location.href = "/explore";
    }

    const sendJR = async () => {
      await updateDoc(doc(db, "Projects", urlParams.get("id")), {
        joinRequests: [...data.joinRequests, doc(db, "Users", userData.id)]
      });
      fetchData();
      closeRequestModal();
    }

    const addCollab = async (id) => {
      await updateDoc(doc(db, "Projects", urlParams.get("id")), {
        Collaborators: [...data.Collaborators, doc(db, "Users", id)],
        joinRequests: data.joinRequests.filter(jr => jr._key.path.segments.at(-1) != id)
      });

      fetchData();
    }
      

    useEffect(() => {
        fetchData();
        fetchUserData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="p-6">
                <div className="pt-32 gap-10">
                    <div className="md:flex justify-between items-center">
                        <h1 className="text-5xl">{data.name}</h1>
                        {user?.uid == data.creator?.authUID ? (
                          <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={openJRModal}
                                className="text-white px-4 py-2 w-fit mt-5 md:mt-0 rounded-md bg-turq"
                              >
                                Join Requests
                              </button>
                              <button
                                type="button"
                                onClick={openEditModal}
                                className="text-white px-4 py-2 w-fit mt-5 md:mt-0 rounded-md bg-turq"
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={openDeleteModal}
                                className="text-white px-4 py-2 w-fit mt-5 md:mt-0 rounded-md bg-red-600"
                              >
                                Delete
                              </button>

                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={openRequestModal}
                            className="text-white px-4 py-2 w-fit mt-5 md:mt-0 rounded-md bg-turq"
                          >
                            Request to Join
                          </button>
                        )}
                    </div>
                    <div className="flex pt-4 gap-2">
                      {languages.map((language, i) => {
                        return (
                          <div key={i} className="">
                            <Pill data={language.name} />
                          </div>
                        );
                      })}
                    </div>
                    <div className="md:flex justify-between">
                        <h3 className="pt-3 text-xl">By <Link to={`/user?id=${data.creator?.id}`} className="cursor-pointer text-turq">@{data.creator?.username}</Link></h3>
                        <div className="flex items-center">
                            <h3 className="text-xl pr-3">Collaborators:</h3>
                            <div className="flex gap-2">

                              {collabs.map((v, i) => {
                                return (
                                  <div key={i} className="border-2 h-10 w-10 rounded-full overflow-hidden object-center">
                                    <img src={v.profilePic} alt="" />
                                  </div>
                                );
                              })
                              }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:grid grid-cols-12 mt-10 gap-10">
                    <div className="col-span-5 items-center flex rounded-lg">
                        <>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={30}
                                loop={true}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={true}
                                modules={[Pagination, Navigation]}
                                className="mySwiper">
                                {
                                    data.Images?.map((url, i) => {
                                        return (
                                            <SwiperSlide key={i} className="!my-auto !max-h-80">
                                                <img className="!object-cover -translate-y-1/4" src={url} alt={'image' + i} />
                                            </SwiperSlide>
                                        );
                                    })
                                }
                            </Swiper>
                        </>
                    </div>
                    <div className="col-span-7 max-w-full max-h-80">
                        {data.Description}
                    </div>
                </div>
            </div>

            <Transition appear show={isRequestOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeRequestModal}>
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
                          Request to join
                        </Dialog.Title>
                        <div>Are you sure you want to send this request?</div>
                        <div className="mt-4 flex gap-2">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent text-black bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-white-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white-500 focus-visible:ring-offset-2"
                            onClick={closeRequestModal}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent text-white bg-turq px-4 py-2 text-sm font-medium hover:bg-white-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white-500 focus-visible:ring-offset-2"
                            onClick={() => sendJR()}
                          >
                            Send Request
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>

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
                          Description:
                        </label>
                        <div className="mt-2">
                        <input
                          type="text"
                          placeholder='Edit Project Description'
                          value = {description}
                          onChange = {(e) => setDescription(e.target.value)}
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
            
            <Transition appear show={isDeleteOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeDeleteModal}>
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
                          Delete Project
                        </Dialog.Title>
                        <div className="mt-2">
                          Are you sure you want to delete this project?
                        </div>

                        <div className="mt-4 flex gap-2">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-white-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white-500 focus-visible:ring-offset-2"
                            onClick={closeDeleteModal}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent text-white bg-red-600 px-4 py-2 text-sm font-medium hover:bg-white-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white-500 focus-visible:ring-offset-2"
                            onClick={() => submitDelete()}
                          >
                            Delete
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>   


            <Transition appear show={isJROpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeJRModal}>
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
                          Join Requests
                        </Dialog.Title>
                        <div className="flex flex-col gap-1 my-3">
                          {joinRequests.map((v, i) => {
                            return (
                              <div className="flex justify-between w-full">
                                  <a href={`/user?id=${v.id}`} target="_blank" className="text-turq">
                                    {v.Name}
                                  </a>
                                  <PlusIcon className="h-6 w-6 text-turq cursor-pointer" onClick={() => addCollab(v.id)}/>
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent text-white bg-turq px-4 py-2 text-sm font-medium hover:bg-white-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white-500 focus-visible:ring-offset-2"
                            onClick={closeJRModal}
                          >
                            Done
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>  
        </>                
    );
}

export default ProjectPage;