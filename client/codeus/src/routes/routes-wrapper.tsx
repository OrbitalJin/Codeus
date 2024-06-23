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
      <div className="absolute -z-10 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
};

export default RoutesWrapper;
