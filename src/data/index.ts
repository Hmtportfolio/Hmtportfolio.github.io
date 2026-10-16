import { enData } from './en';
import { vnData } from './vn';
import type { PortfolioData } from './schema';

export type Language = 'en' | 'vi';

export const portfolioDatasets: Record<Language, PortfolioData> = {
  en: enData,
  vi: vnData,
};

export function getPortfolioData(lang: Language = 'en'): PortfolioData {
  return portfolioDatasets[lang] ?? portfolioDatasets.en;
}

export * from './schema';
export { enData } from './en';
export { vnData } from './vn';
