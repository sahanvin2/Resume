import ModernOne from './ModernOne';
import ClassicOne from './ClassicOne';
import CreativeOne from './CreativeOne';
import { ResumeData } from '@/types/resume';

export const templateRegistry: Record<string, React.ComponentType<{ data: ResumeData }>> = {
  'modern-1': ModernOne,
  'classic-1': ClassicOne,
  'creative-1': CreativeOne,
};

export const templateMetadata = [
  {
    id: 'modern-1',
    name: 'Modern Clean',
    category: 'Modern',
    atsFriendly: true,
    thumbnail: '/placeholder-modern.png',
  },
  {
    id: 'classic-1',
    name: 'Classic Professional',
    category: 'Classic',
    atsFriendly: true,
    thumbnail: '/placeholder-classic.png',
  },
  {
    id: 'creative-1',
    name: 'Creative Split',
    category: 'Creative',
    atsFriendly: false,
    thumbnail: '/placeholder-creative.png',
  }
];
