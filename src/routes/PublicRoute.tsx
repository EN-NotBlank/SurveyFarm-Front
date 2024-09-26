import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "../App"
import RequestSurvey from "../pages/RequestSurvey"

const PublicRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}></Route>
                <Route path="/requestSurvey" element={<RequestSurvey />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PublicRouter