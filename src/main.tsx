import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App' // 루트 컴포넌트 불러오기
import './index.css' // 전역 스타일 파일 불러오기

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)