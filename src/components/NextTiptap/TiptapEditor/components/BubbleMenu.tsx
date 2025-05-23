import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import {
  BubbleMenuPluginProps,
  BubbleMenuPlugin
} from '@tiptap/extension-bubble-menu';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type BubbleMenuProps = Omit<
  Optional<BubbleMenuPluginProps, 'pluginKey' | 'editor'>,
  'element'
> & {
  className?: string;
  children: React.ReactNode;
};

export const BubbleMenu = ({
  editor,
  className,
  children,
  ...props
}: BubbleMenuProps) => {
  const menuEl = useRef<HTMLDivElement>(document.createElement('div'));

  useEffect(() => {
    if (editor?.isDestroyed) {
      return;
    }

    const {
      pluginKey = 'bubbleMenu',
      tippyOptions = {},
      updateDelay,
      shouldShow = null
    } = props;

    const menuEditor = editor;

    if (!menuEditor) {
      console.warn(
        'BubbleMenu component is not rendered inside of an editor component or does not have editor prop.'
      );
      return;
    }

    const plugin = BubbleMenuPlugin({
      updateDelay,
      editor: menuEditor || editor,
      element: menuEl.current,
      pluginKey,
      shouldShow,
      tippyOptions
    });

    menuEditor.registerPlugin(plugin);
    const currentMenuEl = menuEl.current;
    return () => {
      menuEditor.unregisterPlugin(pluginKey);
      window.requestAnimationFrame(() => {
        if (currentMenuEl.parentNode) {
          currentMenuEl.parentNode.removeChild(currentMenuEl);
        }
      });
    };
  }, [editor, props]);

  const portal = createPortal(
    <div className={clsx('rounded-md bg-background shadow-md', className)}>
      {children}
    </div>,
    menuEl.current
  );

  return portal;
};
