import ErrorBoundary from "./components/global/ErrorBoundry";
import MainAppComponent from "./MainAppComponent";

ErrorBoundary

const App = () => {

  return (
    <ErrorBoundary key={"error"}>
      <MainAppComponent key={"mainAppComp"} />
    </ErrorBoundary>
  )


};




export default App;
