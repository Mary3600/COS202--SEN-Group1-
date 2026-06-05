import SidebarContainer from "../../components/SidebarContainer";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-screen h-screen overflow-hidden bg-slate-50 text-slate-900">
      <SidebarContainer />

      {/* Main content (Calendar, Dashboard, Archive) sits on the right and fills the remaining space */}
      <main className="flex-1 h-full overflow-y-auto bg-white">
        {children}
      </main>
    </div>
  );
}