import React, { useCallback, useRef, useState } from 'react';
import MenuButton from '../MenuButton';
import { useTiptapContext } from '../Provider';
import { useEditorState } from '@tiptap/react';
import LinkEdit from '../menus/LinkMenu/LinkEdit';
import LinkView from '../menus/LinkMenu/LinkView';

const LinkButton = ({ text }: { text?: string }) => {
  const { editor, contentElement } = useTiptapContext();
  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      active: ctx.editor.isActive('link'),
      disabled: !ctx.editor.can().setLink({ href: '' })
    })
  });

  const [isEditing, setIsEditing] = useState(false);
  const mode = useRef<number>(0);

  const link = useEditorState({
    editor,
    selector: (context) => {
      mode.current = context.editor.storage.link.mode;

      if (!context.editor.isActive('link')) return null;
      const {
        state: { selection, doc }
      } = context.editor;
      const url = context.editor.getAttributes('link').href;
      const text = doc.textBetween(selection.from, selection.to);

      return { url, text };
    }
  });

  const shouldShow = useCallback(({ editor, from, to }: any) => {
    setIsEditing(mode.current == -1);
    return editor.isActive('link') && (mode.current == -1 || from !== to);
  }, []);

  const applyLink = useCallback(
    (url: string, text?: string) => {
      editor
        .chain()
        .confirmEditLink({
          href: url,
          text: text || url
        })
        .run();
      setIsEditing(false);
    },
    [editor]
  );

  const removeLink = useCallback(() => {
    editor.chain().focus().unsetLink().run();
  }, [editor]);

  const startEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const cancelEdit = useCallback(() => {
    if (mode.current == -1) {
      editor.commands.confirmEditLink();
    } else {
      setIsEditing(false);
    }
  }, [editor]);

  return (
    <MenuButton
      icon='Link'
      tooltip='Link'
      shortcuts={['Mod', 'K']}
      {...state}
      type='popover'
      text={text}
      dropdownClass='z-[9999]'
      hideArrow
    >
      <LinkEdit
        initialUrl={link?.url}
        initialText={link?.text}
        isCreate={mode.current === -1}
        onApply={applyLink}
        onCancel={cancelEdit}
      />
      {/* {isEditing ? (
      ) : (
        <LinkView url={link?.url} onEdit={startEdit} onRemove={removeLink} />
      )} */}
    </MenuButton>
  );
};

export default LinkButton;
