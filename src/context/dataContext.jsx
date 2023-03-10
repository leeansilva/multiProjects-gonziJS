import React, { useEffect, useState } from "react";
import { GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged } from "firebase/auth";
import { auth } from "../data/firebase";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { users } from "../data/users";

const DataContext = React.createContext();

function DataProvider ({ children }) {
    //accede,mos a los items para obtener los puntos del usuario.
    const localStorageItem = localStorage.getItem('USERS_V1');
    let parsedItem = JSON.parse(localStorageItem);

    //Estados
    const [user, setUser] = useState({});
    const [LOGOut, setLOGOut] = useState(false);
    const [points,setPoints] = useState(0);
    const [position,setPosition] = useState([])

    
    //LOCAL STORAGE
    const {
        item: USERS, 
        saveItem: saveUSER,
        loading,
        error
    } = useLocalStorage('USERS_V1',users);
    
   //Use effect para que se seteen los puntos con la info del usuario. Mapeamos cada usuario.
   useEffect(() => {
    if (points > 0 && user.length > 1){
        parsedItem.map((e)=>{
            if(e.nickName){
               setPoints(e.points)
            }
           })
    }
   }, [])

   console.log(points);

   //use Effect para setear la posicion a tiempo real
   useEffect(() => {
    const users = [...parsedItem];
    users.sort((x, y)=>  y.points - x.points);
    setPosition(users)
   }, [points])
   
   
    const addUSER = ( id, nickName, points, image,country ) => {
        const newUSER = [...USERS];   
        newUSER.push({
            id: id,
            nickName: nickName,
            points : points,
            image,
            country
        });
        saveUSER(newUSER);
    }
    
    //Edit User lo llamamos en cada juego para setear los puntos del usuario en localStorage
    const editUSER = (id,newPoints) =>{
        const USERindex = USERS.findIndex(user => user.id === id)
        const newUSER  = [...USERS];
        newUSER[USERindex].points = newPoints;
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

    const context = { 
        googleSignIn, 
        logOut, 
        user,
        addUSER, 
        LOGOut,
        setLOGOut,
        USERS,
        points,
        setPoints,
        editUSER,
        position,
        setPosition
        
        }
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