import ModernOne from './ModernOne';
import ClassicOne from './ClassicOne';
import CreativeOne from './CreativeOne';
import ModernTwo from './ModernTwo';
import ClassicTwo from './ClassicTwo';
import CreativeTwo from './CreativeTwo';
import { ResumeData } from '@/types/resume';

export const templateRegistry: Record<string, React.ComponentType<{ data: ResumeData }>> = {
  'modern-1': ModernOne,
  'modern-2': ModernTwo,
  'classic-1': ClassicOne,
  'classic-2': ClassicTwo,
  'creative-1': CreativeOne,
  'creative-2': CreativeTwo,
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
    id: 'modern-2',
    name: 'Modern Bold',
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
    id: 'classic-2',
    name: 'Classic Elegant',
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
  },
  {
    id: 'creative-2',
    name: 'Creative Dark',
    category: 'Creative',
    atsFriendly: false,
    thumbnail: '/placeholder-creative.png',
  }
];
