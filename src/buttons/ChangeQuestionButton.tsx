interface ChangeButtonProp {
    onClick: () => void;
}

const ChangeQuestionButton: React.FC<ChangeButtonProp> = ({ onClick }) => {
    return (
        <div>
            <button
                className="w-8 h-8 bg-blue-400 text-white rounded-md"
                onClick={onClick}
            >
                C
            </button>
        </div>
    );
};

export default ChangeQuestionButton;