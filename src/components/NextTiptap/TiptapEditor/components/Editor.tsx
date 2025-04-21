'use client';

import React, { forwardRef, useCallback } from 'react';
import { Content, type Editor } from '@tiptap/react';

import TiptapProvider from './Provider';
import { type UseTiptapEditorOptions } from '../hooks/useTiptapEditor';

import MenuBar from './MenuBar';
import StatusBar from './StatusBar';
import Resizer from './Resizer';

import { LinkMenu, ImageMenu, CodeBlockMenu } from './menus';

import ExtensionKit from '../kit';

import '../../styles.css';
import TableMenu from '@/components/NextTiptap/TiptapEditor/components/menus/TableMenu';

export type TiptapEditorRef = {
  getInstance: () => Editor | null;
};

export interface TiptapEditorProps {
  ssr?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  initialContent?: Content;
  placeholder?: {
    paragraph?: string;
    imageCaption?: string;
  };
  output?: 'html' | 'json';
  hideMenuBar?: boolean;
  hideStatusBar?: boolean;
  hideBubbleMenu?: boolean;
  containerClass?: string;
  menuBarClass?: string;
  contentClass?: string;
  onContentChange?: (value: Content) => void;
}

const TiptapEditor = forwardRef<TiptapEditorRef, TiptapEditorProps>(
  (
    {
      ssr = false,
      output = 'html',
      readonly = false,
      disabled = false,
      initialContent,
      placeholder,
      hideMenuBar = false,
      hideStatusBar = false,
      hideBubbleMenu = true,
      onContentChange
    },
    ref
  ) => {
    const isEditable = !readonly && !disabled;
    const displayBubbleMenu = isEditable && hideBubbleMenu;

    const updateValue = useCallback(
      (value: Content) => onContentChange?.(value),
      [onContentChange]
    );

    const handleUpdate = useCallback(
      (editor: Editor) => {
        const content =
          output === 'html'
            ? editor.isEmpty
              ? ''
              : editor.getHTML()
            : editor.getJSON();
        updateValue(content);
      },
      [updateValue, output]
    );

    const editorOptions: UseTiptapEditorOptions = {
      ref,
      placeholder,
      extensions: ExtensionKit,
      content: initialContent,
      editable: isEditable,
      immediatelyRender: !ssr,
      shouldRerenderOnTransaction: false,
      autofocus: false,
      onUpdate: ({ editor }) => handleUpdate(editor)
    };

    const menus = displayBubbleMenu && (
      <>
        {/* <TextMenu  /> */}
        <LinkMenu />
        <ImageMenu />
        <CodeBlockMenu />
        <TableMenu />
      </>
    );

    return (
      <TiptapProvider
        editorOptions={editorOptions}
        slotBefore={!hideMenuBar && <MenuBar />}
        slotAfter={!hideStatusBar && <StatusBar />}
      >
        {menus}
        <Resizer />
      </TiptapProvider>
    );
  }
);

TiptapEditor.displayName = 'TiptapEditor';

export default TiptapEditor;
