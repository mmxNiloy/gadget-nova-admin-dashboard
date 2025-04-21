import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';

interface LinkEditProps {
  initialUrl?: string;
  initialText?: string;
  isCreate?: boolean;
  onCancel: () => void;
  onApply: (url: string, text?: string) => void;
}

const LinkEdit = ({
  initialUrl,
  initialText,
  isCreate,
  onApply,
  onCancel
}: LinkEditProps) => {
  const [url, setUrl] = useState(initialUrl || '');
  const [text, setText] = useState(initialText || '');
  const [canSubmit, setCanSubmit] = useState(isCreate);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (canSubmit) {
      onApply(url!, text);
    }
  };

  useEffect(() => {
    if (!isCreate) {
      setCanSubmit((url && url !== initialUrl) || text !== initialText);
    }
  }, [initialText, initialUrl, isCreate, text, url]);

  return (
    <form className='flex w-80 flex-col gap-4 p-4' onSubmit={onSubmit}>
      <div className='flex flex-col gap-2'>
        <Label className='font-semibold'>URL</Label>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder='Paste link'
          type='url'
          required
          autoFocus
        />
      </div>

      <div className='flex flex-col gap-2'>
        <Label className='font-semibold'>Display Text</Label>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='rte-link__input'
          placeholder='Enter link text'
        />
      </div>
      <div className='flex items-center justify-end gap-2'>
        <Button variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type='submit'
          className='bg-blue-500 text-white hover:bg-blue-500 hover:text-white'
          disabled={!canSubmit}
        >
          Apply
        </Button>
      </div>
    </form>
  );
};

export default LinkEdit;
