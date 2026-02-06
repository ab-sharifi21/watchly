import { HomeCarousel, Slider } from '@/shared/components';
import { fetchHomePageData } from '@/shared/services';

export default async function LandingHomePage() {
  const {
    trendingMovies,
    genres,
    upcomingMovies,
    topRatedMovies,
    airingTodaySeries,
    popularSeries,
    todaysTrendingMovies,
    topRatedSeries,
  } = await fetchHomePageData();

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
        path="/series/top-series"
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
        path="/series/popular"
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
        path="/series/airing-today"
        isSeries
        useHorizontalCard
      />
    </div>
  );
}
