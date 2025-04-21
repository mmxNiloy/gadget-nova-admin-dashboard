'use client';
import {
  createContext,
  HTMLAttributes,
  ReactNode,
  RefObject,
  useContext,
  useRef,
  useState
} from 'react';
import { EditorContent, type Editor } from '@tiptap/react';
import useTiptapEditor, {
  type UseTiptapEditorOptions
} from '../hooks/useTiptapEditor';
import CodeMirrorEditor from '@/components/NextTiptap/TiptapEditor/SourceEditor/Editor';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

type TiptapContextType = {
  editor: Editor;
  contentElement: RefObject<Element | null>;
  isFullScreen: boolean;
  isResizing: boolean;
  isSourceMode: boolean;
  toggleFullScreen: () => void;
  toggleSourceMode: () => void;
  setIsResizing: (value: boolean) => void;
};

const TiptapContext = createContext<TiptapContextType>({} as TiptapContextType);
export const useTiptapContext = () => useContext(TiptapContext);

type TiptapProviderProps = {
  slotBefore?: ReactNode;
  slotAfter?: ReactNode;
  editorOptions: UseTiptapEditorOptions;
  editorProps?: HTMLAttributes<HTMLDivElement>;
  children?: ReactNode;
};

export const TiptapProvider = ({
  children,
  editorOptions,
  editorProps,
  slotBefore,
  slotAfter
}: TiptapProviderProps) => {
  const contentElement = useRef<HTMLDivElement>(null);
  const editor = useTiptapEditor(editorOptions);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  if (!editor) {
    // Editor skeleton
    return (
      <div
        className={cn(
          'flex flex-col gap-1 rounded-md border text-sm shadow-sm focus-within:ring focus-within:ring-secondary',
          isFullScreen && 'fixed inset-0 z-50 max-h-[auto] min-h-[auto]'
        )}
      >
        <Skeleton className='h-11 w-full' />
        <div className='relative flex min-h-64 flex-1 cursor-text overflow-auto bg-background px-6 text-foreground'>
          <Skeleton className='w-full flex-1' />
        </div>
        <Skeleton className='h-11 w-full' />
      </div>
    );
  }

  const editorContent = (
    <div
      className={cn(
        'flex flex-col rounded-md border text-sm shadow-sm focus-within:ring focus-within:ring-secondary',
        isFullScreen && 'fixed inset-0 z-50 max-h-[auto] min-h-[auto]'
      )}
    >
      {slotBefore}
      <div className='relative flex min-h-64 flex-1 cursor-text overflow-auto bg-background px-6 text-foreground'>
        {isSourceMode ? (
          <CodeMirrorEditor initialContent={editor.getHTML() || ''} />
        ) : (
          <EditorContent
            ref={contentElement}
            editor={editor}
            className='relative w-full flex-1 *:h-full'
          />
        )}
      </div>
      {children}
      {slotAfter}
    </div>
  );

  return (
    <TiptapContext.Provider
      value={{
        editor,
        contentElement,
        isFullScreen,
        isResizing,
        isSourceMode,
        setIsResizing,
        toggleFullScreen: () => setIsFullScreen((prev) => !prev),
        toggleSourceMode: () => setIsSourceMode((prev) => !prev)
      }}
    >
      {editorContent}
    </TiptapContext.Provider>
  );
};

export default TiptapProvider;
