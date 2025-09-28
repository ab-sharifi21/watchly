interface WatchProviderBadgeProps {
  providerName: string;
}

export const WatchProviderBadge = ({
  providerName,
}: WatchProviderBadgeProps) => {
  return (
    <span className="rounded-lg border border-primary-color px-4 py-2 text-sm font-semibold duration-300 hover:cursor-pointer hover:bg-secondary-color hover:text-black">
      {providerName}
    </span>
  );
};
