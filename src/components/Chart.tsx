import { memo, useCallback, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { TrackApi as TrackType } from "../api/types";
import { useScreenMinHeight } from "../hooks";
import Arrow from "../icons/Arrow";
import { useSelector } from "../redux/hooks";
import Header from "./Header"
import Navigation from "./Navigation";
import Track from "./Track"

type Sort = "rank" | "asc" | "desc";

const defaultChart = {
  name: "Best Chart",
  img: ""
}

export type Props = {
  chartId: number
}

const Chart: React.FC<Props> = ({ chartId }) => {
  const [sort, setSort] = useState<Sort>("rank");
  const loaded = useSelector(state => state.app.loaded);
  const chartIds = useSelector(state => Object.keys(state.app.charts))
  const chart = useSelector(state => state.app.charts[chartId]);
  const history = useHistory();

  const props = loaded ?{
    name: chart.data.name,
    img: chart.data.picture_big
  } : defaultChart;

  let sortedTracks = useMemo(() => {
    if(!chart || !chart.loaded) return;

    switch(sort) {
      case "asc": {
        return Object.values(chart.tracks).sort((a, b) => a.duration - b.duration);
      }
      case "desc": {
        return Object.values(chart.tracks).sort((a, b) => b.duration - a.duration);
      }
      default: {
        return Object.values(chart.tracks).sort((a, b) => a.position - b.position);
      }
    }
  }, [chart, sort]);

  const onSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value as Sort)
  }, []);

  const next = useCallback(() => {
    const next = (chartIds.indexOf(chartId.toString())+1 + chartIds.length) % chartIds.length;
    history.push(`/chart/${chartIds[next]}`)
  }, [chartId, chartIds, history]);

  const previous = useCallback(() => {
    const prev = (chartIds.indexOf(chartId.toString())-1 + chartIds.length) % chartIds.length;
    history.push(`/chart/${chartIds[prev]}`)
  }, [chartId, chartIds, history]);

  return (
    <ChartView
      loading={!loaded}
      img={props.img}
      name={props.name}
      tracks={sortedTracks}

      onSortChange={onSortChange}
      previous={previous}
      next={next}
    />
  )
}

export default memo(Chart);

export type ViewProps = {
  loading?: boolean,
  img: string,
  name: string,
  tracks?: TrackType[],

  onSortChange: React.ChangeEventHandler<HTMLSelectElement>,
  next: () => void,
  previous: () => void
}

export const ChartView: React.FC<ViewProps> = (props) => {
  const ref = useScreenMinHeight<HTMLDivElement>();
  const { loading, img, name, tracks, onSortChange, next, previous } = props;
  const length = tracks ? tracks.length : 10;

  return (
    <div ref={ref} className={`grid grid-layout-lite md:grid-layout-full ${loading && "loading"}`}>
      <Header
        img={img}
      >
        <h3 className="text-xl md:text-3xl mb-2 font-light">
          <span className="font-semibold">Top</span> {length}
        </h3>
        <h1 className="text-title-md lg:text-title-lg xl:text-title font-bold">
          {name}
        </h1>
        <div className="md:hidden absolute right-0 top-0 drop-shadow-sm">
          <button
            onClick={previous}
            className="inline-flex flex-center aspect-square
                      h-12 p-4 mr-4 btn-transparent rounded-full"
          >
            <Arrow className="stroke-white h-full m-auto" />
          </button>
          <button
            onClick={next}
            className="inline-flex flex-center aspect-square
                      h-12 p-4 btn-transparent rounded-full"
          >
            <Arrow className="stroke-white h-full m-auto rotate-180" />
          </button>
        </div>
      </Header>
      <Navigation>
        <div className="w-max m-auto ">
          <button
            onClick={previous}
            className="inline-flex flex-center aspect-square
                      h-12 p-4 mr-4 btn rounded-full"
          >
            <Arrow className="stroke-slate-300 h-full m-auto" />
          </button>
          <button
            onClick={next}
            className="inline-flex flex-center aspect-square
                      h-12 p-4 btn rounded-full"
          >
            <Arrow className="stroke-slate-300 h-full m-auto rotate-180" />
          </button>
        </div>
      </Navigation>
      <main className="grid-content w-full py-8 bg-slate-100">
        <div className="flex justify-between mb-6 mx-8 md:mx-16">
          <h3 className="text-xl font-medium">Tracks</h3>
          <select
            name="order"
            id="order"
            placeholder="Sort by"
            defaultValue={"rank"}
            onChange={onSortChange}
          >
            <option value="rank">Rank</option>
            <option value="asc">Shorter first</option>
            <option value="desc">Longer first</option>
          </select>
        </div>
        <section className={
            `grid-track
            lg:grid-rows-${Math.ceil(length/2)}
            2xl:grid-rows-${Math.ceil(length/3)}`
        }>
          {!tracks ? (
            Array.from(Array(10).keys()).map((i) => <Track key={'loader'+i}/>)
          ) : (
            tracks.map((track) => (
              <Track
                key={`${name}-${track.id}`}
                track={track}
              />
            ))
          )}
        </section>
      </main>
    </div>
  );
}