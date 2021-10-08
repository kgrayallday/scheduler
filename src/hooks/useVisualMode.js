import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    
    setHistory((prev)=>{
      const newHistory = [ ...prev ];
      if(replace) {
        newHistory.pop();
      }
      newHistory.push(mode);
      return newHistory;
    });
  }

  function back() {
    setHistory((prev)=> {
      const newHistory = [ ...prev ];
      if(newHistory.length > 1){
        newHistory.pop();
      }
      return newHistory;
    });
  }
  return { mode: history[history.length - 1], transition, back };
}