'use client';

import {useRef, useState} from 'react';
import dynamic from 'next/dynamic';

import {ContentDisplay} from '@/components/content-display';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';
import {Loader2, XIcon} from 'lucide-react';
import type {ImageResult, PageResult} from 'mocha-simplifier';
import {toast} from 'sonner';
import Navigation from '@/components/ui/navigation';
import {READING_LEVELS, type ReadingLevel} from 'mocha-simplifier';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FileUpload = dynamic(() => import('@/components/file-upload'), {
  ssr: false,
});

const Loader = () => (
  <div className="flex flex-col h-full w-full items-center justify-center gap-4">
    <Loader2 className="size-5 animate-spin" />
    <div className="text-sm text-neutral-600">Simplifying text</div>
  </div>
);

export default function Home() {
  const [contents, setContents] = useState<PageResult[] | ImageResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [readingLevel, setReadingLevel] = useState<ReadingLevel>(READING_LEVELS.MEDIUM);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleUpload = async (formData: FormData) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsLoading(true);

    try {
      formData.append('readingLevel', readingLevel);
      const response = await fetch('/api/extract', {
        method: 'POST',
        body: formData,
        signal: abortControllerRef.current.signal,
      });

      const {results} = (await response.json()) ?? {};
      setContents(results);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setContents([]);
      } else {
        toast.error('Error during extraction');
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleClose = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setContents([]);
  };

  const showContent = isLoading || contents.length > 0;

  return (
    <div className="w-full min-h-screen bg-neutral-50 flex overflow-hidden flex-col sm:flex-row">
      <div
      className={cn(
        'space-y-10 flex-grow px-4 w-full py-8 sm:px-8 md:px-12 lg:px-20 flex items-center justify-center flex-col transition-all duration-500',
        {
        'h-1/4 sm:h-auto sm:w-1/2': showContent,
        },
      )}>
      {/* Navigation Bar */}
      <Navigation />

      {/* File Upload Section */}
      <div className="space-y-6 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter">
        MochaSimplifier
        </h1>
        <p className="text-lg sm:text-xl text-neutral-500 leading-relaxed max-w-2xl mx-auto">
        Transform complex text into clear, accessible content. Upload any image or PDF and get simplified text that's easier to understand for everyone.
        </p>
        <div className="flex items-center justify-center gap-2">
        <span className="text-base sm:text-lg text-neutral-600">Reading Level:</span>
        <Select value={readingLevel} onValueChange={(value: ReadingLevel) => setReadingLevel(value)}>
          <SelectTrigger className="w-[300px] sm:w-[360px] text-lg sm:text-xl">
          <SelectValue placeholder="Select reading level" />
          </SelectTrigger>
          <SelectContent>
          <SelectItem value={READING_LEVELS.EASY}>Easy (Grade 1-3)</SelectItem>
          <SelectItem value={READING_LEVELS.MEDIUM}>Medium (Grade 4-6)</SelectItem>
          <SelectItem value={READING_LEVELS.HARD}>Original</SelectItem>
          </SelectContent>
        </Select>
        </div>
      </div>
      <FileUpload onUpload={handleUpload} />
      </div>
      <div
      className={cn(
        'flex w-full sm:w-0 transition-all duration-500 justify-center border-t sm:border-t-0 sm:border-l border-neutral-300 bg-background relative',
        {
        'h-3/4 sm:h-auto sm:w-1/2': showContent,
        },
      )}>
      {showContent && (
        <Button
        variant="ghost"
        size="icon"
        onClick={handleClose}
        className="absolute top-4 right-4 rounded-full"
        aria-label="Close content panel">
        <XIcon className="!size-6" />
        </Button>
      )}
      {isLoading ? <Loader /> : <ContentDisplay contents={contents} />}
      </div>
    </div>
  );
}
