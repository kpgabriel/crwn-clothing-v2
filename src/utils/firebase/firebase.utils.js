import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDE3u9gLMSfIT_TqwAzSAbD_rZH2McXWX0",
	authDomain: "crwn-ecomm-db-1087e.firebaseapp.com",
	projectId: "crwn-ecomm-db-1087e",
	storageBucket: "crwn-ecomm-db-1087e.appspot.com",
	messagingSenderId: "603079221487",
	appId: "1:603079221487:web:867086cb7b4d40e13a3b1a",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, "users", userAuth.uid);
	console.log(userDocRef);

	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot.exists());

	// if user data !exists
	// create / set the doc with the data from userAuth in collection
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (error) {
			console.log("error creating user", error.message);
		}
	}
	// if user data exists

	return userDocRef;
};
