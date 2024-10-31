import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchSurveys } from '../../api/surveyListApi';
import { filterGroups } from '../../types/FilterOption';
import { SurveyCard, SurveyFilterParams } from '../../types/SurveyCard';
import FilterDropdown from '../surveyFilter/SurveyFilterDropdown';
import './SurveyList.css';



interface SurveyListProps{
    onSurveyClick: (id: number) => void
}

const SurveyList: React.FC<SurveyListProps> = ({ onSurveyClick }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [surveys, setSurveys] = useState<SurveyCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<SurveyFilterParams>({
        job: [],
        region: [],
        gender: [],
        age: [],
        page: 1,
        pageSize: 12,
        search: '',
    });

    // 필터 적용을 위한 상태 설정
    const [appliedFilters, setAppliedFilters] = useState<SurveyFilterParams>(filters);
  
    // URL에서 쿼리 파라미터를 읽어서 필터 설정
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const newFilters: SurveyFilterParams = {
        job: params.getAll('job'),
        region: params.getAll('region'),
        gender: params.getAll('gender') || '',
        age: params.getAll('age'),
        page: Number(params.get('page')) || 1,
        pageSize: 12,
        search: params.get('search') || '',
        };
        setFilters(newFilters);
    }, [location.search]);

    // 필터를 바꿀 때마다 URL 업데이트
    useEffect(() => {
    const params = new URLSearchParams();
        for (const key in filters) {
            if (Object.prototype.hasOwnProperty.call(filters, key)) {
                const typedKey = key as keyof SurveyFilterParams; // key를 SurveyFilterParams의 키로 타입 단언
                if (Array.isArray(filters[typedKey])) {
                    filters[typedKey].forEach(value => params.append(typedKey, value));
                } 
                else if (filters[typedKey]) {
                    params.set(typedKey, String(filters[typedKey]));
                }
            }
        }
    }, [filters, navigate]);

    
  useEffect(() => {
    const loadSurveys = async () => {
      try {
        setLoading(true);
        console.log("sddd")
        const response = await fetchSurveys(appliedFilters);
        console.log(response);
        setSurveys(response.surveys);
        setError(null);
      } catch (err) {
        setError('설문 데이터를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadSurveys();
  }, [appliedFilters]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      search: event.target.value,
      page: 1,
    }));
  };

  const handleFilterSelect = (filterKey: keyof SurveyFilterParams, values: string[]) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: values,
      page: 1,
    }));
  };

  // 드롭다운 내에서 필터 적용
  const applyFilters = () => {
    setAppliedFilters(filters);
    console.log(filters);
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
            selectedValues={filters[group.key] as string[]}
            onSelect={handleFilterSelect} 
            onApply={applyFilters} // 필터 적용 함수 전달
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
          <div key={card.id} className="card" onClick={() => onSurveyClick(card.id)}>
            <div className="survey-image">
                {card.surveyInfo.imgUrl && (
                                    <img 
                                        src={card.surveyInfo.imgUrl} 
                                        alt="설문조사 이미지" 
                                        className="card-image"
                                    />
                                )}
            </div>
            <h3 className="card-title">{card.title}</h3>
            <p className="card-subtitle">{card.surveyInfo.nickName}</p>

            <p className='card-description'>{card.surveyInfo.description}</p>

            <div className="progress-bar">
              <div 
                className="progress-value" 
                style={{ width: `${(card.surveyInfo.currentHeadCnt/card.surveyInfo.maxHeadCnt * 100)}%` }}
              />
            </div>
            
            <div className="card-footer">
              <span>종료일: {card.surveyInfo.endAt}</span>
              <span>참여자: {card.surveyInfo.currentHeadCnt}명</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyList;
