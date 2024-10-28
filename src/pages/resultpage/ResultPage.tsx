import React from "react";
import "./ResultPage.css";
import MultiChoice from "../../components/resultpage/multichoice/multichoice";
import ShortAnswer from "../../components/resultpage/shortanswer/shortanswer";

const ResultPage = ()=>{
    return (
        <div className="Result_page_body">
            <MultiChoice />
            <ShortAnswer />
            <MultiChoice />
            <ShortAnswer />
            <div className="Result_page_button-container">
            <button className="Result_page_submit_button">확인</button>
        </div>
        </div>
    );
};

export default ResultPage;