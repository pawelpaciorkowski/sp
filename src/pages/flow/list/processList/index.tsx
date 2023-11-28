import React from "react";
import { Ripple, initTE } from "tw-elements";
import { useEffect, useState } from "react";
import flow_data from "./flow_data.json";
import { CSSTransition, TransitionGroup } from "react-transition-group";


export function FlowListCard() {
  useEffect(() => {
    initTE({ Ripple });
  });

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [openedMenuId, setOpenedMenuId] = useState<string | null>(null);

  // @ts-ignore
  const initialRefs = flow_data.reduce((acc, process) => {
    acc[process.id] = React.createRef<HTMLDivElement>();
    return acc;
  }, {} as Record<string, React.RefObject<HTMLDivElement>>);

  const [menuRefs] = useState(initialRefs);

  // Nasłuchiwanie kliknięcia poza menu
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const currentMenuRef = openedMenuId
        ? menuRefs[openedMenuId].current
        : null;

      if (currentMenuRef && !currentMenuRef.contains(event.target as Node)) {
        setMenuVisible(false);
        setOpenedMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuVisible, openedMenuId, menuRefs]);

  // Obsługuje rozwinięcie/schowanie szczegółów procesu
  const handleExpand = (id: string) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

//   return (
//     <div className="">
//       <TransitionGroup>
//         {  // @ts-ignore
//           flow_data.map((process: any, index: any) => (
//           <CSSTransition key={index} timeout={500} classNames="fade">
//             <div
//               className={`block rounded p-6 shadow-lg mb-4  ${
//                 index % 2 === 0 ? "bg-gray-200" : "bg-white"
//               }`}
//             >
//               <div
//                 className="flex justify-end items-center ml-20 relative"
//                 ref={menuRefs[process.id]}
//               >
//                 <button
//                   className="inline-block focus:outline-none "
//                   onClick={() => {
//                     setOpenedMenuId((prevId) =>
//                       prevId === process.id ? null : process.id
//                     );
//                     setMenuVisible((prevVisibility) => !prevVisibility);
//                   }}
//                 >
//                   <ThreeDotsVertical size={25} />
//                 </button>
//                 {openedMenuId === process.id && menuVisible && (
//                   <div
//                     className="absolute right-0 top-0 mt-8 w-48 rounded-md shadow-lg bg-white"
//                     style={{ zIndex: 100, transform: "translateY(-60%)" }}
//                   >
//                     <Link
//                       to=""
//                       className="block px-4 py-2 text-black hover:bg-blue-100 rounded-t"
//                       onClick={() => {
//                         setMenuVisible(false);
//                         setOpenedMenuId(null);
//                       }}
//                     >
//                       Edytuj wniosek
//                     </Link>
//                     <Link
//                       to=""
//                       className="block px-4 py-2 text-black hover:bg-blue-100 rounded-b"
//                       onClick={() => {
//                         setMenuVisible(false);
//                         setOpenedMenuId(null);
//                       }}
//                     >
//                       Popraw wniosek
//                     </Link>
//                   </div>
//                 )}
//               </div>
//               <div className="flex flex-row flex items-center justify-center">
//                 <div className="basis-1/6">
//                   <strong className="text-xl">Nazwa:</strong>
//                   <div className="mt-2">{process.name}</div>
//                 </div>
//                 <div className="basis-1/6">
//                   <strong className="text-xl">Data dodania:</strong>
//                   <div className="mt-2">{process.date_added}</div>
//                 </div>
//                 <div className="basis-1/6">
//                   <strong className="text-xl">Status:</strong>
//                   <div className="mt-2">{process.status}</div>
//                 </div>
//                 <div className="basis-1/6">
//                   <strong className="text-xl">Priorytet:</strong>
//                   <div className="mt-2">{process.priority}</div>
//                 </div>
//                 <div className="w-1/3">
//                   <strong className="text-xl">Ostatni zapisany etap:</strong>
//                   <div className="mt-2">{process.last_saved_stage}</div>
//                 </div>
//                 <div className="basis-1/6 ml-20">
                  
//                   <button
//                     className="inline-block rounded bg-primary cursor-pointer px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
//                     onClick={() => handleExpand(process.id)}
//                   >
//                     {expandedId === process.id ? "Schowaj" : "Więcej"}
//                   </button>
//                 </div>
//               </div>

//               {expandedId === process.id ? (
//                 <div className="mt-4 flex">
//                   <div className="flex-1 mt-4 mr-4 p-4 bg-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)] border border-gray-200 rounded transform">
//                     <strong className="text-xl">Opis:</strong>
//                     <div>{process.description}</div>
//                     <strong>Powiązane dokumenty:</strong>
//                     {process.related_documents.length > 0 ? (
//                       <ul>
//                         {process.related_documents.map((document: any, index: any) => (
//                           <li key={index}>{document}</li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <div>Brak powiązanych dokumentów.</div>
//                     )}
//                   </div>
//                   <div className="flex-1 mt-4 p-4 bg-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.2),0_10px_20px_-2px_rgba(0,0,0,0.1)] border border-gray-200 rounded">
//                     <strong className="text-xl">Komentarze:</strong>
//                     {process.comments.length > 0 ? (
//                       process.comments.map((comment: any, index: any) => (
//                         <div key={index}>
//                           <strong>{comment.user}:</strong>
//                           <br /> {comment.comment}
//                         </div>
//                       ))
//                     ) : (
//                       <div>Brak komentarzy.</div>
//                     )}
//                   </div>
//                 </div>
//               ) : null}
//             </div>
//           </CSSTransition>
//         ))}
//       </TransitionGroup>
//     </div>
//   );
// }



  return (
    <div className="space-y-6 bg-gray-100 p-4">
      <TransitionGroup>
        {
          flow_data.map((process, index) => (
          <CSSTransition key={index} timeout={500} classNames="fade">
            <div
              className={`block rounded-lg p-4 border hover:border-blue-500 transition duration-200 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="text-xl font-semibold">{process.name}</div>
                <button
                  className="text-blue-500 hover:text-blue-600 transition duration-200"
                  onClick={() => handleExpand(process.id)}
                >
                  {expandedId === process.id ? "Schowaj" : "Więcej"}
                </button>
              </div>
              
              {expandedId === process.id && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="">
                    <strong className="text-md">Data dodania:</strong>
                    <div className="mt-1">{process.date_added}</div>
                    <strong className="text-md">Status:</strong>
                    <div className="mt-1">{process.status}</div>
                  </div>
                  <div className="">
                    <strong className="text-md">Opis:</strong>
                    <div className="mt-1">{process.description}</div>
                  </div>
                </div>
              )}
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
