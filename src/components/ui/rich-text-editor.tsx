'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import CodeBlock from '@tiptap/extension-code-block';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  CodeIcon,
  HelpCircleIcon,
  ItalicIcon,
  ListIcon,
  ListOrdered,
  QuoteIcon,
  TableIcon,
  UnderlineIcon
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from './select';
import { cn } from '@/lib/utils';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from './context-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './dialog';
import { ScrollArea } from './scroll-area';
import { Skeleton } from './skeleton';

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  toolbar?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const headingOptions = [
  {
    value: 'h1',
    label: 'Heading 1',
    className: 'text-2xl font-extrabold',
    keyboardShortcut: ['Ctrl', 'Alt', '1']
  },
  {
    value: 'h2',
    label: 'Heading 2',
    className: 'text-xl font-bold',
    keyboardShortcut: ['Ctrl', 'Alt', '2']
  },
  {
    value: 'h3',
    label: 'Heading 3',
    className: 'text-lg font-semibold',
    keyboardShortcut: ['Ctrl', 'Alt', '3']
  },
  {
    value: 'h4',
    label: 'Heading 4',
    className: 'text-base font-semibold',
    keyboardShortcut: ['Ctrl', 'Alt', '4']
  },
  { value: 'paragraph', label: 'Paragraph', className: 'text-sm' }
];

const textColors = [
  { name: 'Black', value: '#000000', tailwind: 'text-black' },
  { name: 'Slate', value: '#64748b', tailwind: 'text-slate-600' },
  { name: 'Red', value: '#ef4444', tailwind: 'text-red-500' },
  { name: 'Green', value: '#22c55e', tailwind: 'text-green-500' },
  { name: 'Blue', value: '#3b82f6', tailwind: 'text-blue-500' },
  { name: 'Purple', value: '#a855f7', tailwind: 'text-purple-500' },
  { name: 'Orange', value: '#f97316', tailwind: 'text-orange-500' },
  { name: 'Teal', value: '#14b8a6', tailwind: 'text-teal-500' }
];

