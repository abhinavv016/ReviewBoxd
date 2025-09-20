'use client';
import { Spinner } from '@/components/ui/shadcn-io/spinner';

const Example = () => (
  <div className="grid h-full w-full items-center">
    <div className="flex flex-col items-center gap-4">
      <Spinner variant="ring" className="w-20 h-20"/>
      <span className="font-mono text-muted-foreground text-xl">Loading</span>
    </div>
  </div>
);

export default Example;