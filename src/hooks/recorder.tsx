import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface RecorderInterface {
  startAVRecording: (name: string) => void;
  stopAVRecording: () => void;
  questionsManifest: string[];
  setQuestionsManifest: Dispatch<SetStateAction<string[]>>;
}

const Recorder = createContext<RecorderInterface | undefined>(undefined);

export const useRecorder = () => {
  const context = useContext(Recorder);
  if (!context) {
    throw new Error("useRecorder must be used within Recorder provider");
  }
  return context;
};

export function RecorderProvider({ children }: { children: React.ReactNode }) {
  const [questionsManifest, setQuestionsManifest] = useState<string[]>([]);

  const startAVRecording = (name: string) => {
    setQuestionsManifest([]);
    window.ipcRenderer.send("start-camera", { name });
  };
  const stopAVRecording = () => {
    window.ipcRenderer.send("stop-camera", { questionsManifest });
  };

  const commands: RecorderInterface = {
    startAVRecording,
    stopAVRecording,
    questionsManifest,
    setQuestionsManifest,
  };

  return <Recorder.Provider value={commands}>{children}</Recorder.Provider>;
}
