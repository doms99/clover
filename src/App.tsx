import { useEffect, useState } from 'react';
import { Track } from './api/types';
import Chart from './components/Chart';

function App() {
  const [tracks, setTracks] = useState<Track[]>();

  useEffect(() => {
    fetch('/chart/0/tracks')
    .then(res => res.json())
    .then(res => setTracks(res.data));
  }, []);

  return (
    <Chart
      img='https://e-cdns-images.dzcdn.net/images/misc/db7a604d9e7634a67d45cfc86b48370a/1000x1000-000000-80-0-0.jpg'
      name='Rap/Hip Hop'
      tracks={tracks}
    />
  );
}

export default App;
