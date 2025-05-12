import {cn} from '@/lib/utils';
import type {ImageResult, PageResult} from 'mocha-simplifier';
import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import React, {useState, useRef} from 'react';
import ReactDOM from 'react-dom';
import pluralize from 'pluralize';

export const ContentDisplay = ({
  contents,
}: {
  contents: PageResult[] | ImageResult[];
}) => {
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [synonyms, setSynonyms] = useState<string[]>([]);
  const [tooltipPos, setTooltipPos] = useState<{x: number; y: number} | null>(null);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSynonyms = async (word: string, event: React.MouseEvent) => {
    const baseWord = pluralize.singular(word);
    setActiveWord(word);
    setSynonyms([]);
    setLoading(true);
    setTooltipPos({ x: event.clientX, y: event.clientY });
    try {
      const res = await fetch(`https://api.datamuse.com/words?rel_syn=${encodeURIComponent(baseWord)}`);
      const data = await res.json();
      setSynonyms(data.map((item: any) => item.word));
    } catch {
      setSynonyms(['(Error fetching synonyms)']);
    } finally {
      setLoading(false);
    }
  };

  // Hide tooltip after a delay
  const hideTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveWord(null);
      setSynonyms([]);
      setTooltipPos(null);
    }, 200);
  };

  // Cancel hide if mouse enters tooltip
  const cancelHide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // Component to render clickable words
  function ClickableWords({children}: {children?: React.ReactNode}) {
    if (!children) return null;
    let text = '';
    if (Array.isArray(children)) {
      text = children.map(child => (typeof child === 'string' ? child : '')).join('');
    } else if (typeof children === 'string') {
      text = children;
    }
    const parts = text.split(/(\s+)/);
    return (
      <>
        {parts.map((part, i) =>
          /\S/.test(part) ? (
            <span
              key={i}
              className="cursor-pointer hover:text-blue-600"
              onClick={e => fetchSynonyms(part, e)}
              style={{position: 'relative'}}
            >
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  }

  // Tooltip rendered via portal
  const tooltip =
    activeWord && tooltipPos
      ? ReactDOM.createPortal(
          <div
            className="z-50 fixed bg-white border border-gray-300 rounded shadow-lg px-3 py-2 text-sm min-w-[120px]"
            style={{left: tooltipPos.x, top: tooltipPos.y}}
            onMouseEnter={cancelHide}
            onMouseLeave={hideTooltip}
          >
            <strong>Synonyms:</strong>
            <ul className="list-disc ml-4">
              {loading ? (
                <li>Loading...</li>
              ) : synonyms.length === 0 ? (
                <li>No synonyms</li>
              ) : synonyms[0] === '(Error fetching synonyms)' ? (
                <li>(Error fetching synonyms)</li>
              ) : (
                synonyms.map((syn, idx) => <li key={idx}>{syn}</li>)
              )}
            </ul>
          </div>,
          typeof window !== 'undefined' ? document.body : (null as any)
        )
      : null;

  return (
    <div className="h-full overflow-auto">
      <div className="p-8 space-y-6">
        {contents?.map((content, i) => (
          <div key={i} className="border-b pb-4 mb-4 last:border-b-0">
            {'page' in content && (
              <div className="text-sm text-neutral-500 mb-2">
                Page {content.page}
              </div>
            )}
            <Markdown
              className="prose max-w-none"
              remarkPlugins={[remarkMath, remarkGfm]}
              rehypePlugins={[rehypeKatex]}
              components={{
                p: ({children, ...props}) => (
                  <p {...props}>
                    <ClickableWords>{children}</ClickableWords>
                  </p>
                ),
                li: ({children, ...props}) => (
                  <li {...props}>
                    <ClickableWords>{children}</ClickableWords>
                  </li>
                ),
                table: ({
                  className,
                  ...props
                }: React.HTMLAttributes<HTMLTableElement>) => (
                  <div className="w-full overflow-hidden rounded-lg border border-neutral-200">
                    <table
                      className={cn('w-full !my-0', className)}
                      {...props}
                    />
                  </div>
                ),
                tr: ({
                  className,
                  ...props
                }: React.HTMLAttributes<HTMLTableRowElement>) => (
                  <tr className={cn('m-0  p-0', className)} {...props} />
                ),
                th: ({className, ...props}) => (
                  <th
                    className={cn(
                      ' px-4 py-2 text-left font-semibold  [&[align=center]]:text-center [&[align=right]]:text-right',
                      className,
                    )}
                    {...props}
                  />
                ),
                td: ({className, ...props}) => (
                  <td
                    className={cn(
                      'border-t px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
                      className,
                    )}
                    {...props}
                  />
                ),
              }}>
              {content.content}
            </Markdown>
          </div>
        ))}
      </div>
      {tooltip}
    </div>
  );
};
