interface SurveyCard{
    id: string;
    title: string;
    subtitle: string;
    tags: string[];
    progress: number;
    endDate: string;
    participants: number;
}

export default SurveyCard