import { useState } from "react";
import AddOptionButton from "../button/AddOptionButton";
import SaveQuestionButton from "../button/SaveQuestionButton";
import DeleteQuestionButton from "../button/DeleteQuestionButton";
import Option from "./Option";
import QuestionTitle from "./QuestionTitle";
import ChangeQuestionButton from "../button/ChangeQuestionButton";

interface MCQuestionProps {
    qid: number; // Question의 고유한 ID
    isMAPossible: boolean; // 복수 선택 가능 여부
    onDeleteClick: (id: number) => void;
    onTitleChange: (id: number, title: string) => void; // 질문 제목을 부모에게 전달
    onAddOption: (qid: number, oid: number) => void; // 옵션 추가되면 부모에게 알리기
    onOptionChange: (qid: number, oid: number, text: string) => void; // 옵션 내용  바뀌면 부모에게 알리기
    onDeleteOption: (qid: number, oid: number) => void; // 옵션 삭제되면 부모에게 알리기
    onCheckboxChange: (qid: number, isChecked: boolean) => void; // 중복선택 가능 바뀌면 부모에게 알리기
}

const MCQuestion: React.FC<MCQuestionProps> = ({ qid, isMAPossible, onDeleteClick, onTitleChange, onAddOption, onOptionChange, onDeleteOption, onCheckboxChange }) => {
    const [options, updateOptions] = useState<{ oid: number, text: string }[]>([]); // 선택지 관리

    const [isChecked, setCheckBoxStatus] = useState<boolean>(isMAPossible); // 중복선택 가능 체크박스 관리
    const [isDisabled, setIsDisabled] = useState<boolean>(false); // 비활성화 관리

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onTitleChange(qid, e.target.value); // 질문 텍스트를 상위로 전달
    };

    const handleAddOption = () => {
        if (options.length < 8) {
            const newOption = {
                oid: options.length === 0 ? 0 : Math.max(...options.map(opt => opt.oid)) + 1, // 고유한 ID 만들어주기
                text: "",
            }
            updateOptions((prevOptions) => [...prevOptions, newOption]); // 자기꺼에 새 옵션 추가한거 업데이트
            onAddOption(qid, newOption.oid); // 부모꺼 업데이트
        } else {
            window.alert("선택지는 8개 이하만 가능합니다!");
        }
    };

    const handleChangeOption = (oid: number, text: string) => {
        // 자기꺼에 반영해주기
        updateOptions((prevOptions) =>
            prevOptions.map((option) =>
                option.oid === oid ? { ...option, text } : option
            )
        );
        onOptionChange(qid, oid, text); // 부모꺼 업데이트
    };

    const handleDeleteOption = (oid: number) => {
        // 특정 oid인 옵션을 제거한 새로운 배열 반환
        const newOptions = options.filter(option => option.oid !== oid);

        updateOptions(newOptions); // 자기 옵션 배열 업데이트
        onDeleteOption(qid, oid);  // 부모 상태 업데이트
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setCheckBoxStatus(checked); // 상태 업데이트
        onCheckboxChange(qid, checked); // 부모에게 변경된 상태 전달
    };

    const handleQuestionStatus = () => {
        setIsDisabled(!isDisabled); // 버튼 클릭 시 비활성화 상태로 변경
    };

    return (
        <div className="flex my-4 rounded-md">
            <div className="w-1/6">
                <img src="https://cdn-icons-png.flaticon.com/128/8371/8371275.png" className="w-full h-auto" />
                <div className="flex px-2 py-2 mt-auto">
                    <input
                        id="redCheckBox"
                        type="checkbox"
                        className="my-0.5 w-5 h-5 accent-blue-500"
                        checked={isChecked}
                        onChange={handleCheckboxChange} // 상태 변경 함수 연결
                    />
                    <span className="ml-2 text-l font-semibold">복수선택 허용</span>
                </div>
            </div>

            <div className="flex-grow">
                <QuestionTitle isDisabled={isDisabled} onChange={handleTitleChange} />

                <div>
                    {/* idx는 map이 배정해주는 번호임*/}
                    {options.map((option, idx) => (
                        <div key={option.oid} className="py-2">
                            <Option
                                key={option.oid} // key값은 고유ID로
                                oid={option.oid} // 옵션의 고유ID
                                index={idx + 1} // 화면에 표시될 옵션 순서번호. 내부적인 로직으로는 안쓰임
                                onChange={(text) => handleChangeOption(option.oid, text)}
                                onDelete={() => handleDeleteOption(option.oid)} // 고유한 option 값으로 삭제
                                disabled={isDisabled} // 비활성화 상태 전달
                            />
                        </div>
                    ))}
                </div>

                <AddOptionButton onClick={handleAddOption} disabled={isDisabled} />
                {options.length > 0 && !isDisabled && (
                    <SaveQuestionButton onSaveClicked={handleQuestionStatus} />
                )}
            </div>

            <div className="flex w-1/8 py-1">
                {isDisabled && (<ChangeQuestionButton onClick={handleQuestionStatus} />)}
                <DeleteQuestionButton onClick={() => onDeleteClick(qid)} />
            </div>
        </div>
    );
};

export default MCQuestion;
