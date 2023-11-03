import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { DocumentReference, doc, getDoc } from 'firebase/firestore';
import { db } from "../firebase";

const ProjectPage = () => {
    const [data, setData] = useState({});

    const urlParams = new URLSearchParams(window.location.search);

    const fetchData = async () => {
        const docSnap = await getDoc(doc(db, "Projects", urlParams.get("id")));

        let projectData = docSnap.data();
        projectData.id = doc.id;
        if (projectData.creator) {
            await getDoc(doc(db, 'Users', projectData.creator._key.path.segments.at(-1))).then(res => {
                projectData.creator = res.data();
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
                        <h3 className="pt-8 text-xl">By <a href=""></a></h3>
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
                    <div className="col-span-5 items-center flex border-2 h-80 rounded-lg ">
                    </div>
                    <div className="col-span-7 max-w- max-h-80">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id nibh tortor id aliquet lectus proin nibh nisl. Tellus cras adipiscing enim eu turpis egestas. Velit scelerisque in dictum non consectetur a erat nam. Feugiat pretium nibh ipsum consequat nisl vel pretium. Vel elit scelerisque mauris pellentesque pulvinar pellentesque. Nisi est sit amet facilisis magna etiam tempor orci. Eu consequat ac felis donec. Quisque egestas diam in arcu cursus euismod quis. Proin libero nunc consequat interdum. Magna ac placerat vestibulum lectus mauris. Mauris rhoncus aenean vel elit scelerisque. Sit amet aliquam id diam maecenas ultricies mi eget mauris.

                        Eros in cursus turpis massa. Sit amet nulla facilisi morbi tempus iaculis urna. Dolor morbi non arcu risus quis varius quam. Viverra vitae congue eu consequat ac felis donec et odio. Semper eget duis at tellus at urna condimentum. Velit sed ullamcorper morbi tincidunt ornare massa. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt. Dictum at tempor commodo ullamcorper a lacus. Ut placerat orci nulla pellentesque. Pellentesque habitant morbi tristique senectus et netus et. Integer feugiat scelerisque varius morbi enim nunc. Aliquet nibh praesent tristique magna sit amet purus gravida.

                        Quisque egestas diam in arcu cursus euismod quis viverra nibh. </div>
                </div>
            </div>

        </>
    );
}

export default ProjectPage;