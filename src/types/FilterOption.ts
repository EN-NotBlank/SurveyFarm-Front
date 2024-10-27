import { FilterGroup } from "./SurveyCard";

export const filterGroups: FilterGroup[] = [
  {
    title: '직무',
    key: 'job',
    options: [
      { value: 'all', label: '전체' },
      { value: 'development', label: '개발' },
      { value: 'design', label: '디자인' },
      { value: 'marketing', label: '마케팅' },
      { value: 'sales', label: '영업' },
      { value: 'management', label: '경영' }
    ]
  },
  {
    title: '가치지',
    key: 'value',
    options: [
      { value: 'all', label: '전체' },
      { value: 'environment', label: '환경' },
      { value: 'social', label: '사회' },
      { value: 'economy', label: '경제' },
      { value: 'culture', label: '문화' }
    ]
  },
  {
    title: '성별',
    key: 'gender',
    options: [
      { value: 'all', label: '전체' },
      { value: 'male', label: '남성' },
      { value: 'female', label: '여성' }
    ]
  },
  {
    title: '연령',
    key: 'age',
    options: [
      { value: 'all', label: '전체' },
      { value: '10s', label: '10대' },
      { value: '20s', label: '20대' },
      { value: '30s', label: '30대' },
      { value: '40s', label: '40대' },
      { value: '50s', label: '50대 이상' }
    ]
  }
];
