interface ChangeButtonProp {
    onClick: () => void;
}

const ChangeQuestionButton: React.FC<ChangeButtonProp> = ({ onClick }) => {
    return (
        <div>
            <button
                className="w-6 h-6 bg-inherit rounded-md mx-2"
                onClick={onClick}
            >
                <img src="https://cdn-icons-png.flaticon.com/128/12108/12108481.png" />
            </button>
        </div>
    );
};

export default ChangeQuestionButton;