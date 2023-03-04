import React, { useEffect, useState } from "react";
import { GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged } from "firebase/auth";
import { auth } from "../data/firebase";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { users } from "../data/users";

const DataContext = React.createContext();

function DataProvider ({ children }) {
    
    const [user, setUser] = useState({});
    const [LOGOut, setLOGOut] = useState(false)

    //LOCAL STORAGE
    
    const {
        item: USERS, 
        saveItem: saveUSER,
        loading,
        error
    } = useLocalStorage('USERS_V1',users);
    
    const addUSER = ( id, nickName, points, image,country ) => {
        const newUSER = [...USERS];   
        newUSER.push({
          id: id,
          nickName: nickName,
          points,
          image,
          country
        });
        saveUSER(newUSER);
      }
      
    ///GOOGLE SIGNIN
    const googleSignIn = ()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    };
    const logOut = () =>{
        signOut(auth)
        setLOGOut(true)
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    }, []);
    ///FIN GOOGLE SIGNIN

    const context = { googleSignIn, logOut, user,addUSER, LOGOut,setLOGOut,USERS }
    return (
        <DataContext.Provider value ={ context }>
            { children }
        </DataContext.Provider>
    )
}

function UseDataContext() {
    const context = React.useContext(DataContext);
    return context;
}

export {DataProvider, UseDataContext}