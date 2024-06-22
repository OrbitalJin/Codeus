type PageWrapperProps = {
  children: React.ReactNode;
};

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
}: PageWrapperProps) => {
  return (
    <main className="flex justify-center flex-1 overflow-y-auto">
      <div id="container" className="flex-1 flex flex-col">
        {children}
      </div>
      <div className="grow border-l h-screen sticky top-0" />
    </main>
  );
};

export default PageWrapper;
