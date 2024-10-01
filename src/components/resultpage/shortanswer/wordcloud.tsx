import React from "react";
import WordCloud from "react-wordcloud";
import './WordCloud.css';

const words: { text: string; value: number }[] = [
  { text: "Paris", value: 100 },
  { text: "France", value: 80 },
  { text: "Capital", value: 60 },
  { text: "Eiffel Tower", value: 50 },
  { text: "Louvre", value: 40 },
  { text: "Seine", value: 30 },
  { text: "Notre Dame", value: 20 },
  { text: "Croissant", value: 10 },
  { text: "Tourism", value: 5 },
  { text: "French Revolution", value: 1 }
];

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const options = {
    rotations: 2,
    rotationAngles: [-90, 0] as [number, number], 
    fontSizes: [20, 100] as [number,number],   
     
  };

  const coloredWords = words.map(word => ({
    ...word,
    color: getRandomColor(), 
  }));

const WordCloudBox = () => {
  return (
    <div className="wordcloud-container">
      <WordCloud words={coloredWords } options={options} />
    </div>
  );
}

export default WordCloudBox;
