interface OptionProp {
    index: number;
    onDelete: () => void;
    disabled: boolean;
}

const Option: React.FC<OptionProp> = ({ index, onDelete, disabled }) => {
    return (
        <div className="flex px-2 py-2">
            <h1 className="text-xl font-bold px-2">
                {index}
            </h1>

            <input
                id="in"
                type="text"
                className="w-3/5 mx-2 text-sm leading-none font-medium border border-gray-300 rounded-md px-2 focus:outline-none focus:border-blue-500"
                placeholder="선택지를 입력하세요"
                required
                disabled={disabled}
            ></input>

            {!disabled && (
                <button
                    className="ml-auto mx-5"
                    onClick={onDelete}
                    disabled={disabled}
                >
                    <img src="https://cdn-icons-png.flaticon.com/128/8001/8001499.png" className="h-3 w-3" />
                </button>
            )}
        </div>
    );
};

export default Option;