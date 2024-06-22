import Feed from "@/components/post/feed";
import PageWrapper from "./page-wrapper";
import Banner from "./banner";

function Home() {
  return (
    <PageWrapper>
      <Banner title="Feed" />
      <Feed />
    </PageWrapper>
  );
}

export default Home;
