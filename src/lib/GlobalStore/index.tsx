import { useContext, useState } from "react";
import StoreContex from "./StoreContex";

//What does this do, you might ask?
/* Well, it acts as a global store for our app, with hooks
It creates a context for our app to live in
It then passes its useState abilities into this context, allowing access from anywhere within
From there we can then use the useStore hook to get and set a key from the global object
This is really good as when a store value is changed, any components that use it are updated
*/
export function withStore(WrappedComponent : any, initialValue : any) {
    return function(props : any) {
        const [get, set] = useState({...initialValue});

        return (
            <StoreContex.Provider value={[get, set]}>
                <WrappedComponent {...props} />
            </StoreContex.Provider>
        )
    }
}

//Sometimes we dont want to subscribe to updates
//Allows setting without getting
//Another quick dive, "Why use T"
//Well it means that when implemented in other scripts a type can be supplied
//This means that typescript can ensure that the correct type is being set
//(And autocorrect knows what your working with)
export function useStoreSet<T = any>(key : string) : (newValue : T) => void {
    const [state, setState] = useContext(StoreContex);

    const setValue = (newValue : T) => {
        setState({...state, [key] : newValue});
    }

    return setValue;
}

//Returns a getter and a setter
export function useStore<T = any>(key : string) : [T, (newValue : T) => void] {
    const [state, setState] = useContext(StoreContex);

    const setValue = (newValue : T) => {
        setState({...state, [key] : newValue});
    }

    return [state[key], setValue];
}


//If you need the whole state
// (You shouldn't really use this)
export function useStoreWhole() {
    const [state, setState] = useContext(StoreContex);

    return [state, setState];
}