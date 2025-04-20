'use client';

import TiptapEditor from '@/components/NextTiptap/TiptapEditor';
import React, { useState } from 'react';

export default function TestPage() {
  const [content, setContent] = useState<string>('');

  return (
    <div className='container flex h-screen w-full flex-col'>
      <p>Tiptap Editor Test</p>
      <TiptapEditor
        ssr={true}
        output='html'
        placeholder={{
          paragraph: 'Type your content here...',
          imageCaption: 'Type caption for image (optional)'
        }}
        contentMinHeight={256}
        contentMaxHeight={640}
        initialContent={content}
        onContentChange={(val) => setContent(val?.toString() ?? '')}
      />

      <p>Content</p>
      <p>{content}</p>
    </div>
  );
}
