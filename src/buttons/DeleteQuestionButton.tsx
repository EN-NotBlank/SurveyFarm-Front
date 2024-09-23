interface DeleteButtonProp {
    onClick: () => void;
}

const DeleteQuestionButton: React.FC<DeleteButtonProp> = ({ onClick }) => {
    return (
        <div>
            <button
                className="w-8 h-8 bg-red-600 text-white rounded-md"
                onClick={onClick}
            >
                X
            </button>
        </div>
    );
};

export default DeleteQuestionButton;