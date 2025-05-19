import React, { useState } from "react";
import { LogoIcon } from "../Icons/LogoIcon";
import { useNavigate } from "react-router-dom";

type MenuItem = {
  title: string;
  children?: string[];
};

const menuItems: MenuItem[] = [
  { title: "Главная" },
  {
    title: "Текущее состояние",
    children: [
      "Динамика и управление",
      "Качество запасов",
      "Данные по проектам",
      "Сценарии",
      "Сравнение сценариев",
      "Администрирование",
    ],
  },
];

// соответствие пунктов меню маршрутам
const routeMap: Record<string, string> = {
  Главная: "/TestG",
  "Динамика и управление": "/TestG/editable",
  "Качество запасов": "/TestG/quality",
  "Данные по проектам": "/TestG/projects",
  Сценарии: "/TestG/scenarios",
  "Сравнение сценариев": "/TestG/compare",
  Администрирование: "/TestG/admin",
};

export const SidebarMenu: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("Динамика и управление");
  const [openItem, setOpenItem] = useState<string | null>("Текущее состояние");
  const navigate = useNavigate();

  const toggleOpen = (title: string) =>
    setOpenItem((prev) => (prev === title ? null : title));

  const isActive = (title: string, children?: string[]) => {
    if (activeItem === title) return true;
    return Boolean(children && children.includes(activeItem));
  };

  const handleClick = (title: string) => {
    setActiveItem(title);
    const route = routeMap[title];
    if (route) navigate(route);
  };

  return (
    <div className="flex flex-col w-60 min-h-screen bg-[#0070C0] text-white font-medium overflow-y-auto">
      <div className="flex flex-col items-center py-4">
        <LogoIcon />
      </div>

      <ul className="space-y-2 w-full px-4">
        {menuItems.map((item) => {
          const parentActive = isActive(item.title, item.children);

          return (
            <li key={item.title}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleOpen(item.title)}
                    className={`w-full flex items-center justify-between px-2 py-1 text-left hover:text-gray-300 hover:bg-white/10 ${
                      parentActive ? "bg-white/20 rounded-md" : ""
                    }`}
                  >
                    <span>{item.title}</span>
                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        openItem === item.title ? "rotate-90" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {openItem === item.title && (
                    <ul className="pl-4 mt-1 space-y-1 text-sm">
                      {item.children.map((child) => (
                        <li key={child}>
                          <button
                            className={`block w-full text-left px-2 py-1 hover:text-gray-300 hover:bg-white/10 rounded-md ${
                              activeItem === child ? "bg-white/20" : ""
                            }`}
                            onClick={() => handleClick(child)}
                          >
                            {child}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <button
                  className={`block w-full text-left px-2 py-1 hover:text-gray-300 hover:bg-white/10 rounded-md ${
                    activeItem === item.title ? "bg-white/20" : ""
                  }`}
                  onClick={() => handleClick(item.title)}
                >
                  {item.title}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
