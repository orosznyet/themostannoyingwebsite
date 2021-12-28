import { Article } from '@/types';
import MonkeyAttack from './articles/monkey-attack';
import SmellyFootBreakout from './articles/smelly-foot-breakout';

// This is not a scalable solution but works perfecly fine for this basic
// website. No API, no database, no server, no backend.

export const articles: Article[] = [
  MonkeyAttack,
  SmellyFootBreakout,
];
