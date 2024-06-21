import SideBar from "@/components/sidebar/Sidebar";

type PageWrapperProps = {
  children: React.ReactNode;
};

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
}: PageWrapperProps) => {
  return (
    <div className="flex flex-row h-screen">
      <SideBar />
      <main className="flex justify-center flex-1 overflow-y-auto">
        <div id="container" className="flex-1 flex flex-col">
          {children}
        </div>
        <div className="grow border-l h-full" />
      </main>
    </div>
  );
};

export default PageWrapper;
