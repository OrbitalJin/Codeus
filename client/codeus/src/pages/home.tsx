import SideBar from "@/components/sidebar/Sidebar";
import PostList from "@/components/post/PostList";

function Home() {
  return (
    <div className="flex flex-row h-screen">
      <SideBar />
      <main className="flex justify-center flex-1 overflow-y-auto">
        <PostList />
        <div className="grow border-l h-full "></div>
      </main>
    </div>
  );
}

export default Home;
