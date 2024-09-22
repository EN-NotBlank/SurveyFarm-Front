interface NewButtonProp {
    name: string;
    onClick: () => void;
}

const NewQuestionButton: React.FC<NewButtonProp> = ({ name, onClick }) => {
    return (
        // 부모의 반절만 차지
        // 버튼은 w-full로 최대한의 너비 차지
        <div className="flex-1 px-2 py-3 border-[4px">
            <button
                className="w-full px-3 h-[8vh] bg-zinc-400 text-white py-2 rounded-md text-xl font-bold"
                onClick={onClick}
            >
                {name}
            </button>
        </div>
    );
};

export default NewQuestionButton;