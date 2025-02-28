import { useEffect, useState } from 'react';
import TranscriptionItem from "@/components/TranscriptionItem";

export default function TranscriptionEditor({
  awsTranscriptionItems,
  setAwsTranscriptionItems,
}) {
  const [renderKey, setRenderKey] = useState(0);

  // Convert content to uppercase by default
  useEffect(() => {
    if (awsTranscriptionItems.length > 0) {
      const newAwsItems = awsTranscriptionItems.map(item => ({
        ...item,
        content: item.content.toUpperCase()
      }));
      setAwsTranscriptionItems(newAwsItems);
    }
  }, [awsTranscriptionItems]); // Add awsTranscriptionItems as a dependency

  // Function to update a transcription item
  function updateTranscriptionItem(index, prop, ev) {
    const newAwsItems = [...awsTranscriptionItems];
    const newItem = {...newAwsItems[index]};
    newItem[prop] = prop === 'content' ? ev.target.value.toUpperCase() : ev.target.value;
    newAwsItems[index] = newItem;
    setAwsTranscriptionItems(newAwsItems);
  }

  // Force re-render when awsTranscriptionItems changes
  useEffect(() => {
    setRenderKey(prevKey => prevKey + 1);
  }, [awsTranscriptionItems]);

  return (
    <>
      <div className="grid grid-cols-3 sticky top-0 bg-violet-800/80 p-2 rounded-md">
        <div>From</div>
        <div>End</div>
        <div>Content</div>
      </div>
      {awsTranscriptionItems.length > 0 && (
        <div className="h-96 overflow-y-scroll">
          {awsTranscriptionItems.map((item,key) => (
            <div key={key}>
              <TranscriptionItem
                handleStartTimeChange={ev => updateTranscriptionItem(key, 'start_time', ev)}
                handleEndTimeChange={ev => updateTranscriptionItem(key, 'end_time', ev)}
                handleContentChange={ev => updateTranscriptionItem(key, 'content', ev)}
                item={item}
                key={renderKey} // Use renderKey to force re-render
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}