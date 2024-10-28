// src/api/surveyListApi.ts
import { SurveyApiResponse, SurveyFilterParams } from '../../types/SurveyCard';

// 더미 데이터
const dummySurveys = [
    { id: '1', title: '설문조사 1', subtitle: '설문조사 1 설명', tags: ['교육', '기타'], progress: 50, endDate: '2024-10-30', participants: 100, job: ['중학생', '회계·세무'], gender: '여성', age: ['10대', '20대'], region: ['경기', '서울'] },
    { id: '2', title: '설문조사 2', subtitle: '설문조사 2 설명', tags: ['마케팅', '광고'], progress: 30, endDate: '2024-11-15', participants: 75, job: ['고학생', '회계·세무'], gender: '남성', age: ['20대', '30대'], region: ['경기', '서울'] },
    { id: '3', title: '설문조사 3', subtitle: '설문조사 3 설명', tags: ['기술', '직업'], progress: 80, endDate: '2024-12-01', participants: 150, job: ['대학생', '회계·세무'], gender: '여성', age: ['30대', '40대'], region: ['경기', '서울'] },
    { id: '4', title: '설문조사 4', subtitle: '설문조사 4 설명', tags: ['사회', '문화'], progress: 20, endDate: '2024-12-15', participants: 50, job: ['학생', '프리랜서'], gender: '남성', age: ['40대', '50대 이상'], region: ['경기', '서울'] },
    { id: '5', title: '설문조사 5', subtitle: '설문조사 5 설명', tags: ['헬스', '운동'], progress: 90, endDate: '2024-12-31', participants: 200, job: ['학생', '회계·세무'], gender: '여성', age: ['10대', '20대'], region: ['경기', '서울'] },
    { id: '6', title: '설문조사 6', subtitle: '설문조사 6 설명', tags: ['교육', '문화'], progress: 60, endDate: '2024-10-25', participants: 120, job: ['학생', '회계·세무'], gender: '남성', age: ['20대', '30대'], region: ['경기', '서울'] },
    { id: '7', title: '설문조사 7', subtitle: '설문조사 7 설명', tags: ['기술', '미디어'], progress: 40, endDate: '2024-11-10', participants: 85, job: ['학생', '회계·세무'], gender: '여성', age: ['30대'], region: ['경기', '서울'] },
    { id: '8', title: '설문조사 8', subtitle: '설문조사 8 설명', tags: ['사회', '건강'], progress: 55, endDate: '2024-12-20', participants: 140, job: ['학생', '회계·세무'], gender: '남성', age: ['40대'], region: ['경기', '서울'] },
    { id: '9', title: '설문조사 9', subtitle: '설문조사 9 설명', tags: ['마케팅', '서비스'], progress: 70, endDate: '2024-11-30', participants: 90, job: ['학생', '프리랜서'], gender: '여성', age: ['30대', '40대'], region: ['경기', '서울'] },
    { id: '10', title: '설문조사 10', subtitle: '설문조사 10 설명', tags: ['교육', '스포츠'], progress: 35, endDate: '2024-12-05', participants: 60, job: ['학생', '회계·세무'], gender: '남성', age: ['20대'], region: ['경기', '서울'] },
    { id: '11', title: '설문조사 11', subtitle: '설문조사 11 설명', tags: ['기술', '혁신'], progress: 45, endDate: '2024-10-30', participants: 130, job: ['학생', '프리랜서'], gender: '여성', age: ['10대'], region: ['경기', '서울'] },
    { id: '12', title: '설문조사 12', subtitle: '설문조사 12 설명', tags: ['사회', '문화'], progress: 25, endDate: '2024-11-20', participants: 55, job: ['학생', '프리랜서'], gender: '남성', age: ['50대 이상'], region: ['경기', '서울'] },
    { id: '13', title: '설문조사 13', subtitle: '설문조사 13 설명', tags: ['헬스', '운동'], progress: 90, endDate: '2024-12-31', participants: 100, job: ['학생', '프리랜서'], gender: '여성', age: ['10대', '20대'], region: ['경기', '서울'] },
    { id: '14', title: '설문조사 14', subtitle: '설문조사 14 설명', tags: ['기술', '디자인'], progress: 70, endDate: '2024-11-15', participants: 80, job: ['학생', '프리랜서'], gender: '남성', age: ['30대'], region: ['경기', '서울'] },
    { id: '15', title: '설문조사 15', subtitle: '설문조사 15 설명', tags: ['마케팅', '영업'], progress: 60, endDate: '2024-12-25', participants: 200, job: ['학생', '프리랜서'], gender: '여성', age: ['20대', '30대'], region: ['경기', '서울'] },
    { id: '16', title: '설문조사 16', subtitle: '설문조사 16 설명', tags: ['교육', '기타'], progress: 50, endDate: '2024-10-20', participants: 110, job: ['학생', '프리랜서'], gender: '남성', age: ['10대', '20대'], region: ['경기', '서울'] },
    { id: '17', title: '설문조사 17', subtitle: '설문조사 17 설명', tags: ['사회', '정치'], progress: 45, endDate: '2024-11-25', participants: 75, job: ['학생', '프리랜서'], gender: '여성', age: ['40대'], region: ['경기', '서울'] },
    { id: '18', title: '설문조사 18', subtitle: '설문조사 18 설명', tags: ['기술', '환경'], progress: 80, endDate: '2024-12-18', participants: 90, job: ['학생', '프리랜서'], gender: '남성', age: ['30대'], region: ['경기', '서울'] },
    { id: '19', title: '설문조사 19', subtitle: '설문조사 19 설명', tags: ['헬스', '식습관'], progress: 65, endDate: '2024-11-05', participants: 150, job: ['학생', '프리랜서'], gender: '여성', age: ['10대', '20대'], region: ['경기', '서울'] },
    { id: '20', title: '설문조사 20', subtitle: '설문조사 20 설명', tags: ['교육', '자기계발'], progress: 95, endDate: '2024-12-30', participants: 220, job: ['학생', '프리랜서'], gender: '남성', age: ['20대'], region: ['경기', '서울'] },
];


