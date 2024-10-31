import React, { useState } from 'react';
import SurveyList from '../../components/surveyList/SurveyList';
import Layout from '../../layouts/layout/Layout';
import SurveyModal from '../../components/surveyModal/SurveyModal';

const SurveySearchPage: React.FC = () => {
    const [selectedSurveyId, setSelectedSurveyId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 모달 닫기 함수
    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedSurveyId(null);
    };

    // 설문조사 클릭 시 호출되는 함수
    const handleSurveyClick = (id: number) => {
        setSelectedSurveyId(id);
        setIsModalOpen(true);
    };

    return (
        <Layout>
            <SurveyList onSurveyClick={handleSurveyClick} />
            {selectedSurveyId !== null && (
                <SurveyModal 
                    surveyId={selectedSurveyId} 
                    isOpen={isModalOpen} 
                    onClose={handleModalClose} 
                />
            )}
        </Layout>
    );
};

export default SurveySearchPage;
