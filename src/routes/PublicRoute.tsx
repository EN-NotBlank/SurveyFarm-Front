import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "../App"
import RouterTestPage from "../pages/__test__/MainTestPage"

const PublicRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}></Route>
                <Route path="/test" element={<RouterTestPage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default PublicRouter