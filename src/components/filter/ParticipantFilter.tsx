import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu';

const ParticipantFilter: React.FC = () => {
    const RegionMenu = ['전체', '서울', '경기', '인천', '대전', '세종', '충남', '충북', '광주', '전남', '전북', '대구', '경북', '부산', '울산', '경남', '강원', '제주'];
    const jobMenu = ['전체', '기획', '법조', '인사', '회계', '마케팅', '개발', '디자인', '물류/무역', '배송업', '영업', '고객상담', '금융/보험', '요식업', '서비스업', '설계', '제조업', '교육', '건축', '의료', '스포츠', '공공/복지'];
    const genderMenu = ['남자', '여자'];
    const ageMenu = ['10대', '20대', '30대', '40대', '50대', '60대', '70대'];

    const [openedMenu, setOpenedMenu] = useState<string | null>(null);

    const handleMenuToggle = (menuName: string) => {
        // 메뉴가 이미 열려 있으면 닫고, 아니면 해당 메뉴를 열도록 설정
        setOpenedMenu(openedMenu === menuName ? null : menuName);
    };

    return (
        <div className="flex space-x-4">
            {/* 첫 번째 DropdownMenu */}
            <DropdownMenu
                name="지역"
                options={RegionMenu}
                isOpen={openedMenu === '지역'} // 열려 있는지 여부
                onToggle={() => handleMenuToggle('지역')} // 클릭 시 열고 닫기 로직
            />

            {/* 두 번째 DropdownMenu */}
            <DropdownMenu
                name="직무"
                options={jobMenu}
                isOpen={openedMenu === '직무'}
                onToggle={() => handleMenuToggle('직무')}
            />

            {/* 세 번째 DropdownMenu */}
            <DropdownMenu
                name="성별"
                options={genderMenu}
                isOpen={openedMenu === '성별'}
                onToggle={() => handleMenuToggle('성별')}
            />

            <DropdownMenu
                name="연령대"
                options={ageMenu}
                isOpen={openedMenu === '연령대'}
                onToggle={() => handleMenuToggle('연령대')}
            />
        </div>
    );
};

export default ParticipantFilter;