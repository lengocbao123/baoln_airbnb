import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ServerWithMembersWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import ServerHeader from "./server-header";

interface ServerSidebarProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}
const ServerSidebar = async ({ server, role }: ServerSidebarProps) => {
  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2b2d31] bg-[#f2f3f5]">
      <ServerHeader server={server} role={role} />
    </div>
  );
};

export default ServerSidebar;
