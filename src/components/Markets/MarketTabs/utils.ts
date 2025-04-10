import { TabType } from ".";

export const TABS: Array<{
  id: TabType;
  label: string;
  icon: string;
  ariaLabel: string;
}> = [
  { id: "featured", label: "Featured", icon: "🔥", ariaLabel: "fire" },
  { id: "gainers", label: "Top Gainers", icon: "🚀", ariaLabel: "rocket" },
  { id: "losers", label: "Top Losers", icon: "🚨", ariaLabel: "siren" },
];
