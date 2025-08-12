import React, { memo } from 'react';
import { useEditorState } from '@tiptap/react';
import { Toolbar } from './ui/Toolbar';
import { useTiptapContext } from './Provider';
import { CodeIcon, MaximizeIcon, MinimizeIcon } from 'lucide-react';
import { IconToggleButton } from './icon-button';

const StatusBar = () => {
  const { editor, toggleFullScreen, toggleSourceMode } = useTiptapContext();
  const counter = useEditorState({
    editor,
    selector: (ctx) => ({
      words: ctx.editor.storage.characterCount.words(),
      characters: ctx.editor.storage.characterCount.characters()
    })
  });

  return (
    <div className='flex items-center justify-between border-t border-secondary bg-background px-2'>
      <Toolbar dense>
        <IconToggleButton onClick={toggleSourceMode} title='Source Code'>
          <CodeIcon className='size-5' />
        </IconToggleButton>

        <IconToggleButton
          title='Fullscreen'
          onClick={toggleFullScreen}
          className='group relative *:size-5 *:transition-transform'
        >
          <MaximizeIcon className='absolute rotate-0 scale-100 group-data-[toggle=true]:rotate-180 group-data-[toggle=true]:scale-0' />
          <MinimizeIcon className='rotate-180 scale-0 group-data-[toggle=true]:rotate-0 group-data-[toggle=true]:scale-100' />
        </IconToggleButton>
      </Toolbar>

      <div className='flex items-center gap-3 px-1 py-2 text-xs text-muted-foreground sm:text-sm'>
        <span>Words: {counter.words}</span>
        <span>Characters: {counter.characters}</span>
      </div>
    </div>
  );
};

export default memo(StatusBar);
