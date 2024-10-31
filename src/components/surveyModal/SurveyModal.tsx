import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import { fetchSurveyData } from '../../api/surveyListApi';
import { SurveyCard } from '../../types/SurveyCard'; // SurveyCard 임포트
import './SurveyModal.css';

interface SurveyModalProps {
    surveyId: number;
    isOpen: boolean;
    onClose: () => void;
}

const SurveyModal: React.FC<SurveyModalProps> = ({ surveyId, isOpen, onClose }) => {
    const [surveyData, setSurveyData] = useState<SurveyCard | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const navigate = useNavigate(); // useNavigate 훅 사용

    // ESC 키 처리
    const handleEscKey = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    // 모달 외부 클릭 처리
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    // 참여하기 버튼 클릭 처리
    const handleParticipate = () => {
        navigate(`/votepage/${surveyId}`); // 참여 페이지로 이동
    };

    useEffect(() => {
        if (isOpen) {
            setLoading(true);
            setError(null);
            fetchSurveyData(surveyId)
                .then(data => {
                    setSurveyData(data);
                    setLoading(false);
                    setIsVisible(true);
                })
                .catch(err => {
                    setError('데이터를 불러오는데 실패했습니다.');
                    setLoading(false);
                    console.log(err);
                });

            document.addEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'hidden';
        } else {
            setIsVisible(false);
            setSurveyData(null);
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, surveyId, handleEscKey]);

    if (!isOpen) return null;

    return (
        <div 
            className={`modal-overlay ${isVisible ? 'visible' : ''}`}
            onClick={handleOverlayClick}
        >
            <div className="survey-modal">
                <div className="survey-modal-header">
                    <span>상세정보</span>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="survey-modal-content">
                    {loading && <div>데이터를 불러오는 중입니다...</div>}
                    {error && <div>{error}</div>}
                    {!loading && !error && surveyData && (
                        <>
                            <h2>{surveyData.title}</h2>
                            {surveyData.subtitle && <h3>{surveyData.subtitle}</h3>}

                            <div className="survey-modal-image-container">
                                {surveyData.surveyInfo.imgUrl && (
                                    <img 
                                        src={surveyData.surveyInfo.imgUrl} 
                                        alt="설문조사 이미지" 
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                )}
                            </div>

                            <div className="survey-modal-info-row">
                                <div className="survey-modal-label">의뢰자</div>
                                <span className="survey-modal-value">{surveyData.surveyInfo.nickName}</span>
                            </div>
                            <div className="survey-modal-info-row">
                                <div className="survey-modal-label">참여자 수</div>
                                <span className="survey-modal-value">{surveyData.surveyInfo.currentHeadCnt} / {surveyData.surveyInfo.maxHeadCnt}</span>
                            </div>
                            <div className="survey-modal-info-row">
                                <span className="survey-modal-label">포인트</span>
                                <span className="survey-modal-value">{surveyData.surveyInfo.point} P</span>
                            </div>
                            <div className="survey-modal-info-row">
                                <span className="survey-modal-label">기간</span>
                                <span className="survey-modal-value">{`${surveyData.surveyInfo.createdAt} ~ ${surveyData.surveyInfo.endAt}`}</span>
                            </div>
                            <div className="survey-modal-info-row">
                                <span className="survey-modal-label">설명</span>
                                <span className="survey-modal-value">{surveyData.surveyInfo.description}</span>
                            </div>
                        </>
                    )}
                </div>
                <button className="survey-modal-point-button" onClick={handleParticipate}>
                    참여하기
                </button>
            </div>
        </div>
    );
};

export default SurveyModal;