// 더미 데이터를 반환하는 함수
export const fetchSurveys = async (filters: SurveyFilterParams): Promise<SurveyApiResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 필터링 로직
        let filteredSurveys = dummySurveys;
        console.log(filters)
        console.log(filteredSurveys)
        if (filters.job && !filters.job.includes('') && filters.job.length > 0) {
          filteredSurveys = filteredSurveys.filter(survey => 
            survey.job.some(jobItem => filters.job?.includes(jobItem))
          );
          console.log(filters.job)
        }

        if (filters.region && !filters.region.includes('') && filters.region.length > 0) {
            filteredSurveys = filteredSurveys.filter(survey => 
              survey.region.some(jobItem => filters.region?.includes(jobItem))
            );
            console.log(filters.job)
          }
  
        if (filters.gender) {
            console.log(filters.gender[0])
          filteredSurveys = filteredSurveys.filter(survey => 
            survey.gender === filters.gender[0]
          );
          console.log(filteredSurveys)
        }
        
        if (filters.age && filters.age.includes('')&& filters.age.length) {
            console.log("hi")
            console.log(filteredSurveys)
            
          filteredSurveys = filteredSurveys.filter(survey => 
            survey.age.some(ageRange => filters.age.includes(ageRange))
          );
          console.log(filteredSurveys)
        }
        console.log(filteredSurveys)
        // 페이지 처리
        const startIndex = (filters.page || 1 - 1) * (filters.pageSize || 12);
        const paginatedSurveys = filteredSurveys.slice(startIndex, startIndex + (filters.pageSize || 12));
        console.log(paginatedSurveys)
        resolve({
          surveys: filteredSurveys,
          total: filteredSurveys.length,
          page: filters.page || 1,
          pageSize: filters.pageSize || 12
        });
      }, 1000);  // 1초 후 더미 데이터를 반환
    });
  };
  