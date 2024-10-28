import { SurveyApiResponse, SurveyFilterParams } from "../types/SurveyCard";

//back 주소
const BASE_URL = ' ';

export const fetchSurveys = async (params: SurveyFilterParams): Promise<SurveyApiResponse> => {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) queryParams.append(key, value.toString());
  });

  try {
    const response = await fetch(`${BASE_URL}/surveys?${queryParams}`);
    if (!response.ok) throw new Error('Failed to fetch surveys');
    return await response.json();
  } catch (error) {
    console.error('Error fetching surveys:', error);
    throw error;
  }
};
