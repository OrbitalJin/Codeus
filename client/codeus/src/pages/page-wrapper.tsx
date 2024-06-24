import AlwaysOnCard from "@/components/always-on-card";

type PageWrapperProps = {
  children: React.ReactNode;
};

// TODO
const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
}: PageWrapperProps) => {
  return (
    <main className="flex justify-center grow overflow-y-auto">
      <div id="container" className="flex-1 flex flex-col">
        {children}
      </div>
      <AlwaysOnCard />
    </main>
  );
};

export default PageWrapper;
