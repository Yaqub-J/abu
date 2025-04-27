import { role } from "@/lib/data";
import Link from "next/link";
import {
  Home,
  Users,
  UserSquare2,
  Calendar,
  FolderKanban,
  Heart,
  User,
  Settings,
  LogOut
} from "lucide-react";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: Home,
        label: "Home",
        href: "/dash",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: Users,
        label: "My Network",
        href: "/list/teachers",
        visible: ["admin", "teacher"],
      },
      {
        icon: UserSquare2,
        label: "Groups",
        href: "/list/students",
        visible: ["admin", "teacher"],
      },
      {
        icon: Calendar,
        label: "Events",
        href: "/list/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: FolderKanban,
        label: "Projects",
        href: "/list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: Heart,
        label: "Donations",
        href: "/list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: User,
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: Settings,
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: LogOut,
        label: "Logout",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              const IconComponent = item.icon;
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-800 py-2 md:px-2 rounded-lg hover:bg-green-600 hover:text-white transition duration-200 ease-in-out"
                >
                  <IconComponent size={20} className="text-green-600 hover:text-white" />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
