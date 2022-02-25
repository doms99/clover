import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Chart from "./components/Chart";
import NotFound from "./components/NotFound";
import TrackDetails from "./components/TrackDetails";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/chart/:chart" render={props => {
          const chartId = parseInt(props.match.params.chart);

          return isNaN(chartId) ? (
            <NotFound />
          ) : (
            <Chart chartId={Math.max(0, chartId)} />
          )
        }} />
        <Route path="/chart/:chart/track/:track" render={props => {
          const chartId = parseInt(props.match.params.chart);
          const trackId = parseInt(props.match.params.track);

          return isNaN(chartId) || isNaN(trackId) ? (
            <NotFound />
          ) : (
            <>
              <TrackDetails chartId={chartId} trackId={trackId} />
              <Chart chartId={Math.max(0, chartId)} />
            </>
          )
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
