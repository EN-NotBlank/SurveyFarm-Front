import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu';

interface ParticipantFilterProps {
    onRegionChange: (selected: string[]) => void;
    onJobChange: (selected: string[]) => void;
    onGenderChange: (selected: string[]) => void;
    onAgeChange: (selected: string[]) => void;
    onCntChange: (selected: string[]) => void;
}

const ParticipantFilter: React.FC<ParticipantFilterProps> = ({ onRegionChange, onJobChange, onGenderChange, onAgeChange, onCntChange, }) => {
    const RegionMenu = ['전체', '서울', '경기', '인천', '대전', '세종', '충남', '충북', '광주', '전남', '전북', '대구', '경북', '부산', '울산', '경남', '강원', '제주', '외국'];
    const jobMenu = ['전체', '기획', '법조', '인사', '회계', '마케팅', '개발', '디자인', '물류/무역', '배송업', '영업', '고객상담', '금융/보험', '요식업', '서비스업', '설계', '제조업', '교육', '건축', '의료', '스포츠', '공공/복지', '학생'];
    const genderMenu = ['남자', '여자'];
    const ageMenu = ['초등학생', '중학생', '고등학생', '대학생', '10대', '20대', '30대', '40대', '50대', '60대', '70대'];
    const cntMenu = ['100명', '500명', '1000명', '2000명', '5000명', '10000명'];

    const [openedMenu, setOpenedMenu] = useState<string | null>(null);
    const handleMenuToggle = (menuName: string) => {
        setOpenedMenu(openedMenu === menuName ? null : menuName);
    };

    return (
        <div className="flex space-x-4">
            <DropdownMenu
                name="지역"
                options={RegionMenu}
                isOpen={openedMenu === '지역'}
                onToggle={() => handleMenuToggle('지역')}
                onApply={onRegionChange}  // 부모에 선택된 값 전달
            />

            <DropdownMenu
                name="직무"
                options={jobMenu}
                isOpen={openedMenu === '직무'}
                onToggle={() => handleMenuToggle('직무')}
                onApply={onJobChange}
            />

            <DropdownMenu
                name="성별"
                options={genderMenu}
                isOpen={openedMenu === '성별'}
                onToggle={() => handleMenuToggle('성별')}
                onApply={onGenderChange}
            />

            <DropdownMenu
                name="연령"
                options={ageMenu}
                isOpen={openedMenu === '연령'}
                onToggle={() => handleMenuToggle('연령')}
                onApply={onAgeChange}
            />

            <DropdownMenu
                name="인원"
                options={cntMenu}
                isOpen={openedMenu === '인원'}
                onToggle={() => handleMenuToggle('인원')}
                onApply={onCntChange}
            />
        </div>
    );
};

export default ParticipantFilter;