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
  const [srtUrl, setSrtUrl] = useState(null);

  // Function to generate SRT file
  function generateSrtFile() {
    // Logic to generate SRT file and set the URL
    const srtContent = awsTranscriptionItems.map(item => `${item.startTime} --> ${item.endTime}\n${item.transcript}`).join('\n\n');
    const blob = new Blob([srtContent], { type: 'text/srt' });
    const url = URL.createObjectURL(blob);
    setSrtUrl(url);
  }

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
            <div className="flex flex-col items-start justify-between">
            <button
            onClick={generateSrtFile}
            className="bg-red-600 hover:bg-red-300 ease-linear py-2 px-6 rounded-full inline-flex gap-2 border-2 border-purple-700/50 cursor-pointer mt-4 w-full sm:w-auto"
          >
            <span>Generate SRT File</span>
          </button>
          {srtUrl && (
            <a
              href={srtUrl}
              download="subtitles.srt"
              className="bg-orange-600 py-2 px-6 rounded-full inline-flex gap-2 border-2 hover:bg-orange-300  ease-linear border-purple-700/50 cursor-pointer mt-2 w-full sm:w-auto"
            >
              <span>Download SRT File</span>
            </a>
          )}
            </div>
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