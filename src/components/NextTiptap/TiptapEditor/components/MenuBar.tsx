import React, { memo } from 'react';

import { Toolbar, ToolbarDivider } from './ui/Toolbar';

import BoldButton from './controls/BoldButton';
import ItalicButton from './controls/ItalicButton';
import UndoButton from './controls/UndoButton';
import RedoButton from './controls/RedoButton';
import UnderlineButton from './controls/UnderlineButton';
import AlignPopover from './controls/AlignPopover';
import HeadingDropdown from './controls/HeadingDropdown';
import BlockquoteButton from './controls/BlockquoteButton';
import BulletListButton from './controls/BulletListButton';
import OrderedListButton from './controls/OrderedList';
import MoreMarkDropdown from './controls/MoreMarkPopover';
import LinkButton from './controls/LinkButton';
import CodeBlockButton from './controls/CodeBlockButton';
import TextColorButton from './controls/TextColorButton';
import TextHighlightButton from './controls/TextHighlightButton';
import TableButton from '@/components/NextTiptap/TiptapEditor/components/controls/TableButton';

const MenuBar = () => {
  return (
    <div className='flex min-h-11 items-center bg-background p-0.5'>
      <Toolbar dense>
        <UndoButton />
        <RedoButton />
        {/* <ClearFormatButton /> */}

        <ToolbarDivider />

        <HeadingDropdown />

        <ToolbarDivider />

        <BoldButton />
        <ItalicButton />
        <UnderlineButton />
        <MoreMarkDropdown />

        <ToolbarDivider />

        <TextColorButton />
        <TextHighlightButton />

        <ToolbarDivider />

        <AlignPopover />
        <BulletListButton />
        <OrderedListButton />

        <ToolbarDivider />

        <LinkButton />
        <TableButton />
        {/* <ImageButton /> */}
        {/* <YoutubeButton /> */}

        <ToolbarDivider />

        <BlockquoteButton />
        <CodeBlockButton />
        {/* <InsertDropdown /> */}
      </Toolbar>
    </div>
  );
};

export default memo(MenuBar);
