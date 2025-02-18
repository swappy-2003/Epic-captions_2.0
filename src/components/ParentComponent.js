import { useState } from "react";
import ResultVideo from "./ResultVideo";

export default function ParentComponent() {
  const [transcriptionItems, setTranscriptionItems] = useState([]);

  return (
    <div>
      <ResultVideo
        filename="example.mp4"
        transcriptionItems={transcriptionItems}
        setTranscriptionItems={setTranscriptionItems}
      />
    </div>
  );
}
