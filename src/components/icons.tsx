// Search, cart, and bell icons are static assets pulled directly from the
// Sake Marketplace Figma design system (Nav component, node 8:15) — used
// as-is, not redrawn, so they keep their original fixed colors and can't
// recolor on hover like a stroke="currentColor" icon would.
// Person has no Figma equivalent here (that slot is a profile photo, which
// this project avoids per "no stock photos of people") — kept hand-drawn.
import searchIconSrc from '../assets/icons/search.svg';
import bellIconSrc from '../assets/icons/bell.svg';
import cartIconSrc from '../assets/icons/cart.svg';

type IconProps = { size?: number };

export function SearchIcon({ size = 16 }: IconProps) {
  return <img src={searchIconSrc} width={size} height={size} alt="" aria-hidden="true" />;
}

export function PersonIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="6.5" r="3.3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3.3 17c1.1-3.4 3.9-5.2 6.7-5.2s5.6 1.8 6.7 5.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CartIcon({ size = 19 }: IconProps) {
  const height = Math.round((size / 27.5525) * 23.5296);
  return <img src={cartIconSrc} width={size} height={height} alt="" aria-hidden="true" />;
}

export function BellIcon({ size = 17 }: IconProps) {
  const height = Math.round((size / 21.9491) * 23.3694);
  return <img src={bellIconSrc} width={size} height={height} alt="" aria-hidden="true" />;
}

export function SendIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3 10h13.5M11 4.5 16.5 10 11 15.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function MicIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="7" y="2" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 9.5a6 6 0 0 0 12 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M10 15.5v2.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
