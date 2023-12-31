import Navbar from "../components/Navbar"
import Pill from "../components/Pill"
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { collection, doc, getDocs, query, where, addDoc, updateDoc } from 'firebase/firestore';
import { db } from "../firebase";
import { useEffect, useState, Fragment } from "react";
import { Combobox, Transition } from '@headlessui/react';

const NewProjectPage = () => {
    const [name, setName] = useState("");
    const [images, setImages] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [languages, setLanguages] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [lquery, setlQuery] = useState('')

    const user = JSON.parse(localStorage.getItem('user'));
    const [userData, setUserData] = useState({});

    const fetchUserData = async () => {
        if (user?.uid) {
            await getDocs(query(collection(db, "Users"), where("authUID", "==", user.uid))).then((querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setUserData(newData[0]);
            });
        } else {
            window.location.href = '/login';
        }
    }

    const filteredLanguages =
    lquery === ''
      ? languages
      : languages.filter((language) =>
        language.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(lquery.toLowerCase().replace(/\s+/g, ''))
        )

    const fetchLanguages = async () => {
        await getDocs(collection(db, "Languages")).then((querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setLanguages(newData);
        })
    }

    const addNewImage = () => {
        setImages([...images, imageUrl]);
        setImageUrl("");
    }


    const onSubmit = async () => {
        const langs = selectedLanguages.map((v) => {
            return doc(db, "Languages", v.id);
        });

        const creator = doc(db, "Users", userData.id);
        console.log(creator);

        const projectData = {
            name,
            Description: description,
            Images: images,
            Languages: langs,
            creator,
            Collaborators: [], 
            joinRequests: [],
        }

        await addDoc(collection(db, "Projects"), projectData).then(async (docRef) => {
            await updateDoc(doc(db, "Users", userData.id), {
                Projects: [...userData.Projects, docRef],
            });
            window.location.href = `/project?id=${docRef.id}`;
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        fetchLanguages();
        fetchUserData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="max-w-2xl mx-auto pt-10 md:pt-20">
                <h1 className="text-xl pb-5">Create New Project</h1>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Name:
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        placeholder='Enter Project Name'
                        value = {name}
                        onChange = {(e)=> setName(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-turq sm:text-sm sm:leading-6"
                    />
                </div>
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                    Description:
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        placeholder='Enter Project Description'
                        value = {description}
                        onChange = {(e)=> setDescription(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-turq sm:text-sm sm:leading-6"
                    />
                </div>
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                    Images:
                </label>
                <div className="flex gap-2 mt-2">
                    <input
                        type='text' 
                        placeholder='Image Url'
                        value={imageUrl} 
                        className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-turq sm:text-sm sm:leading-6"
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <button className="border bg-turq py-2 px-4 rounded-md text-white" onClick={addNewImage}>Upload</button>
                </div>
                <div className="my-4 flex gap-3 flex-wrap">
                    {images.map((v,i) => {
                        return (
                            <img src={v} alt="..." className="h-28"/>
                        );
                    })}
                </div>

                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                    Languages:
                </label>
                <div>
                <Combobox value={selectedLanguages} onChange={setSelectedLanguages} multiple>
                    <div className="relative mt-1">
                        <div className="relative w-full h-10 cursor-default overflow-hidden rounded-lg bg-white text-left border shadow-sm focus:outline-none sm:text-sm">
                            <Combobox.Input
                                placeholder='Search for Languages'
                                displayValue={(languages) =>
                                languages.map((language) => language.name).join(', ')
                                }
                                className="pl-4 h-full w-full focus:outline-none focus:ring-0 sm:text-sm"
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setlQuery('')}
                        >
                            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {filteredLanguages.length === 0 && lquery !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                                </div>
                            ) : (
                                filteredLanguages.map((language) => (
                                    <Combobox.Option
                                        key={language.id}
                                        className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                        }`
                                        }
                                        value={language}
                                    >
                                        {({ selected, active }) => (
                                        <>
                                            <span
                                            className={`block truncate ${
                                                selected ? 'font-medium' : 'font-normal'
                                            }`}
                                            >
                                            {language.name}
                                            </span>
                                            {selected ? (
                                            <span
                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                active ? 'text-white' : 'text-turq'
                                                }`}
                                            >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                            ) : null}
                                        </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>
                </div>
                <div className="py-15 flex w-full justify-center">
                    <button className="border bg-turq py-2 px-4 rounded-md text-white" onClick={() => onSubmit()}>Create Project</button>
                </div>
            </div>
            
        </>
    );
};

export default NewProjectPage;