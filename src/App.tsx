import Nav from "./components/Nav";
import Header from "./components/Header";
import DropdownMenu from "./components/DropdownMenu";

const App = () => {
  const RegionMenu = ['전체', '서울', '경기', '인천', '대전', '세종', '충남', '충북', '광주', '전남', '전북', '대구', '경북', '부산', '울산', '경남', '강원', '제주'];

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <Header />
      <DropdownMenu name="test" options={RegionMenu} />
      <DropdownMenu name="test" options={RegionMenu} />
    </div>
  );
};

export default App;