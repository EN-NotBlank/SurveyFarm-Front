
import { useEffect, useState } from 'react';
//import { fetchSurveys } from '../../api/surveyListApi';
import { fetchSurveys } from '../../api/__test__/SurvetListApiTest';
import { filterGroups } from '../../types/FilterOption';
import { SurveyCard, SurveyFilterParams } from '../../types/SurveyCard';
import FilterDropdown from '../surveyFilter/SurveyFilterDropdown';
import './SurveyList.css';


const SurveyList: React.FC = () => {
  const [surveys, setSurveys] = useState<SurveyCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SurveyFilterParams>({
    job: 'all',
    value: 'all',
    gender: 'all',
    age: 'all',
    page: 1,
    pageSize: 12
  });

  useEffect(() => {
    const loadSurveys = async () => {
      try {
        setLoading(true);
        const response = await fetchSurveys(filters);
        setSurveys(response.surveys);
        setError(null);
      } catch (err) {
        setError('설문 데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadSurveys();
  }, [filters]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      search: event.target.value,
      page: 1
    }));
  };

  const handleFilterSelect = (filterKey: keyof SurveyFilterParams, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value,
      page: 1
    }));
  };

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="survey-container">
      <h2 className="title">설문조사</h2>
      
      <div className="filters">
        {filterGroups.map((group) => (
          <FilterDropdown
            key={group.key}
            filterGroup={group}
            selectedValue={filters[group.key] as string}
            onSelect={handleFilterSelect}
          />
        ))}
        
        <div className="search-container">
          <input 
            type="text"
            placeholder="설문조사 검색"
            className="search-input"
            onChange={handleSearch}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      <div className="grid">
        {surveys.map((card) => (
          <div key={card.id} className="card">
            <div className="survey-image">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>

            <h3 className="card-title">{card.title}</h3>
            <p className="card-subtitle">{card.subtitle}</p>
         
            <div className="tags">
              {card.tags.map((tag, i) => (
                <span key={i} className="tag">#{tag}</span>
              ))}
            </div>

            <div className="progress-bar">
              <div 
                className="progress-value" 
                style={{ width: `${card.progress}%` }}
              />
            </div>
            
            <div className="card-footer">
              <span>종료일: {card.endDate}</span>
              <span>참여자: {card.participants}명</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default SurveyList;
