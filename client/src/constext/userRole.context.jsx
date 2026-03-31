import { createContext, useState } from "react";

export const roleContext = createContext(null)

export const RoleContextProvider = (props) => {
    const [role, setRole] = useState(null)

    return <roleContext.Provider value={{role, setRole}}>
        {props.children}
    </roleContext.Provider>
}