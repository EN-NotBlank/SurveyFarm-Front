import React from "react";
import './QuestionImage.css';

interface QuestionImageProps {
    imageUrl: string; 
}

const QuestionImage: React.FC<QuestionImageProps> = ({ imageUrl }) => {
    return (
        <div className="Question_image">
            <img src={imageUrl}/>
        </div>
    );
}

export default QuestionImage;