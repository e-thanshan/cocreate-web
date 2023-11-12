import Navbar from "../components/Navbar"
import ProjectCard from "../components/ProjectCard"
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../firebase";
import { useEffect, useState,Fragment } from "react";
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const ExplorePage = () => {
    const [data, setData] = useState([]);
    const [displayed, setDisplayed] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');
    const fetchProjects = async () => {
        await getDocs(collection(db, "Projects")).then((querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setData(newData);
            setDisplayed(newData);
        })
    }
    const fetchLanguages = async () => {
        await getDocs(collection(db, "Languages")).then((querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setLanguages(newData);
        })
    }

    const filterProjects = () => {
        const result = data.filter((project) => {
            return (project.name.toLowerCase().includes(search.toLowerCase()) && selectedLanguages.every((language) => project.Languages.some((projectLanguage) => projectLanguage._key.path.segments.at(-1) === language.id)));
        });

        setDisplayed(result);
    }

    const filteredLanguages =
    query === ''
      ? languages
      : languages.filter((language) =>
        language.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )

    useEffect(() => {
        fetchProjects();
        fetchLanguages();
    }, []);

    useEffect(() => {
        filterProjects();
    }, [search, selectedLanguages]);

    return (
        <div>
            <Navbar />
            <div className="px-8 md:px-20 font-mono max-w-8xl mx-auto">
                <div className="py-10">
                    <h1 className="text-7xl pt-20 ">Explore</h1>
                    <h1 className="text-xl pl-1.5">Discover what the world has to offer.</h1>
                </div>
                <div className="md:grid grid-cols-3">
                    <div className="col-span-1">
                        <div>
                            <div className="justify-between items-center flex border-2 md:w-5/6 h-10 rounded-lg">
                                <input type="text" className="w-full h-full pl-2" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                                <div className="pr-2">
                                    <MagnifyingGlassIcon className='h-6 w-6' />
                                </div>
                            </div>
                            <div>
                            <Combobox value={selectedLanguages} onChange={setSelectedLanguages} multiple>
                                <div className="relative mt-1">
                                    <div className="mt-2 relative w-full md:w-5/6 h-10 cursor-default overflow-hidden rounded-lg bg-white text-left border shadow-sm focus:outline-none sm:text-sm">
                                        <Combobox.Input
                                            placeholder='Search for Languages'
                                            displayValue={(languages) =>
                                                languages.map((language) => language.name).join(', ')
                                            }
                                            className="pl-4 h-full w-full focus:outline-none focus:ring-0 sm:text-sm"
                                        />
                                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronDownIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </Combobox.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                        afterLeave={() => setQuery('')}
                                    >
                                        <Combobox.Options className="absolute mt-1 max-h-60 w-full md:w-5/6 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        {filteredLanguages.length === 0 && query !== '' ? (
                                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                            Nothing found.
                                            </div>
                                        ) : (
                                            filteredLanguages.map((language) => (
                                                <Combobox.Option
                                                    key={language.id}
                                                    className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active ? 'bg-turq text-white' : 'text-gray-900'
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
                        </div>
                    </div>
                    <div className="col-span-2 md:grid md:grid-cols-2 xl:grid-cols-3 gap-3">
                        {displayed.map((v, i) => {
                            return (
                                <ProjectCard key={i} data={v} id={v.id}/>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ExplorePage;