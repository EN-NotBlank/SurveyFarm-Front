interface SaveQuestionButtonProp {
    onSaveClicked: () => void;
}

const SaveQuestionButton: React.FC<SaveQuestionButtonProp> = ({ onSaveClicked }) => {
    return (
        <div className="px-2 py-2">
            <button
                className="w-full px-3 h-[4vh] text-white py-2 rounded-md bg-blue-800"
                onClick={onSaveClicked}
            >
                질문 저장
            </button>
        </div>
    );
};

export default SaveQuestionButton;