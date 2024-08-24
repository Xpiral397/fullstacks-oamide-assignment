import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Logo, MenuIcon} from "./logo"
import {FaHome, FaCode, FaList, FaCog} from 'react-icons/fa';

const Sidebar=() => {
  const [select, setSelectedItem]=useState('sys')
  return (
    <div className="hidden md:block min-w-[250px] w-[240px]  bg-[#101828] h-full p-4 rounded-[24px]">
      <div className="flex justify-between py-5  ">
        <Logo />
        <MenuIcon />
      </div>
      <ul className="space-y-5">
        <div className=' bg-[#1D2939] rounded-lg py-1'>
          <li onClick={() => setSelectedItem('sys')} className={select=='sys'? `py-1 px-6  bg-[#9FF443] rounded-2xl`:'p-3'}>
            <Link to="/" className="flex items-center text-gray-700   p-2 rounded ">
              <svg className='mr-2 -mx-1' width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H8L10 2H18C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2Z" fill="white" />
              </svg>

              <span className=' text-[15px] mx-6 text-[#FFFFFF] font-[500] font-jakarten'>
                Systems
              </span>
            </Link>
          </li>
          <li onClick={() => setSelectedItem('syscode')} className={select=='syscode'? `py-1 px-6  bg-[#9FF443] rounded-2xl`:'p-3'}>
            <Link to="/" className="flex items-center text-gray-700   p-2 rounded">
              <svg className='mr-2 -mx-1 ' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3.65625" y="3.66992" width="6.69214" height="6.69336" rx="1" stroke="#667085" />
                <rect x="3.65625" y="13.6523" width="6.69214" height="6.69336" rx="1" stroke="#667085" />
                <rect x="13.6539" y="13.6523" width="6.69214" height="6.69336" rx="1" stroke="#667085" />
                <circle cx="16.9871" cy="7.04102" r="3.69067" stroke="#667085" />
              </svg>
              <span className=' text-[15px] mx-5 font-[500] font-jakarten text-[#667085]'>
                System Code
              </span>
            </Link>
          </li>
          <li onClick={() => setSelectedItem('props')} className={select=='props'? `py-1 px-6  bg-[#9FF443] rounded-2xl`:'p-3'}>
            <Link to="/" className="flex items-center text-gray-700   p-2 rounded">
              <svg className='mr-2' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 7.5H2C1.45 7.5 0.979167 7.30417 0.5875 6.9125C0.195833 6.52083 0 6.05 0 5.5V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H5.5C6.05 0 6.52083 0.195833 6.9125 0.5875C7.30417 0.979167 7.5 1.45 7.5 2V5.5C7.5 6.05 7.30417 6.52083 6.9125 6.9125C6.52083 7.30417 6.05 7.5 5.5 7.5ZM2 5.5H5.5V2H2V5.5ZM5.5 18H2C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V12.5C0 11.95 0.195833 11.4792 0.5875 11.0875C0.979167 10.6958 1.45 10.5 2 10.5H5.5C6.05 10.5 6.52083 10.6958 6.9125 11.0875C7.30417 11.4792 7.5 11.95 7.5 12.5V16C7.5 16.55 7.30417 17.0208 6.9125 17.4125C6.52083 17.8042 6.05 18 5.5 18ZM2 16H5.5V12.5H2V16ZM16 7.5H12.5C11.95 7.5 11.4792 7.30417 11.0875 6.9125C10.6958 6.52083 10.5 6.05 10.5 5.5V2C10.5 1.45 10.6958 0.979167 11.0875 0.5875C11.4792 0.195833 11.95 0 12.5 0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V5.5C18 6.05 17.8042 6.52083 17.4125 6.9125C17.0208 7.30417 16.55 7.5 16 7.5ZM12.5 5.5H16V2H12.5V5.5ZM16 18H12.5C11.95 18 11.4792 17.8042 11.0875 17.4125C10.6958 17.0208 10.5 16.55 10.5 16V12.5C10.5 11.95 10.6958 11.4792 11.0875 11.0875C11.4792 10.6958 11.95 10.5 12.5 10.5H16C16.55 10.5 17.0208 10.6958 17.4125 11.0875C17.8042 11.4792 18 11.95 18 12.5V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18ZM12.5 16H16V12.5H12.5V16Z" fill="#667085" />
              </svg>
              <span className=' text-[15px] mx-6 text-[#667085]  font-[500] font-jakarten'>
                Properties
              </span>
            </Link>
          </li>
          <li onClick={() => setSelectedItem('menu')} className={select=='menu'? `py-1 px-6  bg-[#9FF443] rounded-2xl`:'p-3'}>

            <Link to="/menus" className="flex items-center text-gray-700   p-2 rounded">
              <svg className='mr-2 -mx-1' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3.65625" y="3.66992" width="6.69214" height="6.69336" rx="1" fill="#667085" />
                <rect x="3.65625" y="13.6523" width="6.69214" height="6.69336" rx="1" fill="#667085" />
                <rect x="13.6539" y="13.6523" width="6.69214" height="6.69336" rx="1" fill="#667085" />
                <circle cx="16.9871" cy="7.04102" r="3.69067" fill="#667085" />
              </svg>

              <span className=' text-[15px] mx-6 text-[#667085]  font-[500] font-jakarten'>
                Menus
              </span>
            </Link>
          </li>
          <li onClick={() => setSelectedItem('api')} className={select=='api'? `py-1 px-6  bg-[#9FF443] rounded-2xl`:'p-3'}>

            <Link to="/" className="flex items-center text-gray-700   p-2 rounded">
              <svg className='mr-2' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 7.5H2C1.45 7.5 0.979167 7.30417 0.5875 6.9125C0.195833 6.52083 0 6.05 0 5.5V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H5.5C6.05 0 6.52083 0.195833 6.9125 0.5875C7.30417 0.979167 7.5 1.45 7.5 2V5.5C7.5 6.05 7.30417 6.52083 6.9125 6.9125C6.52083 7.30417 6.05 7.5 5.5 7.5ZM2 5.5H5.5V2H2V5.5ZM5.5 18H2C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V12.5C0 11.95 0.195833 11.4792 0.5875 11.0875C0.979167 10.6958 1.45 10.5 2 10.5H5.5C6.05 10.5 6.52083 10.6958 6.9125 11.0875C7.30417 11.4792 7.5 11.95 7.5 12.5V16C7.5 16.55 7.30417 17.0208 6.9125 17.4125C6.52083 17.8042 6.05 18 5.5 18ZM2 16H5.5V12.5H2V16ZM16 7.5H12.5C11.95 7.5 11.4792 7.30417 11.0875 6.9125C10.6958 6.52083 10.5 6.05 10.5 5.5V2C10.5 1.45 10.6958 0.979167 11.0875 0.5875C11.4792 0.195833 11.95 0 12.5 0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V5.5C18 6.05 17.8042 6.52083 17.4125 6.9125C17.0208 7.30417 16.55 7.5 16 7.5ZM12.5 5.5H16V2H12.5V5.5ZM16 18H12.5C11.95 18 11.4792 17.8042 11.0875 17.4125C10.6958 17.0208 10.5 16.55 10.5 16V12.5C10.5 11.95 10.6958 11.4792 11.0875 11.0875C11.4792 10.6958 11.95 10.5 12.5 10.5H16C16.55 10.5 17.0208 10.6958 17.4125 11.0875C17.8042 11.4792 18 11.95 18 12.5V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18ZM12.5 16H16V12.5H12.5V16Z" fill="#667085" />
              </svg>
              <span className=' text-[15px] mx-6 text-[#667085]  font-[500] font-jakarten'>
                API List
              </span>
            </Link>
          </li>
        </div>
        <li onClick={() => setSelectedItem('urs-grp')} className={select=='urs-grp'? `py-1 px-6  bg-[#9FF443] rounded-2xl `:' p-3'}>
          <Link to="/" className="flex items-center text-gray-700   p-2 rounded">
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H8L10 2H18C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM2 14H18V4H9.175L7.175 2H2V14Z" fill="#475467" />
            </svg>

            <span className=' text-[15px] mx-6 text-[#667085]  font-[500] font-jakarten'>
              Users & Group
            </span>
          </Link>
        </li>
        <li onClick={() => setSelectedItem('comp2')} className={select=='comp2'? `comp py-1 px-6  bg-[#9FF443] rounded-2xl`:' p-3'}>
          <Link to="/" className="flex items-center text-gray-700   p-2 rounded">
            <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H8L10 2H18C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM2 14H18V4H9.175L7.175 2H2V14Z" fill="#475467" />
            </svg>
            <span className=' text-[15px] mx-6 text-[#667085]  font-[500] font-jakarten'>
              Competition
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
