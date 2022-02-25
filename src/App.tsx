import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import ValidateAndFetch from "./components/validator/ValidateAndFetch";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={["/chart/:chart/track/:track", "/chart/:chart"]} render={props => {
          const { chart, track } = props.match.params as any;
          const chartId = parseInt(chart);
          const trackId = track ? parseInt(track) : undefined;

          return <ValidateAndFetch chartId={chartId} trackId={trackId} />
        }} />
        <Redirect exact from="/" to="/chart/0" />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter >
  );
}

export default App;
