import Nav from "./components/Nav";
import Header from "./components/Header";
import DropDown from "./components/Dropdown";
import Question from "./components/Question";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <Header />
      <main className='px-[20vw]'>
        <div>
          <h1 className="text-2xl font-bold mx-8 my-5">조건 설정</h1>
          <DropDown />
        </div>
        <div>
          <h1 className="text-2xl font-bold mx-8 my-5">설문 제작</h1>
        </div>
        <Question />
      </main>
    </div>
  );
};

export default App;