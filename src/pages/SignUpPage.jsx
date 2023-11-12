import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';


const SignUpPage = () => {

    const navigate = useNavigate();
 
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [photoURL, setphotoURL] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;

            localStorage.setItem('user', JSON.stringify(user));

            await addDoc(collection(db, "Users"), {
                authUID: user.uid,
                Name: email,
                username: username,
                profilePic: photoURL,
                bio: "",
                Languages: [],
                Projects: [],
            });

            navigate("/explore")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
   
    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/explore');
        }
    }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                <div className="px-4 py-5 sm:p-6">
                    <div className="text-center text-xl my-5">Sign Up</div>
                    <div className='flex flex-col gap-3'>
                        <input className='border-2 rounded-md p-1' placeholder='UserName' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input className='border-2 rounded-md p-1' placeholder='Profile Picture Url' type="text" value={photoURL} onChange={(e) => setphotoURL(e.target.value)} />
                        <input className='border-2 rounded-md p-1' placeholder='Email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className='border-2 rounded-md p-1' placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className='bg-turq text-white rounded py-2 px-4' onClick={onSubmit}>Sign Up</button>
                    </div>
                    <div id="firebaseui-auth-container"></div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;