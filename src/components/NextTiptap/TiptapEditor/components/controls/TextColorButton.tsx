'use client';
import React, { useRef } from 'react';
import MenuButton from '../MenuButton';
import { createPortal } from 'react-dom';
import useMount from '../../hooks/useMount';
import { useTiptapContext } from '../Provider';
import { useEditorState } from '@tiptap/react';
import ColorPicker from '../color-picker';

const TextColorButton: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mounted = useMount();
  const { editor } = useTiptapContext();

  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      color: ctx.editor.getAttributes('textStyle').color || 'DEFAULT',
      disabled: !ctx.editor.can().setColor('')
    })
  });

  const renderBar =
    mounted && buttonRef.current
      ? createPortal(
          <div
            className='absolute inset-x-1 bottom-px h-1 rounded-md bg-foreground'
            style={{
              background: state.color
            }}
          />,
          buttonRef.current
        )
      : null;

  return (
    <>
      <MenuButton
        ref={buttonRef}
        type='popover'
        icon='TextColor'
        hideArrow
        tooltip='Color'
        disabled={state.disabled}
      >
        <ColorPicker
          color={state.color}
          onChange={(color) => editor.chain().focus().setColor(color).run()}
          onReset={() => editor.chain().focus().unsetColor().run()}
        />
      </MenuButton>
      {renderBar}
    </>
  );
};

export default TextColorButton;
