import { useContext } from "react";
import { ActivityContext } from "../contexts/ActivityContext";

export const useActivity = () => {
    const context = useContext(ActivityContext)
    if(!context){
        throw new Error('useActivity debe usarse mediante ActivityProvider ')
    }
  return  context
}
