interface OptionProp {
    index: number;
    onDelete: () => void;
}

const Option: React.FC<OptionProp> = ({ index, onDelete }) => {
    return (
        <div className="flex px-2 py-2">
            <h1 className="text-xl font-bold px-2">
                {index}
            </h1>

            <input
                id="in"
                type="text"
                className="w-3/5 mx-2 text-sm leading-none font-medium border border-gray-300 dark:border-gray-600 rounded-md px-2 focus:outline-none focus:border-blue-500 dark:focus:border-white dark:bg-gray-800 dark:text-white"
                placeholder="선택지를 입력하세요"
                required
            ></input>

            <button className="ml-auto mx-5" onClick={onDelete}>
                삭제
            </button>
        </div>
    );
};

export default Option;