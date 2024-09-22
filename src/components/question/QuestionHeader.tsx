interface QuestionHeaderProp {
    isDisabled: boolean;
}

const QuestionHeader: React.FC<QuestionHeaderProp> = ({ isDisabled }) => {
    return (
        // flex-grow로 남은 크기 전부 차지
        <div className="flex w-full border-b-2 my-1">
            <div className="mx-3 my-1">
                <img src="https://cdn-icons-png.flaticon.com/128/3524/3524354.png" className="h-5 w-5" />
            </div>
            <input
                id="input"
                type="text"
                className="flex-grow h-7 text-sm mx-2 leading-none font-medium border border-gray-300 rounded-md px-2 focus:outline-none focus:border-blue-500"
                placeholder="질문을 입력하세요"
                required
                disabled={isDisabled}
            ></input>
        </div>
    );
};

export default QuestionHeader;