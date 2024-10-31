import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "../App"
import RequestSurvey from "../pages/RequestSurvey"
import RouterTestPage from "../pages/__test__/MainTestPage"
import ResultPage from "../pages/resultpage/ResultPage"
import VotePage from "../pages/votepage/VotePage"
import SurveySearchPage from "../pages/surveySearch/SurveySearchPage"

const PublicRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}></Route>
                <Route path="/requestSurvey" element={<RequestSurvey />}></Route>
                <Route path="/test" element={<RouterTestPage />}></Route>
                <Route path="/resultpage/:surveyId" element={<ResultPage />}></Route>
                <Route path ="/votepage/:surveyId" element={<VotePage/>}></Route>
                <Route path="/search-survey" element={<SurveySearchPage/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PublicRouter;