interface DeleteButtonProp {
    onClick: () => void;
}

const DeleteQuestionButton: React.FC<DeleteButtonProp> = ({ onClick }) => {
    return (
        <div className="h-full">
            <button
                className="w-full h-full bg-red-600 text-white py-2 rounded-md"
                onClick={onClick}
            >
                질문 삭제
            </button>
        </div>
    );
};

export default DeleteQuestionButton;