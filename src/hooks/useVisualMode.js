import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial])

  function transition(mode, replace = false) {
    
    // prev is the latest version of state, without prev you're relying on global
    // done with andy
    setHistory((prev)=>{
      const newHistory = [ ...prev ];
       if(replace) {
         newHistory.pop();
       }

       newHistory.push(mode);
       return newHistory;
    });

  }

  // TODO fix below same as above
  function back() {
      setHistory((prev)=> {
        const newHistory = [ ...prev ];
        if(newHistory.length > 1){
          newHistory.pop();
        }
        return newHistory
      });

  }

  return { mode: history[history.length-1], transition, back };
}