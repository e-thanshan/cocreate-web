import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword, signInWithCustomToken  } from 'firebase/auth';
import { auth } from '../firebase';

const LoginPage = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
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

    const rosefireSignIn = () => {
        Rosefire.signIn("dd13ef46-548d-4cc9-9673-0809f9616340", async (err, rfUser) => {
			if (err) {
				console.log("Rosefire error!", err);
				return;
			}
			console.log("Rosefire success!", rfUser);
			await signInWithCustomToken(auth, rfUser.token).then(() => {
                navigate("/explore");
            }).catch((error) => {
				if (error.code === 'auth/invalid-custom-token') {
					console.log("The token you provided is not valid.");
				} else {
					console.log("error", error.message);
				}
			});
		});
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="overflow-hidden rounded-lg bg-white shadow-lg">
                <div className="px-4 py-5 sm:p-6">
                    <div className="text-center text-xl">Login</div>
                    <div className=''>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={onSubmit}>Submit</button>
                    </div>
                    <button id="rosefireButton" type="button" 
                        className="block my-15 mx-auto text-white bg-[#800000]
                        text-lg py-2.5 px-7 rounded-md"
                        onClick={rosefireSignIn}>
                        Sign in with Rosefire
                    </button>
                    <div id="firebaseui-auth-container"></div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;