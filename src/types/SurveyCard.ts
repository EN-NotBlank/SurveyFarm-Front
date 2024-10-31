export interface SurveyCard {
    id: number; // API의 sid와 일치
    title: string; // 설문 제목
    subtitle?: string; // 서브타이틀, 선택적
    tags?: string[]; // 태그 목록, 선택적
    participatedAt?: string | null; // 참여 여부
    surveyInfo: {
      uid: number;
      nickName: string;
      description: string;
      imgUrl: string;
      maxHeadCnt: number;
      currentHeadCnt: number;
      duration: number;
      point: number;
      createdAt: string;
      endAt: string;
    };
    filters: {
      regionList: string[];
      jobList: string[];
      genderList: string[];
      ageList: string[];
    };
    questions: Array<{
      qid: number;
      title: string;
      optionList: Array<{ text: string }>;
      isMultipleAnswer: boolean;
      questionType: string;
    }>;
}
  
export interface SurveyApiResponse {
    surveys: SurveyCard[];
    total: number;
    page: number;
    pageSize: number;
}

export interface SurveyFilterParams {
    job?: string[];
    region?: string[];
    gender?: string[];
    age?: string[];
    search?: string;
    page?: number;
    pageSize?: number;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterGroup {
  title: string;
  key: keyof SurveyFilterParams;
  options: FilterOption[];
}

export interface SurveyCardDetail{
    surveyInfo: {
        sid: number;
        uid: number;
        nickName: string;
        title: string;
        description: string;
        imgUrl: string;
        maxHeadCnt: number;
        currentHeadCnt: number;
        duration: number;
        point: number;
        createdAt: string;
        endAt: string;
    };
        filters: {
        regionList: string[];
        jobList: string[];
        genderList: string[];
        ageList: string[];
    };
}
