interface DeleteButtonProp {
    onClick: () => void;
}

const DeleteQuestionButton: React.FC<DeleteButtonProp> = ({ onClick }) => {
    return (
        <div>
            <button
                className="w-5 h-6 bg-inherit rounded-md mx-2"
                onClick={onClick}
            >
                <img src="https://cdn-icons-png.flaticon.com/128/5918/5918065.png" />
            </button>
        </div>
    );
};

export default DeleteQuestionButton;