import { Link } from "react-router-dom";
import { PersonFill, QuestionCircleFill, CheckLg, FileEarmarkTextFill } from "react-bootstrap-icons";
import FlowListCard from "../../pages/flow/list";

const MainPanel = () => {
  return (
    <>
      <nav className="relative flex w-full flex-wrap items-center justify-between font-bold uppercase bg-neutral-100 py-2 text-neutral-500 shadow-lg focus:text-neutral-700 dark:bg-neutral-300 lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-5">
          <div>Panel główny</div>
        </div>
      </nav>

      <div className="grid grid-cols-3 gap-4 m-5 mb-5">
        <Link to="/globalComponents/processDetail">
          <div className="bg-green-200 hover:bg-green-300 rounded shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)] p-6 flex flex-col items-center cursor-pointer">
            <FileEarmarkTextFill className="text-3xl mb-4" />
            <span className="font-bold">Nowy Wniosek</span>
          </div>
        </Link>
        <Link to="/pages/addUser">
          <div className="bg-blue-200 hover:bg-blue-300 rounded shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)] p-6 flex flex-col items-center cursor-pointer">
            <PersonFill className="text-3xl mb-4" />
            <span className="font-bold">Użytkownicy</span>
          </div>
        </Link>

        <div>
          <Link to="/globalComponents/FAQ/FAQPage">
            <div className="bg-yellow-200 hover:bg-yellow-300 rounded shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)] p-6 flex flex-col items-center cursor-pointer">
              <QuestionCircleFill className="text-3xl mb-4" />
              <span className="font-bold">Pomoc</span>
            </div>
          </Link>
        </div>
      </div>

      <div className=" p-2 mr-5 ml-5 bg-white rounded-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)] ">
      <nav className="sticky z-40 top-main-nav flex w-full flex-wrap items-center justify-between font-bold uppercase  py-2 ">
        <div className="flex w-full flex-wrap items-center justify-between px-5">
          <div>Lista aktywnych wniosków</div>
        </div>
      </nav>
        <FlowListCard />
      </div>
    </>
  );
};

export default MainPanel;
