import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { fetchGenres, fetchTracks } from "../../redux/thunks";
import Chart from "../Chart";
import NotFound from "../NotFound";
import TrackDetails from "../TrackDetails";

export type Props = {
  chartId: number,
  trackId?: number
}

const ValidateAndFetch: React.FC<Props> = ({ chartId, trackId }) => {
  const loaded = useSelector(state => state.app.loaded);
  const chart = useSelector(state => state.app.charts[chartId]);
  const dispatch = useDispatch();

  // Fetch genres if not loaded
  useEffect(() => {
    if(loaded) return;

    dispatch(fetchGenres());
  }, [dispatch, loaded]);

  // Fetch tracks if not loaded
  useEffect(() => {
    if(!loaded || (chart && chart.loaded)) return;

    dispatch(fetchTracks(chartId));
  }, [dispatch, loaded, chartId, chart]);

  let invalid = (loaded && !chart) ||
                (loaded && trackId !== undefined && chart && chart.loaded &&
                !chart.tracks[trackId]);

  return (
    invalid ? (
      <NotFound />
    ) : (
      <>
        {(trackId !== undefined && chart && chart.loaded) && <TrackDetails chartId={chartId} trackId={trackId} />}
        <Chart chartId={Math.max(0, chartId)} />
      </>
    )
  )
}

export default ValidateAndFetch;