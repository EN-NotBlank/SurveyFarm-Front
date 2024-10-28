import { FilterGroup } from "./SurveyCard";

export const filterGroups: FilterGroup[] = [
  {
    title: '직무',
    key: 'job',
    options: [
      { value: '', label: '전체' },
      { value: '기획·전략', label: '기획·전략' },
      { value: '법무·사무·총무', label: '법무·사무·총무' },
      { value: '인사·HR', label: '인사·HR' },
      { value: '회계·세무', label: '회계·세무' },
      { value: '마케팅·광고·MD', label: '마케팅·광고·MD' },
      { value: '개발·데이터', label: '개발·데이터' },
      { value: '물류·무역', label: '물류·무역' },
      { value: '운전·운송·배송', label: '운전·운송·배송'},
      { value: '영업', label: '영업' },
      { value: '고객상담·TM', label: '고객상담·TM' },
      { value: '금융·보험', label: '금융·보험' },
      { value: '식·음료', label: '식·음료' },
      { value: '고객서비스·리테일', label: '고객서비스·리테일' },
      { value: '엔지니어링·설계', label: '엔지니어링·설계' },
      { value: '제조·생산', label: '제조·생산' },
      { value: '교육', label: '교육' },
      { value: '건축·시설', label: '건축·시설' },
      { value: '의료·바이오', label: '의료·바이오' },
      { value: '미디어·문화·스포츠', label: '미디어·문화·스포츠' },
      { value: '공공·복지', label: '공공·복지' },
      { value: '중학생', label: '중학생'},
      { value: '고둥학생', label: '고등학생'},
      { value: '대학생', label: '대학생'},
    ]
  },
  {
    title: '거주지',
    key: 'region',
    options: [
      { value: '', label: '전체' },
      { value: '서울', label: '서울' },
      { value: '경기', label: '경기' },
      { value: '인천', label: '인천' },
      { value: '대전', label: '대전' },
      { value: '세종', label: '세종' },
      { value: '충남', label: '충남' },
      { value: '충북', label: '충북' },
      { value: '광주', label: '광주' },
      { value: '전남', label: '전남' },
      { value: '전북', label: '전북' },
      { value: '대구', label: '대구' },
      { value: '경북', label: '경북' },
      { value: '부산', label: '부산' },
      { value: '울산', label: '울산' },
      { value: '경남', label: '경남' },
      { value: '강원', label: '강원' },
      { value: '제주', label: '제주' },

    ]
  },
  {
    title: '성별',
    key: 'gender',
    options: [
      { value: '', label: '전체' },
      { value: '남성', label: '남성' },
      { value: '여성', label: '여성' }
    ]
  },
  {
    title: '연령',
    key: 'age',
    options: [
      { value: '', label: '전체' },
      { value: '10대', label: '10대' },
      { value: '20대', label: '20대' },
      { value: '30대', label: '30대' },
      { value: '40대', label: '40대' },
      { value: '50대 이상', label: '50대 이상' }
    ]
  }
];
