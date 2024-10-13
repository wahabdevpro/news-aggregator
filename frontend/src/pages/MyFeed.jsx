import NewsFeed from "../components/pages/feed/NewsFeed";
import PageWrapper from "../components/pages/page";
import NewsService from "../services/NewsService";


/**
 * FeedPage component that displays a grid of news with pagination.
 *
 * This component displays a grid of news based on the current page and
 * allows the user to navigate between pages using the pagination component.
 *
 * @component
 */
const MyFeed = () => {

  return (

    <PageWrapper key={"page_wrapper"}>
      <NewsFeed key={"news_feed"} serviceFn={NewsService.getMyFeed} />
    </PageWrapper>


  )

};



export default MyFeed;
