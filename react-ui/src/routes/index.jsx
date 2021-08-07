import { Route } from "react-router-dom";
import About from "./about/about";
import Landing from "./landing/landing";

const Routes = () => {
  return (
    <>
      <Route
        exact
        path="/"
        render={() => <Landing />}
      />
      <Route
        path="/about"
        render={() => <About />}
      />
    </>
  );
};

export default Routes;