interface FinishQuestionButtonProp {
    isFinished: boolean;
    onFinish: () => void;
}

const FinishQuestionButton: React.FC<FinishQuestionButtonProp> = ({ isFinished, onFinish }) => {
    return (
        <div className="px-2 py-2">
            <button
                className={`w-full px-3 h-[4vh] text-white py-2 rounded-md ${isFinished ? 'bg-green-600' : 'bg-blue-800'}`}
                onClick={onFinish}
            >
                {isFinished ? '질문 수정' : '질문 저장'}
            </button>
        </div>
    );
};

export default FinishQuestionButton;