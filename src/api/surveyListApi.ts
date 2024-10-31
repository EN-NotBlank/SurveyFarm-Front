import { SurveyApiResponse, SurveyCard, SurveyFilterParams } from "../types/SurveyCard";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchSurveys = async (params: SurveyFilterParams): Promise<SurveyApiResponse> => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(val => queryParams.append(key, val)); // 배열인 경우 각 값을 쿼리 파라미터에 추가
    } else if (value) {
      queryParams.append(key, value.toString());
    }
  });

  try {
    // API 호출
    const response = await fetch(`${apiUrl}/survey?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch surveys');
    const data = await response.json();
    const isExistValue = (value : any) =>{
        if (Array.isArray(value)) {
            console.log(value);
            console.log(value.length > 0 && value[0] !=='전체');
            return value.length > 0 && value[0] !=='전체'; // 배열의 길이가 0보다 크면 true, 아니면 false
        }
        
        return value !== undefined && value !==null ;
    };

    // 변환 로직: API 응답을 SurveyCard 타입으로 변환
    const transformedSurveys: SurveyCard[] = data.map((survey: any) => ({
      id: survey.surveyInfo.sid, // API의 sid를 id로 매핑
      title: survey.surveyInfo.title,
      participatedAt: survey.participatedAt,
      surveyInfo: {
        uid: survey.surveyInfo.uid,
        nickName: survey.surveyInfo.nickName,
        description: survey.surveyInfo.description,
        imgUrl: survey.surveyInfo.imgUrl,
        maxHeadCnt: survey.surveyInfo.maxHeadCnt,
        currentHeadCnt: survey.surveyInfo.currentHeadCnt,
        duration: survey.surveyInfo.duration,
        point: survey.surveyInfo.point,
        createdAt: survey.surveyInfo.createdAt,
        endAt: survey.surveyInfo.endAt,
      },
      filters: {
        regionList: survey.filters.regionList,
        jobList: survey.filters.jobList,
        genderList: survey.filters.genderList,
        ageList: survey.filters.ageList,
      },
      questions: survey.questions.map((question: any) => ({
        qid: question.qid,
        title: question.title,
        optionList: question.optionList,
        isMultipleAnswer: question.isMultipleAnswer,
        questionType: question.questionType,
      }))
    }));

    // 필터링 로직
    let filteredSurveys = transformedSurveys;

    if (isExistValue(params.job)) {
      filteredSurveys = filteredSurveys.filter(survey => 
        survey.filters.jobList.some(jobItem => params.job.includes(jobItem))
      );
    }

    if (isExistValue(params.region) ) {
      filteredSurveys = filteredSurveys.filter(survey => 
        survey.filters.regionList.some(regionItem => params.region && params.region.includes(regionItem))
      );
    }

    if (isExistValue(params.gender)) {
      filteredSurveys = filteredSurveys.filter(survey => 
        survey.filters.genderList.includes(params.gender[0])
      );
    }

    if (isExistValue(params.age)) {
      filteredSurveys = filteredSurveys.filter(survey => 
        survey.filters.ageList.some(ageRange => params.age.includes(ageRange))
      );
    }

    console.log(filteredSurveys)

    // 페이지 처리
    const startIndex = (params.page || 1 - 1) * (params.pageSize || 12);
    const paginatedSurveys = filteredSurveys.slice(startIndex, startIndex + (params.pageSize || 12));

    return {
      surveys: filteredSurveys,
      total: filteredSurveys.length,
      page: params.page || 1,
      pageSize: params.pageSize || 12
    };
  } catch (error) {
    console.error('Error fetching surveys:', error);
    throw error;
  }
};


// API 호출 함수
export const fetchSurveyData = async (id: number) => {
    const response = await fetch(`${apiUrl}/survey/${id}`); // 실제 API URL로 변경
    if (!response.ok) {
        throw new Error('네트워크 응답이 좋지 않습니다.');
    }
    return await response.json();
};