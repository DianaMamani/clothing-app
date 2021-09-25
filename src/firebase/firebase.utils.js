import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyA1yHfkRFh5fq5Y58c3scal9dGI0baFb14",
    authDomain: "clothing-app-16731.firebaseapp.com",
    projectId: "clothing-app-16731",
    storageBucket: "clothing-app-16731.appspot.com",
    messagingSenderId: "454540220747",
    appId: "1:454540220747:web:dce8c112edeec9d077b0ce",
    measurementId: "G-YXP3WH1YNS"
  };

  export const createUserProfileDocument = async(userAuth, additionalData) =>{
      if (!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);
      const snapShot = await userRef.get();
      
      console.log(snapShot);

      if(!snapShot.exists){
          const { displayName, email} = userAuth;
          const createdAt = new Date();

          try{
              await userRef.set({
                  displayName,
                  email,
                  createdAt,
                  ...additionalData
              });
          } catch(error) {
              console.log('error creating user', error.message);
          }
      }

      return userRef;
    }
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;