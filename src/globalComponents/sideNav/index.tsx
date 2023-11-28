// @ts-nocheck
import {
  ArrowDownCircleFill,
  Gear,
  House,
  List,
  PersonBoundingBox,
  StarFill,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { initTE, Ripple, Sidenav } from "tw-elements";
import {useAuth} from "../../_hooks/auth";
import SessionCounter from "../SessionCounter";

export const SideNavComponent = () => {
  const {logout} = useAuth()
  useEffect(() => {
    initTE({ Sidenav, Ripple });
  });

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

  return (
    <>
      <header>
        <nav
          id="sidenav-1"
          className="fixed left-0 top-0 z-[1035] h-screen w-60 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] bg-zinc-800 xl:data-[te-sidenav-hidden='false']:translate-x-0"
          data-te-sidenav-init
          data-te-sidenav-hidden="false"
          data-te-sidenav-mode-breakpoint-over="0"
          data-te-sidenav-mode-breakpoint-side="xl"
          data-te-sidenav-accordion="true"
        >
          <span className="mb-3 flex items-center justify-center py-6 outline-none">
            <img
              id="alab-logo"
              className="mr-2 w-6"
              src="/logoalab.png"
              alt="Alab Logo"
              draggable="false"
            />
            <span className={"text-white font-bold text-[20px] pt-1"}>
              AlabFlow
            </span>
          </span>

          <ul
            className="relative m-0 list-none px-[0.2rem]"
            data-te-sidenav-menu-ref
          >
            <li className="relative m-0 list-none px-[0.2rem]">
              <Link
                to={"/home"}
                className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.975rem] outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none text-gray-300 hover:bg-white/10 focus:bg-white/10 active:bg-white/10"
                data-te-sidenav-link-ref
              >
                <span className="mr-4">
                  <House />
                </span>
                <span>Panel główny</span>
              </Link>
            </li>
            <li className="relative">
              <a
                className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.975rem]  outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none text-gray-300 hover:bg-white/10 focus:bg-white/10 active:bg-white/10"
                data-te-sidenav-link-ref
              >
                <span className="mr-4">
                  <Gear />
                </span>
                <span>Proces</span>
                <span
                  className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 motion-reduce:transition-none [&>svg]:h-3 [&>svg]:w-3 [&>svg]:fill-gray-600 group-hover:[&>svg]:fill-primary-600 group-focus:[&>svg]:fill-primary-600 group-active:[&>svg]:fill-primary-600 group-[te-sidenav-state-active]:[&>svg]:fill-primary-600 [&>svg]:fill-gray-300"
                  data-te-sidenav-rotate-icon-ref
                >
                  <ArrowDownCircleFill />
                </span>
              </a>
              <ul
                className="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block"
                data-te-sidenav-collapse-ref
              >
                <li className="relative">
                  <Link
                    to={"/globalComponents/processDetail"}
                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.85rem]  outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none text-gray-300 hover:bg-white/10 focus:bg-white/10 active:bg-white/10"
                    data-te-sidenav-link-ref
                  >
                    Procesy
                  </Link>
                </li>
                <li className="relative">
                  <Link
                    to={"/flow/create"}
                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.85rem]  outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none text-gray-300 hover:bg-white/10 focus:bg-white/10 active:bg-white/10"
                    data-te-sidenav-link-ref
                  >
                    Nowy proces
                  </Link>
                </li>
              </ul>
            </li>

            <li className="relative">
              <a
                className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.975rem]  outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none text-gray-300 hover:bg-white/10 focus:bg-white/10 active:bg-white/10"
                data-te-sidenav-link-ref
              >
                <span className="mr-4 [&>svg]:h-3.5 [&>svg]:w-3.5 [&>svg]:fill-gray-400 [&>svg]:transition [&>svg]:duration-300 [&>svg]:ease-linear group-hover:[&>svg]:fill-primary-600 group-focus:[&>svg]:fill-primary-600 group-active:[&>svg]:fill-primary-600 group-[te-sidenav-state-active]:[&>svg]:fill-primary-600 motion-reduce:[&>svg]:transition-none dark:[&>svg]:fill-gray-300 dark:group-hover:[&>svg]:fill-gray-300 ">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                  </svg>
                </span>
                <span>Password</span>
                <span
                  className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 motion-reduce:transition-none [&>svg]:h-3 [&>svg]:w-3 [&>svg]:fill-gray-600 group-hover:[&>svg]:fill-primary-600 group-focus:[&>svg]:fill-primary-600 group-active:[&>svg]:fill-primary-600 group-[te-sidenav-state-active]:[&>svg]:fill-primary-600 dark:[&>svg]:fill-gray-300"
                  data-te-sidenav-rotate-icon-ref
                >
                  <ArrowDownCircleFill />
                </span>
              </a>
              <ul
                className="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block"
                data-te-sidenav-collapse-ref
              >
                <li className="relative">
                  <a
                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.85rem]  outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none text-gray-300 hover:bg-white/10 focus:bg-white/10 active:bg-white/10"
                    data-te-sidenav-link-ref
                  >
                    Request password
                  </a>
                </li>
                <li className="relative">
                  <a
                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.85rem]  outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none text-gray-300 hover:bg-white/10 focus:bg-white/10 active:bg-white/10"
                    data-te-sidenav-link-ref
                  >
                    Reset password
                  </a>
                </li>
              </ul>
            </li>

            <li className="relative">
              <a
                className="group flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.975rem]  outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none text-gray-300 hover:bg-white/10 focus:bg-white/10 active:bg-white/10"
                data-te-sidenav-link-ref
              >
                <span className="mr-4">
                  <StarFill />
                </span>
                <span>Użytkownicy</span>
                <span
                  className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 motion-reduce:transition-none [&>svg]:h-3 [&>svg]:w-3 [&>svg]:fill-gray-600 group-hover:[&>svg]:fill-primary-600 group-focus:[&>svg]:fill-primary-600 group-active:[&>svg]:fill-primary-600 group-[te-sidenav-state-active]:[&>svg]:fill-primary-600 [&>svg]:fill-gray-300"
                  data-te-sidenav-rotate-icon-ref
                >
                  <ArrowDownCircleFill />
                </span>
              </a>
              <ul
                className="show !visible relative m-0 hidden list-none p-0 data-[te-collapse-show]:block"
                data-te-sidenav-collapse-ref
              >
                <li className="relative">
                  <a
                    className="flex h-6 cursor-pointer items-center truncate rounded-[5px] py-4 pl-[3.4rem] pr-6 text-[0.85rem]  outline-none transition duration-300 ease-linear hover:bg-primary-400/10 hover:text-primary-600 hover:outline-none focus:bg-primary-400/10 focus:text-primary-600 focus:outline-none active:bg-primary-400/10 active:text-primary-600 active:outline-none data-[te-sidenav-state-active]:text-primary-600 data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none text-gray-300 hover:bg-white/10 focus:bg-white/10 active:bg-white/10"
                    data-te-sidenav-link-ref
                  >
                    <Link to="/pages/addUser" className="ml-1">
                      Panel użytkowników
                    </Link>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <nav
                    id="main-navbar"
                    className="z-50 fixed left-0 right-0 top-0 flex w-full flex-nowrap items-center justify-between bg-white py-[0.6rem] text-gray-500 shadow-lg hover: focus: bg-zinc-700 lg:flex-wrap lg:justify-start xl:pl-60"
                    data-te-navbar-ref>
                    <div
                        className="flex w-full flex-wrap items-center justify-between px-4">
                        <button
                            data-te-sidenav-toggle-ref
                            data-te-target="#sidenav-1"
                            className="block border-0 bg-transparent px-2.5 text-gray-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 xl:hidden"
                            aria-controls="#sidenav-1"
                            aria-haspopup="true">
          <span className="block">
            <List/>
          </span>
                        </button>

                        <form
                            className="relative ml-4 mr-auto flex flex-wrap items-stretch xl:mx-0 ">
                            <input
                                autoComplete="off"
                                type="search"
                                className="relative m-0 inline-block w-[1%] min-w-[225px] flex-auto rounded border border-solid border-gray-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal  transition duration-300 ease-in-out focus:border-primary-600 focus: focus:shadow-te-primary focus:outline-none text-gray-200 placeholder:text-gray-200"
                                placeholder='Search (ctrl + "/" to focus)'/>
                            <span
                                className="flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal  text-gray-200 [&>svg]:w-4"
                                id="basic-addon2">
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
              <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
            </svg>
          </span>
                        </form>
                      
                        <ul className="relative flex items-center ">
                          <SessionCounter  />
                            <li className="relative ">
                                <button
                                    className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                                    id="navbarDropdownMenuLink"
                                    aria-expanded="false">
                                    <PersonBoundingBox onClick={() => setDropdownIsOpen(!dropdownIsOpen)}
                                                       className={'text-white text-[20px]'}/>
                                </button>
                                
                                <ul
                                    className={`absolute left-auto right-0 z-[1000] float-left m-0 mt-1 min-w-[10rem] list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg bg-zinc-700 ${!dropdownIsOpen && 'hidden'}`}
                                    aria-labelledby="dropdownMenuButton1"
                                    onMouseLeave={() => setDropdownIsOpen(false)}>
                                    <li>
                                      
                                      <Link to="pages/profile">
                                        <button
                                            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal  hover:bg-gray-100 active:text-zinc-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-gray-400 text-gray-200 hover:bg-white/30"
                                        >Mój profil
                                        </button>
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={logout}
                                            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal  hover:bg-gray-100 active:text-zinc-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-gray-400 text-gray-200 hover:bg-white/30"
                                        >Wyloguj
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}