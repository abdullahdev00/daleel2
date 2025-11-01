import FloatingActionButton from '../FloatingActionButton';
import { Bookmark, Moon, ZoomIn, ZoomOut } from 'lucide-react';

export default function FloatingActionButtonExample() {
  return (
    <div className="bg-background p-8 flex flex-col gap-3 items-end">
      <FloatingActionButton 
        icon={<ZoomOut className="w-5 h-5" />}
        onClick={() => console.log('Zoom out')}
        testId="button-zoom-out"
      />
      <FloatingActionButton 
        icon={<ZoomIn className="w-5 h-5" />}
        onClick={() => console.log('Zoom in')}
        testId="button-zoom-in"
      />
      <FloatingActionButton 
        icon={<Bookmark className="w-5 h-5" />}
        onClick={() => console.log('Bookmark')}
        testId="button-bookmark"
      />
      <FloatingActionButton 
        icon={<Moon className="w-5 h-5" />}
        onClick={() => console.log('Toggle theme')}
        testId="button-theme"
      />
    </div>
  );
}
