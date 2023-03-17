import React, { useEffect, useState } from "react";
import { GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged } from "firebase/auth";
import { auth } from "../data/firebase";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { users } from "../data/users";
import { games } from "../data/games";

const DataContext = React.createContext();

function DataProvider ({ children }) {
    //accede,mos a los items para obtener los puntos del usuario.
    const localStorageItem = localStorage.getItem('USERS_V1');
    let parsedItem = JSON.parse(localStorageItem);

    const localStorageLikes = localStorage.getItem('gamesLiked');
    let parsedLikes = JSON.parse(localStorageLikes)

    //Estados
    const [user, setUser] = useState({});
    const [LOGOut, setLOGOut] = useState(false);
    const [points,setPoints] = useState(0);
    const [position,setPosition] = useState([])
    const [likeGames, setLikeGames] = useState([])
    const  [pointsWPM, setPointsWPM] = useState()
    const  [pointsMemo, setPointsMemo] = useState(0)

    
    //LOCAL STORAGE
    const {
        item: USERS, 
        saveItem: saveUSER,
        loading,
        error
    } = useLocalStorage('USERS_V1',users);

    
    
   //Use effect para que se seteen los puntos con la info del usuario. Mapeamos cada usuario.
   useEffect(() => {
    async function getPointsWPM() {
      try {
        if (points >= 0 && user?.length > 1 || localStorageLikes) {
          for (const e of parsedItem) {
            if (user?.displayName === e.nickName && e.points?.WPM !== undefined) {
              setLikeGames(parsedLikes);
              console.log("VENGO DE DATA CONTEXT SET E.POINTS", 'WPM: ',e.points.WPM, "Memotest:",e.points.Memotest);
              await 
              setPointsWPM(e.points.WPM);
              setPointsMemo(e.points.Memotest)
              break;
            }
          }
        }
      } catch (error) {
        console.error('Ocurrió un error:', error);
      }
    }
  
    getPointsWPM();
  }, [user]);

   //use Effect para setear la posicion a tiempo real
   
//    useEffect(() => {
//     const users = parsedItem;
//     users.sort((x, y)=>  y.points - x.points);
//     setPosition(users)
//    }, [points,pointsWPM])

   //Funcion para crear un objeto con los juegos disponibles.

    const gamesAvailables = games.reduce((acc, game) => {
        if (game.status === "play") {
        acc[game.title] = 0;
        }
        return acc;
    }, {});
   
    //Add user del localStorage
    const addUSER = ( id, nickName, image,country ) => {
        const newUSER = [...USERS];   
        newUSER.push({
            id: id,
            nickName: nickName,
            points : gamesAvailables,
            image,
            country
        });
        saveUSER(newUSER);
    }
    
    //Edit User lo llamamos en cada juego para setear los puntos del usuario en localStorage
    const editUSER = (id,newPoints,game) =>{
        const USERindex = USERS.findIndex(user => user.id === id)
        const newUSER  = [...USERS];
        newUSER[USERindex].points[game] = newPoints;
        saveUSER(newUSER)
    }

    //Add Likes del local Storage
    const addLikes = () => {
        const updatedLocalStorage = JSON.stringify(  likeGames );
        localStorage.setItem('gamesLiked', updatedLocalStorage);
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
        editUSER,
        position,
        setPosition,
        likeGames,
        setLikeGames,
        addLikes,
        parsedLikes,
        parsedItem,
        pointsWPM,
        setPointsWPM,
        pointsMemo,
        setPointsMemo
        
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