import Sidebar from "@/components/sidebar/sidebar";

type RoutesWrapperProps = {
  children: React.ReactNode;
};

//This lefthadnbar thingy should be its own component that conditionally renders cards based on the current route
const RoutesWrapper: React.FC<RoutesWrapperProps> = ({
  children,
}: RoutesWrapperProps) => {
  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      {children}
    </div>
  );
};

export default RoutesWrapper;
