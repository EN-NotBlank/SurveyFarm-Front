import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "../App"
import RouterTestPage from "../pages/__test__/MainTestPage"
import ResultPage from "../pages/resultpage/ResultPage"

const PublicRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}></Route>
                <Route path="/test" element={<RouterTestPage />}></Route>
                <Route path="resultpage" element={<ResultPage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PublicRouter