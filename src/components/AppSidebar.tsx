import {
  IdCard,
  Building2,
  CreditCard,
  Vote,
  BadgeCheck,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useMatch, useResolvedPath } from "react-router";

interface IMenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

// Menu items.
const items: IMenuItem[] = [
  {
    title: "NID Card Service",
    url: "/nid_card_service",
    icon: IdCard,
  },
  {
    title: "Company Registration OCR",
    url: "company_registration_ocr",
    icon: Building2,
  },
  {
    title: "PAN ID Service",
    url: "pan_id_service",
    icon: CreditCard,
  },
  {
    title: "Election Services",
    url: "election_services",
    icon: Vote,
  },
  {
    title: "License Details",
    url: "license_details",
    icon: BadgeCheck,
  },
  {
    title: "Data Explorer",
    url: "data_explorer",
    icon: BarChart3,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant={"floating"} collapsible={"icon"}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItemLink
                  key={item.title}
                  path={item.url}
                  label={item.title}
                  Icon={item.icon}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

//Sidebar Menu Item component child.
interface MenuItemProp {
  path: string;
  label: string;
  Icon: LucideIcon;
}

function SidebarMenuItemLink({ path, label, Icon }: MenuItemProp) {
  const resolved = useResolvedPath(path);
  const isActive = useMatch({ path: resolved.pathname, end: true });

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        tooltip={label}
        // isActive={!!isActive}
        className={`${
          isActive
            ? "bg-gradient-to-l from-violet-500 to-purple-500 text-white hover:text-white  active:text-white active:scale-95 transition-all duration-100 ease-in-out"
            : "hover:bg-gradient-to-l from-violet-500/65 to-purple-500/65 hover:text-white active:text-white active:scale-95 transition duration-75 ease-in-out"
        }`}
      >
        <Link to={path}>
          <Icon />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
