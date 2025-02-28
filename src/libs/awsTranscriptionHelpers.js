export function clearTranscriptionItems(items) {
  items.forEach((item, key) => {
    if (!item.start_time) {
      const prev = items[key - 1];
      prev.alternatives[0].content += item.alternatives[0].content;
      delete items[key];
    }
  });
  return items.map(item => {
    const {start_time, end_time} = item;
    const content = item.alternatives[0].content;
    return {start_time, end_time, content}
  });
}

function secondsToHHMMSSMS(timeString) {
  const d = new Date(parseFloat(timeString) * 1000);
  return d.toISOString().slice(11,23).replace('.', ',');
}

export function transcriptionItemsToSrt(items, wordsPerChunk = 2) {
  if (!items || items.length === 0) return ""; // Handle empty array case

  let srt = '';
  let i = 1;
  let groupedItems = [];
  let currentGroup = [];
  let startTime, endTime;

  items.forEach((item, index) => {
    let words = item.content.split(' '); // Split sentence into words
    words.forEach((word, wordIndex) => {
      if (currentGroup.length === 0) {
        startTime = item.start_time; // Start time from first word
      }
      currentGroup.push(word);

      // If chunk is full or last word in transcript
      if (currentGroup.length === wordsPerChunk || (index === items.length - 1 && wordIndex === words.length - 1)) {
        endTime = item.end_time; // End time from last word in chunk
        groupedItems.push({ start_time: startTime, end_time: endTime, content: currentGroup.join(' ') });
        currentGroup = [];
      }
    });
  });

  groupedItems.forEach((chunk) => {
    srt += `${i}\n`;
    srt += `${secondsToHHMMSSMS(chunk.start_time)} --> ${secondsToHHMMSSMS(chunk.end_time)}\n`;
    srt += `${chunk.content}\n\n`;
    i++;
  });

  return srt;
}




export function transcriptionItemsToAss(items) {
  let ass = `[Script Info]
Title: Styled Subtitles
ScriptType: v4.00+
Collisions: Normal

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Roboto,${fontSize},&H00FFFFFF,&H00FFFF00,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,0,2,10,10,70,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;

  let words = items.flatMap(item => item.content.split(' ')); // Split all words
  let index = 1;

  for (let i = 0; i < words.length; i += 3) {
    let chunk = words.slice(i, i + 3);
    let highlightedChunk = chunk.map((word, idx) => {
      return idx === 0 ? `{\c&H00FFFF&}${word}{\c&HFFFFFF&}` : word; // Highlight first word in yellow
    }).join(' ');

    let startTime = secondsToHHMMSSMS(items[Math.floor(i / 3)]?.start_time || "0");
    let endTime = secondsToHHMMSSMS(items[Math.floor(i / 3)]?.end_time || "0");

    ass += `Dialogue: 0,${startTime},${endTime},Default,,0,0,0,,${highlightedChunk}\n`;
    index++;
  }
  
  return ass;
}
