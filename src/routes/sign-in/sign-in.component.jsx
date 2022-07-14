import React from "react";
import Button from "../../components/button/button.component";
import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

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
			<SignUpForm />
		</div>
	);
};

export default SignIn;
