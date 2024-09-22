interface AddButtonProp {
    onClick: () => void;
    disabled: boolean;
}

const AddOptionButton: React.FC<AddButtonProp> = ({ onClick, disabled }) => {
    return (
        <div className="px-2 py-3">
            <button
                className="w-full px-3 h-[8vh] bg-gray-400 text-white py-2 rounded-md"
                onClick={onClick}
                disabled={disabled}
            >
                선택지 추가
            </button>
        </div>
    );
};

export default AddOptionButton;