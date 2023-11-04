import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../firebase";
import { Link } from "react-router-dom";


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
const ProjectPage = () => {
    const [data, setData] = useState({});

    const urlParams = new URLSearchParams(window.location.search);

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
                    <div className="flex justify-between items-center">
                        <h1 className="text-5xl">{data.name}</h1>
                        <div className="text-white px-4 py-2 rounded-md bg-turq">Request to Join</div>
                    </div>
                    <div className="flex justify-between">
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
                <div className="grid grid-cols-12 mt-10 gap-10">
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
                                className="mySwiper"
                            >
                                <SwiperSlide className="!my-auto !max-h-80">
                                    <img className="!object-contain" src="https://media.wired.co.uk/photos/606db3bf938ecee6e930f3be/1:1/w_1280,h_1280,c_limit/flappybird-1.jpg" alt="" />
                                </SwiperSlide>
                                <SwiperSlide className="!my-auto">
                                    <img src="https://images.yourstory.com/cs/2/96eabe90392211eb93f18319e8c07a74/Imageg79l-1682602936960.jpg?w=1152&fm=auto&ar=2:1&mode=crop&crop=faces" alt="" />
                                </SwiperSlide>
                                <SwiperSlide>Slide 3</SwiperSlide>
                            </Swiper>
                        </>
                    </div>
                    <div className="col-span-7 max-w-full max-h-80">
                        {data.Description}
                    </div>
                </div>
            </div>

        </>
    );
}

export default ProjectPage;