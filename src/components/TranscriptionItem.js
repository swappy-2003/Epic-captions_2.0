// This component represents a transcription item with start time, end time, and content fields.
export default function TranscriptionItem({
  item,
  handleStartTimeChange,
  handleEndTimeChange,
  handleContentChange,
}) {
  // If the item is not provided, return an empty string.
  if (!item) {
    return '';
  }
  return (
    <div className="my-1 grid grid-cols-3 gap-1 items-center">
      {/* Input field for start time */}
      <input type="text"
             className="bg-white/20 p-1 rounded-md"
             value={item.start_time}
             onChange={handleStartTimeChange}
      />
      {/* Input field for end time */}
      <input type="text"
             className="bg-white/20 p-1 rounded-md"
             value={item.end_time}
             onChange={handleEndTimeChange}
      />
      {/* Input field for content */}
      <input type="text"
             className="bg-white/20 p-1 rounded-md"
             value={item.content}
             onChange={handleContentChange}
      />
    </div>
  );
}