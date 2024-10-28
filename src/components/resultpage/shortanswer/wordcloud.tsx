import React from "react";
import WordCloud from "react-wordcloud";
import './WordCloud.css';

interface WordCloudBoxProps {
  words: { text: string; value: number }[];
}

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

  

const WordCloudBox: React.FC<WordCloudBoxProps> = ({ words }) => {
  const coloredWords = words.map(word => ({
    ...word,
    color: getRandomColor(),
  }));
  
  return (
    <div className="wordcloud-container">
      <WordCloud words={coloredWords } options={options} />
    </div>
  );
}

export default WordCloudBox;
