'use client';

import ResultVideo from "@/components/ResultVideo";
import TranscriptionEditor from "@/components/TranscriptionEditor";
import {clearTranscriptionItems} from "@/libs/awsTranscriptionHelpers";
import axios from "axios";
import {useEffect, useState} from "react";

export default function FilePage({params}) {
  const filename = params.filename;
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);
  const [awsTranscriptionItems, setAwsTranscriptionItems] = useState([]);

  // Fetch transcription data when the filename changes
  useEffect(() => {
    getTranscription();
  }, [filename]);

  // Function to get transcription data from the API
  function getTranscription() {
    setIsFetchingInfo(true);
    axios.get('/api/transcribe?filename='+filename).then(response => {
      setIsFetchingInfo(false);
      const status = response.data?.status;
      const transcription = response.data?.transcription;
      if (status === 'IN_PROGRESS') {
        setIsTranscribing(true);
        setTimeout(getTranscription, 3000);
      } else {
        setIsTranscribing(false);
        setAwsTranscriptionItems(
          clearTranscriptionItems(transcription.results.items)
        );
      }
    });
  }

  // Display a message while transcribing
  if (isTranscribing) {
    return (
      
      <div>
        <h1> transcribing your video </h1>
        <span class="loader2"></span>
        
      </div>
    );
  }

  // Display a message while fetching information
  if (isFetchingInfo) {
    return (
      <span class="loader"></span>
    );
  }

  // Render the transcription editor and result video
  return (
    <div>
      <div className="grid sm:grid-cols-2 gap-8 sm:gap-16">
        <div className="">
          <h2 className="text-2xl mb-1   text-white/60">Transcription</h2>
          <TranscriptionEditor
            awsTranscriptionItems={awsTranscriptionItems}
            setAwsTranscriptionItems={setAwsTranscriptionItems} />
        </div>
        <div>
          <h2 className="text-2xl mb-1 text-white/60">Result</h2>
          <ResultVideo
            filename={filename}
            transcriptionItems={awsTranscriptionItems}
            
            setTranscriptionItems={setAwsTranscriptionItems}
            />
           
        </div>
      </div>
    </div>
  );
}