import { MoviesContent } from '@/components';
import { paths } from '@/constants/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Watchly - on the air',
    description: 'Experience live entertainment',
};

export default function TopRatedSeriesPage() {
    return (
        <>
            <h1 className="mb-4 ml-4 mt-16 text-2xl font-bold text-primary-color">
                Experience live entertainment
            </h1>
            <MoviesContent path={paths.onTheAirSeries} isSeries />
        </>
    );
}
