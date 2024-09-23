interface DeleteButtonProp {
    onClick: () => void;
}

const DeleteQuestionButton: React.FC<DeleteButtonProp> = ({ onClick }) => {
    return (
        <div className="h-full">
            <button
                className="w-full h-full bg-red-600 text-white py-2 px-7 rounded-md"
                onClick={onClick}
            >
                X
            </button>
        </div>
    );
};

export default DeleteQuestionButton;