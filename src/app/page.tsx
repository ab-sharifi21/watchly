import { HomeCarousel, Slider } from '@/components';
import { paths } from '@/constants/constants';
import { getMoviesGenres, getMovies, getSeries } from '@/services';

export default async function LandingHomePage() {
  const { results: trendingMovies } = await getMovies({
    path: paths.trendingMovies,
  });
  const { genres } = await getMoviesGenres();
  const { results: topRatedMovies } = await getMovies({
    path: paths.topRatedMovies,
  });
  const { results: upcomingMovies } = await getMovies({
    path: paths.upcomingMovies,
  });
  const { results: popularSeries } = await getSeries({
    path: paths.popularSeries,
  });
  const { results: airingTodaySeries } = await getSeries({
    path: paths.airingTodaySeries,
  });
  const { results: topRatedSeries } = await getSeries({
    path: paths.topRatedSeries,
  });
  const { results: todaysTrendingMovies } = await getMovies({
    path: paths.todaysTrendingovies,
  });

  return (
    <div className="">
      <HomeCarousel data={trendingMovies} genres={genres} />
      <Slider
        data={upcomingMovies}
        title="Exciting upcoming movies await!"
        path="movies/upcoming-movies"
      />
      <Slider
        data={topRatedSeries}
        title="Dive into the top-rated shows"
        path="/top-series"
        isSeries
        useHorizontalCard
      />
      <Slider
        data={topRatedMovies}
        title="Uncover the best-rated movies!"
        path="movies/top-movies"
      />
      <Slider
        data={popularSeries}
        title="Check out popular series everyone is talking about"
        path="/popular-series"
        isSeries
        useHorizontalCard
      />
      <Slider
        data={todaysTrendingMovies}
        title="Catch today's trending movies"
        path="movies/trending-movies"
      />
      <Slider
        data={airingTodaySeries}
        title="Check out the series airing today"
        path="/airing-today-series"
        isSeries
        useHorizontalCard
      />
    </div>
  );
}
