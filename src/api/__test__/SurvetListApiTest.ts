// src/api/surveyListApi.ts
import { SurveyApiResponse, SurveyFilterParams } from '../../types/SurveyCard';

// 더미 데이터
const dummySurveys = [
  {
    id: '1',
    title: '설문조사 1',
    subtitle: '설문조사 1 설명',
    tags: ['tag1', 'tag2'],
    progress: 50,
    endDate: '2024-12-31',
    participants: 100
  },
  {
    id: '2',
    title: '설문조사 2',
    subtitle: '설문조사 2 설명',
    tags: ['tag3', 'tag4'],
    progress: 80,
    endDate: '2024-11-30',
    participants: 200
  },
  {
    id: '2',
    title: '설문조사 2',
    subtitle: '설문조사 2 설명',
    tags: ['tag3', 'tag4', 'tag5', 'tag42'],
    progress: 100,
    endDate: '2024-11-30',
    participants: 23333300
  },
  {
    id: '2',
    title: '설문조사 2',
    subtitle: '설문조사 2 설명',
    tags: ['tag3', 'tag4'],
    progress: 80,
    endDate: '2024-11-30',
    participants: 200
  },
  {
    id: '2',
    title: '설문조사 2',
    subtitle: '설문조사 2 설명',
    tags: ['tag3', 'tag4'],
    progress: 80,
    endDate: '2024-11-30',
    participants: 200
  },
  {
    id: '2',
    title: '설문조사 2',
    subtitle: '설문조사 2 설명',
    tags: ['tag3', 'tag4'],
    progress: 80,
    endDate: '2024-11-30',
    participants: 200
  },
  {
    id: '2',
    title: '설문조사 2',
    subtitle: '설문조사 2 설명',
    tags: ['tag3', 'tag4'],
    progress: 80,
    endDate: '2024-11-30',
    participants: 200
  },
  {
    id: '2',
    title: '설문조사 2',
    subtitle: '설문조사 2 설명',
    tags: ['tag3', 'tag4'],
    progress: 80,
    endDate: '2024-11-30',
    participants: 200
  },
  {
    id: '2',
    title: '설문조사 2',
    subtitle: '설문조사 2 설명',
    tags: ['tag3', 'tag4'],
    progress: 80,
    endDate: '2024-11-30',
    participants: 200
  },
  {
    id: '2',
    title: '설문조사 2',
    subtitle: '설문조사 2 설명',
    tags: ['tag3', 'tag4'],
    progress: 80,
    endDate: '2024-11-30',
    participants: 200
  },
  {
    id: '2',
    title: '설문조사 2',
    subtitle: '설문조사 2 설명',
    tags: ['tag3', 'tag4'],
    progress: 80,
    endDate: '2024-11-30',
    participants: 200
  },
  {
    id: '2',
    title: '설문조사 2',
    subtitle: '설문조사 2 설명',
    tags: ['tag3', 'tag4'],
    progress: 80,
    endDate: '2024-11-30',
    participants: 200
  },
  {
    id: '2',
    title: '설문조사 2',
    subtitle: '설문조사 2 설명',
    tags: ['tag3', 'tag4'],
    progress: 80,
    endDate: '2024-11-30',
    participants: 200
  },
  {
    id: '2',
    title: '설문조사 2',
    subtitle: '설문조사 2 설명',
    tags: ['tag3', 'tag4'],
    progress: 80,
    endDate: '2024-11-30',
    participants: 200
  },
  {
    id: '2',
    title: '설문조사 2',
    subtitle: '설문조사 2 설명',
    tags: ['tag3', 'tag4'],
    progress: 80,
    endDate: '2024-11-30',
    participants: 200
  },
  {
    id: '2',
    title: '설문조사 2',
    subtitle: '설문조사 2 설명',
    tags: ['tag3', 'tag4'],
    progress: 80,
    endDate: '2024-11-30',
    participants: 200
  },
  {
    id: '2',
    title: '설문조사 2',
    subtitle: '설문조사 2 설명',
    tags: ['tag3', 'tag4'],
    progress: 80,
    endDate: '2024-11-30',
    participants: 200
  },
  
  // 필요한 만큼 더 추가
];

// 더미 데이터를 반환하는 함수
export const fetchSurveys = async (filters: SurveyFilterParams): Promise<SurveyApiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        surveys: dummySurveys,  // 더미 데이터를 사용
        total: dummySurveys.length,
        page: filters.page || 1,
        pageSize: filters.pageSize || 12
      });
    }, 1000);  // 1초 후 더미 데이터를 반환
  });
};