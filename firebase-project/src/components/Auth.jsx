import { useState } from "react";
import {auth,googleProvider} from "../config/firebase";
import {createUserWithEmailAndPassword,signInWithPopup} from 'firebase/auth'





export const Auth =()=>{
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

   const signIn= async() => {
    try{await createUserWithEmailAndPassword(auth,email,password);}
    catch(err){
        console.error(err)

    }
    


   }
   const signInWithGoogle= async() => {
    try{await signInWithPopup(auth,googleProvider);}
    catch(err){
        console.error(err)

    }
    


   }
   const signOut = async () => {
    try {
        await auth.signOut(); // Ensure this is the correct method to sign out
    } catch (err) {
        console.error(err);
    }
};






    return(
        <div>
            <input placeholder="Email" 
            onChange={(e)=>setEmail(e.target.value)}/>
            <input placeholder="Password" type="password"   onChange={(e)=>setPassword(e.target.value)}
             />
            <button onClick={signIn}>Sign In</button>
            <button onClick={signInWithGoogle}>Sign In With Google</button>
            <button onClick={signOut}>Sign Out</button>
        </div>
    )
}