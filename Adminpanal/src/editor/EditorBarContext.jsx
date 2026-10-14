import { createContext, useContext, useState } from "react";

// Page (ReviewsEditor) apni state yahan bhejta hai, aapka sticky bottom bar yahan se padhta hai.
// bar = { dirty, saving, status: "draft" | "published", lastSaved, save(), discard(), setStatus(s) }  ya null
const StateCtx = createContext(null);
const SetCtx = createContext(null);

export function EditorBarProvider({ children }) {
  const [bar, setBar] = useState(null);
  return (
    <SetCtx.Provider value={setBar}>
      <StateCtx.Provider value={{ bar }}>{children}</StateCtx.Provider>
    </SetCtx.Provider>
  );
}
export const useEditorBar = () => useContext(StateCtx);   // bottom bar ke liye
export const useSetEditorBar = () => useContext(SetCtx);  // editor pages ke liye
