export interface SurveyCard {
    id: string;
    title: string;
    subtitle: string;
    tags: string[];
    progress: number;
    endDate: string;
    participants: number;
    job: string[];
    gender: string;
    age: string[];
    region: string[];
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
    gender?: string;
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
