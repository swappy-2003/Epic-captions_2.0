'use client';
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import SparklesIcon from "@/components/SparklesIcon";
import { transcriptionItemsToSrt } from "@/libs/awsTranscriptionHelpers";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";
import roboto from "./../fonts/Roboto-Regular.ttf";
import robotoBold from "./../fonts/Roboto-Bold.ttf";

export default function ResultVideo({ filename, transcriptionItems }) {
  const videoUrl = "https://swapnil-epic-captionns.s3.amazonaws.com/" + filename;
  const [loaded, setLoaded] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#FFFFFF');
  const [outlineColor, setOutlineColor] = useState('#000000');
  const [progress, setProgress] = useState(1);
  const [outputUrl, setOutputUrl] = useState(null);
  const [googleDescription, setGoogleDescription] = useState("");
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.src = videoUrl;
    load();
  }, []);

  const load = async () => {
    const ffmpeg = ffmpegRef.current;
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd';
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    await ffmpeg.writeFile('/tmp/roboto.ttf', await fetchFile(roboto));
    await ffmpeg.writeFile('/tmp/roboto-bold.ttf', await fetchFile(robotoBold));
    setLoaded(true);
  };

  function toFFmpegColor(rgb) {
    const bgr = rgb.slice(5,7) + rgb.slice(3,5) + rgb.slice(1,3);
    return '&H' + bgr + '&';
  }

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    const srt = transcriptionItemsToSrt(transcriptionItems);
    await ffmpeg.writeFile(filename, await fetchFile(videoUrl));
    await ffmpeg.writeFile('subs.srt', srt);
    videoRef.current.src = videoUrl;
    await new Promise((resolve, reject) => {
      videoRef.current.onloadedmetadata = resolve;
    });
    const duration = videoRef.current.duration;
    ffmpeg.on('log', ({ message }) => {
      const regexResult = /time=([0-9:.]+)/.exec(message);
      if (regexResult && regexResult?.[1]) {
        const howMuchIsDone = regexResult[1];
        const [hours, minutes, seconds] = howMuchIsDone.split(':');
        const doneTotalSeconds = hours * 3600 + minutes * 60 + seconds;
        const videoProgress = doneTotalSeconds / duration;
        setProgress(videoProgress);
      }
    });
    await ffmpeg.exec([
      '-i', filename,
      '-preset', 'ultrafast',
      '-vf', `subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=Roboto Bold,FontSize=30,MarginV=70,PrimaryColour=${toFFmpegColor(primaryColor)},OutlineColour=${toFFmpegColor(outlineColor)}'`,
      'output.mp4'
    ]);
    const data = await ffmpeg.readFile('output.mp4');
    const outputBlob = new Blob([data.buffer], { type: 'video/mp4' });
    const outputUrl = URL.createObjectURL(outputBlob);
    videoRef.current.src = outputUrl;
    setOutputUrl(outputUrl);
    setProgress(1);
  };

  // Trigger Google Generative AI when the button is clicked.
  const googleGenerateDescription = async () => {
    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai");
      const genAI = new GoogleGenerativeAI("AIzaSyA8HlOxkP6p20D4dD5W6Vwhld17ucOwhhc");
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = transcriptionItems
        .map(item => item.content)
        .join(" ") || "";
        const prompt2="imagine you are creative description writer just by understanding the video transcribed text that are optimized for search engines with hastag write a description for the video that is engaging and informative and keep it short and just give description of the video";
        const prompt3= prompt2+prompt;
      const result = await model.generateContent(prompt3);
      setGoogleDescription(result.response.text());
      console.log(result.response.text());
    } catch (error) {
      console.error("Error generating description via Google AI:", error);
    }
  };

  return (
    <>
      <div className="rounded-xl overflow-hidden relative sm:flex sm:justify-center sm:items-center">
        <video className="resize-y border-2 border-purple-700/50 w-full sm:w-auto"
               data-video={0}
               ref={videoRef}
               controls>
        </video>
        <div className="mb-4 justify-center gap-4 inline-block w-full sm:w-auto sm:flex sm:flex-col sm:items-center">
          <button
            onClick={transcode}
            className="bg-green-600 py-2 px-6 rounded-full inline-flex gap-2 border-2 border-purple-700/50 cursor-pointer w-full sm:w-auto"
          >
            <SparklesIcon />
            <span>Apply captions</span>
          </button>
          {outputUrl && (
            <a
              href={outputUrl}
              download="output.mp4"
              className="bg-blue-600 py-2 px-6 rounded-full inline-flex gap-2 border-2 border-purple-700/50 cursor-pointer ml-0 sm:ml-4 w-full sm:w-auto"
            >
              <span>Download video</span>
            </a>
          )}
          <button
            onClick={googleGenerateDescription}
            className="bg-purple-600 py-2 px-6 rounded-full inline-flex gap-2 border-2 border-purple-700/50 cursor-pointer ml-0 sm:ml-4 w-full sm:w-auto"
          >
            <span>Generate Description via Google AI</span>
          </button>
          <div className="mt-4 sm:flex sm:flex-col sm:items-center">
            Primary color:&nbsp;
            <input type="color"
                   value={primaryColor}
                   onChange={ev => setPrimaryColor(ev.target.value)}
            />
            <br />
            Outline color:&nbsp;
            <input type="color"
                   value={outlineColor}
                   onChange={ev => setOutlineColor(ev.target.value)}
            />
          </div>
        </div>
        {progress && progress < 1 && (
          <div className="absolute inset-0 bg-black/80 flex items-center">
            <div className="w-full text-center">
              <div className="bg-bg-gradient-from/50 mx-8 rounded-lg overflow-hidden relative">
                <div className="bg-bg-gradient-from h-8"
                     style={{ width: progress * 100 + '%' }}>
                  <h3 className="text-white text-xl absolute inset-0 py-1">
                    {parseInt(progress * 100)}%
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {googleDescription && (
        <div className="mt-4 p-4 border rounded shadow sm:flex sm:flex-col sm:items-center">
          <h3 className="text-xl font-bold">Google Generated Description:</h3>
          <textarea
            contentEditable="true"
            value={googleDescription}
            rows="5"
            className="w-full p-2 border rounded text-zinc-800"
          />
          <button
            onClick={() => navigator.clipboard.writeText(googleDescription)}
            className="mt-2 bg-green-600 text-black px-4 py-2 rounded w-full sm:w-auto"
          >
            Copy Description
          </button>
        </div>
      )}
    </>
  );
}