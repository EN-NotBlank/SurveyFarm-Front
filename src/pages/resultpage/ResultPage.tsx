import React from "react";
import "./ResultPage.css";
import MultiChoice from "../../components/resultpage/multichoice/multichoice";
import ShortAnswer from "../../components/resultpage/shortanswer/shortanswer";

const ResultPage = ()=>{
    return (
        <div className="Result_page_body">
            <MultiChoice />
            <ShortAnswer />
        </div>
    );
};

export default ResultPage;