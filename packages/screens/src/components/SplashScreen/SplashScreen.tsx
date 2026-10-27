import { useQuery } from '@tanstack/react-query';
import { SplashScreen } from '@ValenceUI/SplashScreen';
import { Logo } from '@ValenceUI/Logo';
import { appearanceQueries } from '@ValenceClient/query/appearanceQueries';
import { say } from '@ValenceI18n/say';
import type { SplashScreenProps as UISplashScreenProps } from '@ValenceUI/SplashScreen.types';

type SplashScreenProps = Omit<UISplashScreenProps, 'brand' | 'mark' | 'name'> & {
  mark?: React.ReactNode;
};

/**
 * A splash screen that fetches the server's custom brand (logo + name) and passes it to the UI
 * component. This mirrors the pattern used by BrandMark in the navbar — always using the
 * fetched brand name, with no override.
 *
 * @param mark - Optional override for the mark (falls back to fetched brand logo or Valence logo)
 */
export const SplashScreenWithBrand = ({ mark: markProp, label, ...props }: SplashScreenProps) => {
  const brandQuery = useQuery(appearanceQueries.appearance());
  const fetchedBrand = brandQuery.data?.brand;

  const finalMark =
    markProp ??
    (fetchedBrand?.logo === null || fetchedBrand?.logo === undefined ? (
      <Logo size={56} isSolid label={fetchedBrand?.name ?? say('common.valence')} />
    ) : (
      <img
        src={fetchedBrand.logo}
        alt=""
        width={56}
        height={56}
        className="rounded-md object-contain"
      />
    ));

  const finalName = fetchedBrand?.name ?? say('common.valence');

  const finalLabel = label ?? say('common.loadingTitle', { title: finalName });

  return <SplashScreen name={finalName} mark={finalMark} label={finalLabel} {...props} />;
};

SplashScreenWithBrand.displayName = 'SplashScreenWithBrand';
