import MultiChoice from "../../components/resultpage/multichoice/multichoice";
import ShortAnswer from "../../components/resultpage/shortanswer/shortanswer";
import Layout from "../../layouts/layout/Layout";
import "./ResultPage.css";

const ResultPage = ()=>{
    return (
        <Layout>
            <div className="Result_page_body">
                <MultiChoice />
                <ShortAnswer />
                <MultiChoice />
                <ShortAnswer />
                <div className="Result_page_button-container">
                <button className="Result_page_submit_button">확인</button>
            </div>
            </div>
        </Layout>
    );
};

export default ResultPage;