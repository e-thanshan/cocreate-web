import Navbar from "../components/Navbar";
import { useEffect, useState, Fragment } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
const ProjectPage = () => {
    const [data, setData] = useState({});
    const [reason, setReason] = useState("");

    const urlParams = new URLSearchParams(window.location.search);

    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
      setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }

    const fetchData = async () => {
        const docSnap = await getDoc(doc(db, "Projects", urlParams.get("id")));
        let projectData = docSnap.data();
        projectData.id = docSnap.id;
        if (projectData.creator) {
            await getDoc(doc(db, 'Users', projectData.creator._key.path.segments.at(-1))).then(res => {
                projectData.creator = { ...res.data(), id: res.id };
            })
                .catch(err => console.error(err));
        }

        const collabArray = [];
        if (projectData.Collaborators) {
            projectData.Collaborators.forEach(async user => {
                await getDoc(doc(db, 'Users', user._key.path.segments.at(-1))).then(res => {
                    collabArray.push({ ...res.data() });
                })
                .catch(err => console.error(err));
            });
            projectData.Collaborators = collabArray;
        }

        setData(projectData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <div className="p-6">
                <div className="pt-32 gap-10">
                    <div className="md:flex justify-between items-center">
                        <h1 className="text-5xl">{data.name}</h1>
                        {/* <div className="text-white px-4 py-2 w-fit mt-5 md:mt-0 rounded-md bg-turq">Request to Join</div> */}
                        <button
                            type="button"
                            onClick={openModal}
                            className="text-white px-4 py-2 w-fit mt-5 md:mt-0 rounded-md bg-turq"
                        >
                        Request to Join
                        </button>
                    </div>
                    <div className="md:flex justify-between">
                        <h3 className="pt-8 text-xl">By <Link to={`/user?id=${data.creator?.id}`} className="cursor-pointer text-turq">@{data.creator?.username}</Link></h3>
                        <div className="flex items-center">
                            <h3 className="text-xl pr-3">Collaborators:</h3>
                            <div className="flex gap-2">
                                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.3065 36.4775C22.5704 32.0025 19.8215 27.9127 15.5009 25.6338C11.1803 23.3548 6.25277 23.3955 2.14386 25.3149M23.3065 36.4775C28.1208 35.2894 32.4255 32.1288 34.921 27.3978C39.5589 18.6049 36.1907 7.71702 27.3978 3.07905C18.6049 -1.55891 7.71699 1.80934 3.07903 10.6022C0.583584 15.3332 0.405898 20.6707 2.14386 25.3149M23.3065 36.4775C19.1731 37.4975 14.6641 37.0635 10.6022 34.921C6.54031 32.7785 3.63603 29.3022 2.14386 25.3149M26.4064 17.819C24.8604 20.75 21.2312 21.8728 18.3002 20.3268C15.3692 18.7808 14.2465 15.1515 15.7925 12.2205C17.3384 9.28955 20.9677 8.1668 23.8987 9.71279C26.8297 11.2588 27.9524 14.8881 26.4064 17.819Z" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.3065 36.4775C22.5704 32.0025 19.8215 27.9127 15.5009 25.6338C11.1803 23.3548 6.25277 23.3955 2.14386 25.3149M23.3065 36.4775C28.1208 35.2894 32.4255 32.1288 34.921 27.3978C39.5589 18.6049 36.1907 7.71702 27.3978 3.07905C18.6049 -1.55891 7.71699 1.80934 3.07903 10.6022C0.583584 15.3332 0.405898 20.6707 2.14386 25.3149M23.3065 36.4775C19.1731 37.4975 14.6641 37.0635 10.6022 34.921C6.54031 32.7785 3.63603 29.3022 2.14386 25.3149M26.4064 17.819C24.8604 20.75 21.2312 21.8728 18.3002 20.3268C15.3692 18.7808 14.2465 15.1515 15.7925 12.2205C17.3384 9.28955 20.9677 8.1668 23.8987 9.71279C26.8297 11.2588 27.9524 14.8881 26.4064 17.819Z" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.3065 36.4775C22.5704 32.0025 19.8215 27.9127 15.5009 25.6338C11.1803 23.3548 6.25277 23.3955 2.14386 25.3149M23.3065 36.4775C28.1208 35.2894 32.4255 32.1288 34.921 27.3978C39.5589 18.6049 36.1907 7.71702 27.3978 3.07905C18.6049 -1.55891 7.71699 1.80934 3.07903 10.6022C0.583584 15.3332 0.405898 20.6707 2.14386 25.3149M23.3065 36.4775C19.1731 37.4975 14.6641 37.0635 10.6022 34.921C6.54031 32.7785 3.63603 29.3022 2.14386 25.3149M26.4064 17.819C24.8604 20.75 21.2312 21.8728 18.3002 20.3268C15.3692 18.7808 14.2465 15.1515 15.7925 12.2205C17.3384 9.28955 20.9677 8.1668 23.8987 9.71279C26.8297 11.2588 27.9524 14.8881 26.4064 17.819Z" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
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
            




            <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                  <div className="mt-2">
                    <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows="4" cols="50" placeholder='Why?' className="rounded-md border w-full h-20"></textarea>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent text-white bg-turq px-4 py-2 text-sm font-medium hover:bg-white-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      oki i go cry now sad
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