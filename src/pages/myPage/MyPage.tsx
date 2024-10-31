// MyPage.tsx
import React, { useEffect, useState } from 'react';
import Layout from '../../layouts/layout/Layout';
import './MyPage.css';

interface Survey {
    id: number;
    title: string;
    description: string;
    date: string;
    participants: number;
    tags: string[];
}

const MyPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'created' | 'participated'>('created');
    const [createdSurveys, setCreatedSurveys] = useState<Survey[]>([]);
    const [participatedSurveys, setParticipatedSurveys] = useState<Survey[]>([]);

    useEffect(() => {
        // API 호출 예시
        const fetchCreatedSurveys = async () => {
            try {
                const response = await fetch('/api/surveys/created');
                const data = await response.json();
                setCreatedSurveys(data);
            } catch (error) {
                console.error('Created surveys fetch error:', error);
            }
        };

        const fetchParticipatedSurveys = async () => {
            try {
                const response = await fetch('/api/surveys/participated');
                const data = await response.json();
                setParticipatedSurveys(data);
            } catch (error) {
                console.error('Participated surveys fetch error:', error);
            }
        };

        fetchCreatedSurveys();
        fetchParticipatedSurveys();
    }, []);

    const SurveyList = ({ surveys }: { surveys: Survey[] }) => (
        <div className="survey-list">
            {surveys.map((survey) => (
                <div key={survey.id} className="survey-item">
                    <div className="survey-content">
                        <h3>{survey.title}</h3>
                        <p>{survey.description}</p>
                        <div className="survey-tags">
                            {survey.tags.map((tag, index) => (
                                <span key={index} className="tag">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="survey-info">
                        <p className="date">종료일: {survey.date}</p>
                        <p className="participants">참여자: {survey.participants}명</p>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <Layout>
            <div className="mypage-container">
                <h2 className='title'>마이페이지</h2>
                    <nav className="mypage-nav">
                        <button 
                            className={`nav-button ${activeTab === 'created' ? 'active' : ''}`}
                            onClick={() => setActiveTab('created')}
                        >
                            등록한 설문조사
                        </button>
                        <button 
                            className={`nav-button ${activeTab === 'participated' ? 'active' : ''}`}
                            onClick={() => setActiveTab('participated')}
                        >
                            참여한 설문조사
                        </button>
                    </nav>
                
                <div className="content-container">
                    {activeTab === 'created' ? (
                        <SurveyList surveys={createdSurveys} />
                    ) : (
                        <SurveyList surveys={participatedSurveys} />
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default MyPage;