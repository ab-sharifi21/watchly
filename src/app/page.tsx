import { HomeCarousel, Slider } from '@/components';
import { getAiringTodaySeries } from '@/services/getAiringTodaySeries';
import { getMoviesGenres } from '@/services/getMovieGenres';
import { getPopularSeries } from '@/services/getPopularSeries';
import { getTopRatedMovies } from '@/services/getTopRatedMovies';
import { getTrendingMovies } from '@/services/getTrendingMovies';
import { getUpcomingMovies } from '@/services/getUpcomingMovies';

export default async function LandingHomePage() {
  const { results: trendingMovies } = await getTrendingMovies();
  const { genres } = await getMoviesGenres();
  const { results: topRatedMovies } = await getTopRatedMovies();
  const { results: upcomingMovies } = await getUpcomingMovies();
  const { results: popularSeries } = await getPopularSeries();
  const { results: airingTodaySeries } = await getAiringTodaySeries();
  console.log(airingTodaySeries);

  return (
    <div className="">
      <HomeCarousel movies={trendingMovies} genres={genres} />
      <Slider
        data={upcomingMovies}
        title="Upcoming movies"
        path="/upcoming-movies"
      />
      <Slider
        data={popularSeries}
        title="Popular series"
        path="/popular-series"
        isSeries
      />
      <Slider
        data={topRatedMovies}
        title="Top rated movies"
        path="/top-movies"
      />
      <Slider
        data={airingTodaySeries}
        title="Series airing today"
        path="/airing-today-series"
        isSeries
      />
    </div>
  );
}
