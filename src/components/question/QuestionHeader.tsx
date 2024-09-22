interface QuestionHeaderProp {
    isDisabled: boolean;
}

const QuestionHeader: React.FC<QuestionHeaderProp> = ({ isDisabled }) => {
    return (
        // flex-grow로 남은 크기 전부 차지
        <div className="flex w-full border-b-2 border-black">
            <h1 className="text-2xl font-extrabold mx-3 my-1">Q :</h1>
            <input
                id="in"
                type="text"
                className="flex-grow text-sm my-0.5 leading-none font-medium border border-gray-300 dark:border-gray-600 rounded-md px-2 focus:outline-none focus:border-blue-500 dark:focus:border-white dark:bg-gray-800 dark:text-white"
                placeholder="질문을 입력하세요"
                required
                disabled={isDisabled}
            ></input>
        </div>
    );
};

export default QuestionHeader;