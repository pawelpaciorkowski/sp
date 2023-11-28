import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from "react";
import { FileEarmarkTextFill } from "react-bootstrap-icons";
import { processName } from '../../pages/admin/addUser/types';
import  flow_data  from '../../pages/flow/list/processList/flow_data.json';

const ProcessDetail = () => {
  const [filterValue, setFilterValue] = useState("");
  const navigate = useNavigate ();


  const filteredProcesses = processName.filter((process) =>
    process.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const handleBarClick = () => {
    navigate("/flow/list");
  };

  const { id } = useParams();
  // @ts-ignore
    const specificProcess = flow_data.find((p: { id: string | undefined; }) => p.id === id);
 


  return (
    <>
      <nav className="relative flex w-full flex-wrap items-center justify-between font-bold uppercase bg-neutral-100 py-2 text-neutral-500 shadow-lg focus:text-neutral-700 dark:bg-neutral-300 lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-5">
          <div>Procesy</div>
        </div>
      </nav>
      <input
        type="text"
        placeholder="Szukaj procesu..."
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        className="border px-3 py-2 rounded focus:outline-none mt-4 ml-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)]"
      />
      <div className="h-[600px] overflow-y-auto custom-scrollbar mt-4">
        {filteredProcesses.length > 0 ? (
          <ul className="">
            {filteredProcesses.map((process) => (
              <li
              key={process.id}
              className="border-b p-3 hover:bg-blue-100 cursor-pointer ml-4 mr-4 shadow"
            >
              <div
                className="flex items-center justify-between"
                onClick={handleBarClick}
              >
                <Link to="/flow/list" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center">
                    <FileEarmarkTextFill className="text-3xl mr-4 text-blue-400 shadow-lg" />
                    <span className="font-medium">{process.name}</span>
                  </div>
                </Link>
                <Link to='/flow/create' onClick={e => e.stopPropagation()}>
                  <button className="border px-3 py-2 rounded bg-blue-400 hover:bg-blue-600 text-white">Nowy wniosek</button>
                </Link>
              </div>
            </li>
            
            ))}
          </ul>
        ) : (
          <div className="text-center py-5">
            O nie :( <br /> Brak procesu spełniającego kryteria wyszukiwania
          </div>
        )}
      </div>
    </>
  );
};

export default ProcessDetail;
