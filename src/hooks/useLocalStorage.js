import React from "react";

//creamos un custom hook que recibe como parametro el nombre del itemo con el que queremos trabajar y un valor inicial.
function useLocalStorage(itemName, initialValue){
    //variables de useEfect
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(false)
     
     //variable para funcion saveItem:
     const [item, setItem] = React.useState(initialValue)
    
     //usamos use effect para manejar eventos de loading y error 
    React.useEffect(()=>{
      setTimeout(()=>{
      try {
          //variables de localStorage
       const localStorageItem = localStorage.getItem(itemName);
       let parsedItem;
     
       //condicionales para local storage
       if(!localStorageItem) {
         localStorage.setItem(itemName, JSON.stringify(initialValue));
         parsedItem = initialValue;
       } else {
         parsedItem = JSON.parse(localStorageItem);
       }
    
       setItem(parsedItem);
       setLoading(false)
      } catch(error) {
        setError(error)
      }
       }, 1000);
     },[])
  
    
    //funcion puente entre local storage y nuestras funciones de complete y delete
    //esta funcion recibe como parametro al nuevo array de ToDos
      const saveItem = (newItem) =>{
      try{
        const stringifiedItem = JSON.stringify(newItem);
      //creamos una variable que contiene a los todos en string
      localStorage.setItem(itemName,stringifiedItem);
      //los seteamos en localstorage
      setItem(newItem)  
      //y los seteamos como nuevo estado.
      } catch(error){
        setError(error)
      }
      };
  
    return {
      item,
      saveItem,
      loading,
      error,
    };
  
  }

  export { useLocalStorage }
