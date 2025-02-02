import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface SystemInterface {
  getFolderSize: () => Promise<number>;
}

const System = createContext<SystemInterface | undefined>(undefined);

export const useSystem = () => {
  const context = useContext(System);
  if (!context) {
    throw new Error("useSystem must be used within System provider");
  }
  return context;
};

export function SystemProvider({ children }: { children: React.ReactNode }) {
  const getFolderSize = async () => {
    const folderSize = await window.ipcRenderer.invoke("get-folder-size");
    return folderSize;
  };

  const commands: SystemInterface = {
    getFolderSize,
  };

  return <System.Provider value={commands}>{children}</System.Provider>;
}