type TLevel = 1 | 2 | 3 | 4 | 5 | 6;

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = '',
  onChange,
  readOnly = false,
  toolbar = true,
  placeholder = 'Write something...',
  className,
  disabled = false
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4]
        }
      }),
      Placeholder.configure({
        placeholder,
        showOnlyWhenEditable: !readOnly,
        emptyEditorClass: 'is-editor-empty'
      }),
      Underline,
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-100 p-4 rounded-md'
        }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      TextStyle,
      Color,
      Table.configure({
        resizable: false,
        HTMLAttributes: {
          class: 'tiptap-table',
          style:
            'border: 1px dashed rgb(66 66 66 / 0.5); width: 100%; table-layout: fixed;'
        }
      }),
      TableCell.configure({
        HTMLAttributes: {
          style:
            'border: 1px dashed rgb(66 66 66 / 0.5); padding: 0.5rem; overflow-wrap: break-word; white-space: normal;'
        }
      }),
      TableRow,
      TableHeader
    ],
    content: value || '',
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      handleKeyDown: (view, event) => {
        if (!editor) return false;

        if (event.ctrlKey && event.altKey) {
          const key = event.key;
          if (['1', '2', '3', '4'].includes(key)) {
            const level = parseInt(key) as TLevel;
            editor.chain().focus().toggleHeading({ level }).run();
            return true;
          }
          if (key.toLowerCase() === 't') {
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 2, withHeaderRow: false })
              .run();
            return true;
          }
        }
        if (event.ctrlKey && event.shiftKey) {
          switch (event.key) {
            case 'L':
              editor.chain().focus().setTextAlign('left').run();
              return true;
            case 'E':
              editor.chain().focus().setTextAlign('center').run();
              return true;
            case 'R':
              editor.chain().focus().setTextAlign('right').run();
              return true;
            case 'J':
              editor.chain().focus().setTextAlign('justify').run();
              return true;
          }
        }
        return false;
      }
    }
  });

  if (!editor) {
    return (
      <div className={cn('flex h-full w-full flex-col', className)}>
        {toolbar && (
          <div className='mb-2 flex flex-wrap gap-2 rounded-t-md border-b border-gray-200 bg-gray-100 p-2'>
            <Skeleton className='h-10 w-36 rounded-md' />
            {[...Array(12)].map((_, i) => (
              <Skeleton key={i} className='h-10 w-10 rounded-md' />
            ))}
          </div>
        )}
        <Skeleton className='flex-1 rounded-b-md border border-gray-200 bg-white' />
      </div>
    );
  }

  const handleHeadingChange = (value: string) => {
    editor.chain().focus().setParagraph().run();
    if (value && value !== 'paragraph') {
      const level = parseInt(value.replace('h', ''));
      editor
        .chain()
        .focus()
        .toggleHeading({ level: level as TLevel })
        .run();
    }
  };

  const buttonClass = (isActive: boolean) =>
    cn(
      'p-2 rounded-md transition-colors',
      isActive
        ? 'bg-blue-500 text-white'
        : 'bg-white text-gray-700 hover:bg-gray-200',
      !editor.can().chain().focus().run() && 'cursor-not-allowed opacity-50'
    );

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className={cn('flex h-full w-full flex-col', className)}>
            {toolbar && !readOnly && (
              <div className='mb-2 flex flex-wrap gap-2 rounded-t-md border-b border-gray-200 bg-gray-100 p-2'>
                <Select
                  defaultValue='paragraph'
                  onValueChange={handleHeadingChange}
                >
                  <SelectTrigger className='w-36'>
                    <SelectValue placeholder='Headings' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Headings</SelectLabel>
                      {headingOptions.map((heading) => (
                        <SelectItem
                          key={heading.value}
                          value={heading.value}
                          className={heading.className}
                          title={heading.keyboardShortcut?.join('+')}
                        >
                          {heading.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <button
                  type='button'
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  disabled={!editor.can().toggleBold()}
                  className={buttonClass(editor.isActive('bold'))}
                  title='Bold (Ctrl+B)'
                >
                  <BoldIcon />
                </button>
                <button
                  type='button'
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  disabled={!editor.can().toggleItalic()}
                  className={buttonClass(editor.isActive('italic'))}
                  title='Italic (Ctrl+I)'
                >
                  <ItalicIcon />
                </button>
                <button
                  type='button'
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  disabled={!editor.can().toggleUnderline()}
                  className={buttonClass(editor.isActive('underline'))}
                  title='Underline (Ctrl+U)'
                >
                  <UnderlineIcon />
                </button>
                <button
                  type='button'
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  disabled={!editor.can().toggleCodeBlock()}
                  className={buttonClass(editor.isActive('codeBlock'))}
                  title='Code Block (Ctrl+Alt+C)'
                >
                  <CodeIcon />
                </button>
                <button
                  type='button'
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  disabled={!editor.can().toggleBlockquote()}
                  className={buttonClass(editor.isActive('blockquote'))}
                  title='Quote (Ctrl+Shift+B)'
                >
                  <QuoteIcon />
                </button>
                <button
                  type='button'
                  onClick={() =>
                    editor.chain().focus().setTextAlign('left').run()
                  }
                  className={buttonClass(
                    editor.isActive({ textAlign: 'left' })
                  )}
                  title='Align Left (Ctrl+Shift+L)'
                >
                  <AlignLeftIcon />
                </button>
                <button
                  type='button'
                  onClick={() =>
                    editor.chain().focus().setTextAlign('center').run()
                  }
                  className={buttonClass(
                    editor.isActive({ textAlign: 'center' })
                  )}
                  title='Align Center (Ctrl+Shift+E)'
                >
                  <AlignCenterIcon />
                </button>
                <button
                  type='button'
                  onClick={() =>
                    editor.chain().focus().setTextAlign('right').run()
                  }
                  className={buttonClass(
                    editor.isActive({ textAlign: 'right' })
                  )}
                  title='Align Right (Ctrl+Shift+R)'
                >
                  <AlignRightIcon />
                </button>
                <button
                  type='button'
                  onClick={() =>
                    editor.chain().focus().setTextAlign('justify').run()
                  }
                  className={buttonClass(
                    editor.isActive({ textAlign: 'justify' })
                  )}
                  title='Justify (Ctrl+Shift+J)'
                >
                  <AlignJustifyIcon />
                </button>
                <button
                  type='button'
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  disabled={!editor.can().toggleBulletList()}
                  className={buttonClass(editor.isActive('bulletList'))}
                  title='Bullet List (Ctrl+Shift+8)'
                >
                  <ListIcon />
                </button>
                <button
                  type='button'
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  disabled={!editor.can().toggleOrderedList()}
                  className={buttonClass(editor.isActive('orderedList'))}
                  title='Ordered List (Ctrl+Shift+7)'
                >
                  <ListOrdered />
                </button>
                <button
                  type='button'
                  onClick={() =>
                    editor
                      .chain()
                      .focus()
                      .insertTable({ rows: 3, cols: 2, withHeaderRow: false })
                      .run()
                  }
                  disabled={!editor.can().insertTable()}
                  className={buttonClass(editor.isActive('table'))}
                  title='Insert Table (Ctrl+Alt+T)'
                >
                  <TableIcon />
                </button>
                <Select
                  onValueChange={(value) =>
                    editor.chain().focus().setColor(value).run()
                  }
                  defaultValue={
                    editor.getAttributes('textStyle')?.color || '#000000'
                  }
                >
                  <SelectTrigger className='w-36'>
                    <SelectValue placeholder='Text Color' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Text Colors</SelectLabel>
                      {textColors.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className='flex items-center gap-2'>
                            <span
                              className='h-4 w-4 rounded-full'
                              style={{ backgroundColor: color.value }}
                            />
                            {color.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type='button'
                      title='Help'
                      className={buttonClass(false)}
                    >
                      <HelpCircleIcon />
                    </button>
                  </DialogTrigger>
                  <DialogContent className='max-w-screen-md'>
                    <DialogHeader>
                      <DialogTitle>Help - Rich Text Editor</DialogTitle>
                      <DialogDescription>
                        Learn how to use the rich text editor to format your
                        content effectively.
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className='h-[80vh]'>
                      <div className='space-y-6'>
                        <section>
                          <h3 className='text-lg font-semibold'>Overview</h3>
                          <p className='text-gray-700'>
                            The Rich Text Editor is a powerful tool for creating
                            and formatting text. It offers a variety of
                            formatting options such as headings, bold, italic,
                            lists, code blocks, quotes, text alignment, text
                            colors, and two-column tables. Use the toolbar
                            buttons, keyboard shortcuts, or right-click context
                            menu to apply these formats quickly and efficiently.
                          </p>
                        </section>
                        <section>
                          <h3 className='text-lg font-semibold'>
                            Using the Toolbar and Context Menu
                          </h3>
                          <p className='text-gray-700'>
                            The toolbar at the top provides quick access to
                            formatting options. Right-click anywhere in the
                            editor to open the context menu, which includes all
                            toolbar options and table-specific actions when a
                            table is selected. Hover over items to see their
                            function and keyboard shortcuts (if available).
                            Here’s what each option does:
                          </p>
                          <ul className='list-disc pl-5 text-gray-700'>
                            <li>
                              <strong>Headings</strong>: Select from Heading 1
                              to Heading 4 or Paragraph to structure your
                              content.
                            </li>
                            <li>
                              <strong>Bold</strong>: Make selected text bold.
                            </li>
                            <li>
                              <strong>Italic</strong>: Italicize selected text.
                            </li>
                            <li>
                              <strong>Underline</strong>: Underline selected
                              text.
                            </li>
                            <li>
                              <strong>Code Block</strong>: Format text as a code
                              snippet with a gray background.
                            </li>
                            <li>
                              <strong>Quote</strong>: Turn selected text into a
                              blockquote with a left border.
                            </li>
                            <li>
                              <strong>Align Left/Center/Right/Justify</strong>:
                              Adjust the alignment of selected text or
                              paragraphs.
                            </li>
                            <li>
                              <strong>Bullet List</strong>: Create an unordered
                              list with bullet points.
                            </li>
                            <li>
                              <strong>Ordered List</strong>: Create a numbered
                              list.
                            </li>
                            <li>
                              <strong>Table</strong>: Insert a two-column table
                              without headers.
                            </li>
                            <li>
                              <strong>Text Color</strong>: Change the color of
                              selected text.
                            </li>
                            <li>
                              <strong>Add Row</strong>: Add a row to the
                              selected table (context menu, table only).
                            </li>
                            <li>
                              <strong>Remove Row</strong>: Delete the current
                              row from the table (context menu, table only).
                            </li>
                            <li>
                              <strong>Help</strong>: Open this manual.
                            </li>
                          </ul>
                        </section>
                        <section>
                          <h3 className='text-lg font-semibold'>
                            Keyboard Shortcuts
                          </h3>
                          <p className='text-gray-700'>
                            Speed up your workflow with these keyboard
                            shortcuts:
                          </p>
                          <div className='grid grid-cols-2 gap-4'>
                            <div>
                              <h4 className='font-medium text-gray-800'>
                                Text Formatting
                              </h4>
                              <ul className='list-disc pl-5 text-gray-700'>
                                <li>
                                  <strong>Bold</strong>: Ctrl + B
                                </li>
                                <li>
                                  <strong>Italic</strong>: Ctrl + I
                                </li>
                                <li>
                                  <strong>Underline</strong>: Ctrl + U
                                </li>
                                <li>
                                  <strong>Code Block</strong>: Ctrl + Alt + C
                                </li>
                                <li>
                                  <strong>Quote</strong>: Ctrl + Shift + B
                                </li>
                              </ul>
                            </div>
                            <div>
                              <h4 className='font-medium text-gray-800'>
                                Headings
                              </h4>
                              <ul className='list-disc pl-5 text-gray-700'>
                                <li>
                                  <strong>Heading 1</strong>: Ctrl + Alt + 1
                                </li>
                                <li>
                                  <strong>Heading 2</strong>: Ctrl + Alt + 2
                                </li>
                                <li>
                                  <strong>Heading 3</strong>: Ctrl + Alt + 3
                                </li>
                                <li>
                                  <strong>Heading 4</strong>: Ctrl + Alt + 4
                                </li>
                              </ul>
                            </div>
                            <div>
                              <h4 className='font-medium text-gray-800'>
                                Alignment
                              </h4>
                              <ul className='list-disc pl-5 text-gray-700'>
                                <li>
                                  <strong>Align Left</strong>: Ctrl + Shift + L
                                </li>
                                <li>
                                  <strong>Align Center</strong>: Ctrl + Shift +
                                  E
                                </li>
                                <li>
                                  <strong>Align Right</strong>: Ctrl + Shift + R
                                </li>
                                <li>
                                  <strong>Justify</strong>: Ctrl + Shift + J
                                </li>
                              </ul>
                            </div>
                            <div>
                              <h4 className='font-medium text-gray-800'>
                                Lists and Tables
                              </h4>
                              <ul className='list-disc pl-5 text-gray-700'>
                                <li>
                                  <strong>Bullet List</strong>: Ctrl + Shift + 8
                                </li>
                                <li>
                                  <strong>Ordered List</strong>: Ctrl + Shift +
                                  7
                                </li>
                                <li>
                                  <strong>Insert Table</strong>: Ctrl + Alt + T
                                </li>
                              </ul>
                            </div>
                          </div>
                        </section>
                        <section>
                          <h3 className='text-lg font-semibold'>Tips</h3>
                          <ul className='list-disc pl-5 text-gray-700'>
                            <li>
                              Select text before applying a format to modify
                              existing content.
                            </li>
                            <li>
                              Use the placeholder text as a guide when the
                              editor is empty.
                            </li>
                            <li>
                              Disabled buttons indicate that a format can’t be
                              applied to the current selection.
                            </li>
                            <li>
                              Tables are fixed at two columns with predefined
                              widths (30% and 70%).
                            </li>
                            <li>
                              Right-click a table to add or remove rows via the
                              context menu.
                            </li>
                          </ul>
                        </section>
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            )}
            <EditorContent
              editor={editor}
              disabled={disabled}
              className={cn(
                'tiptap prose max-w-none flex-1 overflow-auto',
                readOnly
                  ? 'p-0'
                  : 'rounded-b-md border border-gray-200 bg-white p-4 outline-none'
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className='min-w-64'>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Headings</ContextMenuSubTrigger>
            <ContextMenuSubContent className='min-w-56'>
              {headingOptions.map((heading) => (
                <ContextMenuItem
                  key={heading.value}
                  onClick={() => handleHeadingChange(heading.value)}
                  className={heading.className}
                >
                  {heading.label}
                  <span className='ml-auto text-xs text-gray-500'>
                    {heading.keyboardShortcut?.join('+')}
                  </span>
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuItem
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().toggleBold()}
          >
            Bold
            <span className='ml-auto text-xs text-gray-500'>Ctrl+B</span>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().toggleItalic()}
          >
            Italic
            <span className='ml-auto text-xs text-gray-500'>Ctrl+I</span>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().toggleUnderline()}
          >
            Underline
            <span className='ml-auto text-xs text-gray-500'>Ctrl+U</span>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            disabled={!editor.can().toggleCodeBlock()}
          >
            Code Block
            <span className='ml-auto text-xs text-gray-500'>Ctrl+Alt+C</span>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            disabled={!editor.can().toggleBlockquote()}
          >
            Quote
            <span className='ml-auto text-xs text-gray-500'>Ctrl+Shift+B</span>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Text Align</ContextMenuSubTrigger>
            <ContextMenuSubContent className='min-w-48'>
              <ContextMenuItem
                onClick={() =>
                  editor.chain().focus().setTextAlign('left').run()
                }
              >
                Left
                <span className='ml-auto text-xs text-gray-500'>
                  Ctrl+Shift+L
                </span>
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() =>
                  editor.chain().focus().setTextAlign('center').run()
                }
              >
                Center
                <span className='ml-auto text-xs text-gray-500'>
                  Ctrl+Shift+E
                </span>
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() =>
                  editor.chain().focus().setTextAlign('right').run()
                }
              >
                Right
                <span className='ml-auto text-xs text-gray-500'>
                  Ctrl+Shift+R
                </span>
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() =>
                  editor.chain().focus().setTextAlign('justify').run()
                }
              >
                Justify
                <span className='ml-auto text-xs text-gray-500'>
                  Ctrl+Shift+J
                </span>
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuItem
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            disabled={!editor.can().toggleBulletList()}
          >
            Bullet List
            <span className='ml-auto text-xs text-gray-500'>Ctrl+Shift+8</span>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            disabled={!editor.can().toggleOrderedList()}
          >
            Ordered List
            <span className='ml-auto text-xs text-gray-500'>Ctrl+Shift+7</span>
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 2, withHeaderRow: false })
                .run()
            }
            disabled={!editor.can().insertTable()}
          >
            Insert Table
            <span className='ml-auto text-xs text-gray-500'>Ctrl+Alt+T</span>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Text Color</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              {textColors.map((color) => (
                <ContextMenuItem
                  key={color.value}
                  onClick={() =>
                    editor.chain().focus().setColor(color.value).run()
                  }
                >
                  <div className='flex items-center gap-2'>
                    <span
                      className='h-4 w-4 rounded-full'
                      style={{ backgroundColor: color.value }}
                    />
                    {color.name}
                  </div>
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>
          {editor.isActive('table') && (
            <>
              <ContextMenuSeparator />
              <ContextMenuItem
                onClick={() => editor.chain().focus().addRowAfter().run()}
              >
                Add Row
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() => editor.chain().focus().deleteRow().run()}
                disabled={!editor.can().deleteRow()}
              >
                Remove Row
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() => editor.chain().focus().deleteTable().run()}
                disabled={!editor.can().deleteTable()}
              >
                Delete Table
              </ContextMenuItem>
            </>
          )}
        </ContextMenuContent>
      </ContextMenu>
      <style jsx global>{`
        .tiptap {
          height: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }
        .tiptap ul {
          list-style-type: disc !important;
          padding-left: 1.5rem !important;
        }
        .tiptap ol {
          list-style-type: decimal !important;
          padding-left: 1.5rem !important;
        }
        .tiptap p {
          margin-bottom: 1rem !important;
        }
        .tiptap h1 {
          font-size: 2rem !important;
          font-weight: bold !important;
          margin-bottom: 1rem !important;
        }
        .tiptap h2 {
          font-size: 1.5rem !important;
          font-weight: bold !important;
          margin-bottom: 0.75rem !important;
        }
        .tiptap h3 {
          font-size: 1.25rem !important;
          font-weight: bold !important;
          margin-bottom: 0.5rem !important;
        }
        .tiptap h4 {
          font-size: 1.125rem !important;
          font-weight: bold !important;
          margin-bottom: 0.5rem !important;
        }
        .tiptap code {
          background-color: #f3f4f6 !important;
          padding: 0.25rem 0.5rem !important;
          border-radius: 0.25rem !important;
        }
        .tiptap pre {
          background-color: #f3f4f6 !important;
          padding: 1rem !important;
          border-radius: 0.25rem !important;
        }
        .tiptap blockquote {
          border-left: 4px solid #e5e7eb !important;
          padding-left: 1rem !important;
          color: #6b7280 !important;
          margin: 1rem 0 !important;
        }
        .tiptap:focus {
          outline: none !important;
        }
        .tiptap.is-editor-empty::before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          position: absolute;
          opacity: 0.7;
          height: 100%;
          display: flex;
          align-items: flex-start;
          padding-top: 0.25rem;
        }
        .tiptap-table {
          width: 100%;
          max-width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          border: none;
          table-layout: fixed;
        }
        .tiptap-table:not(.ProseMirror[contenteditable='false']) {
          border: 1px dashed #9ca3af;
        }
        .tiptap-table tr {
          border-bottom: 1px solid #ecedef;
        }
        .tiptap-table td {
          border: none;
          padding: 0.5rem;
          text-align: left;
          font-weight: normal;
          overflow-wrap: break-word;
          white-space: normal;
          max-width: 0; /* Ensures truncation within fixed width */
        }
        .tiptap-table td:not(.ProseMirror[contenteditable='false']) {
          border-right: 1px dashed #9ca3af;
        }
        .tiptap-table td:last-child:not(.ProseMirror[contenteditable='false']) {
          border-right: none;
        }
        .tiptap-table td:nth-child(1) {
          width: 30%;
        }
        .tiptap-table td:nth-child(2) {
          width: 70%;
        }
        @media (max-width: 640px) {
          .tiptap-table {
            display: block;
          }
          .tiptap-table tbody,
          .tiptap-table tr {
            display: block;
          }
          .tiptap-table td {
            display: block;
            width: 100% !important;
            max-width: 100%;
            box-sizing: border-box;
            border: none;
            border-bottom: 1px solid #000000;
            position: relative;
            padding-left: 0.5rem;
          }
          .tiptap-table td:not(.ProseMirror[contenteditable='false']) {
            border-right: none;
          }
        }
      `}</style>
    </>
  );
};

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
