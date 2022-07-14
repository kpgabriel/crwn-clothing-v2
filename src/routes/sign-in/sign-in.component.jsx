import React from "react";
import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
	const logGoogleUser = async () => {
		const response = await signInWithGooglePopup();
		const { user } = response;
		const userDocRef = await createUserDocumentFromAuth(user);
	};

	return (
		<div>
			<h1>SignIn</h1>
			<button onClick={logGoogleUser}>Sign in with google pop up</button>
		</div>
	);
};

export default SignIn;
