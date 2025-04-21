import React, { useState, useMemo, useCallback } from 'react';
import { PopoverClose } from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';

const COLUMNS = 7;
const ROWS = 5;

type GridSize = { cols: number; rows: number };

interface TableBuilderProps {
  onCreate?: (value: GridSize) => void;
}

const TableBuilder = ({ onCreate }: TableBuilderProps) => {
  const [gridSize, setGridSize] = useState<GridSize>({ cols: 1, rows: 1 });

  const isActiveCell = useCallback(
    (rowIndex: number, colIndex: number) =>
      rowIndex < gridSize.rows && colIndex < gridSize.cols,
    [gridSize.cols, gridSize.rows]
  );

  const grid = useMemo(
    () =>
      Array.from({ length: ROWS }, (_, rowIndex) => (
        <div key={`row-${rowIndex}`} className='flex gap-2'>
          {Array.from({ length: COLUMNS }, (_, colIndex) => (
            <div
              key={`col-${colIndex}`}
              className={cn(
                'size-4 rounded-sm border border-muted bg-secondary shadow-sm',
                isActiveCell(rowIndex, colIndex) && 'border-blue-500'
              )}
              onMouseMove={() =>
                setGridSize({ cols: colIndex + 1, rows: rowIndex + 1 })
              }
              onClick={() => onCreate?.(gridSize)}
            />
          ))}
        </div>
      )),
    [gridSize, isActiveCell, onCreate]
  );

  return (
    <div className='text-sm'>
      <PopoverClose asChild>
        <div className='flex flex-col gap-1.5 p-2'>{grid}</div>
      </PopoverClose>
      <div style={{ textAlign: 'center', marginBlock: 3 }}>
        {gridSize.rows} x {gridSize.cols}
      </div>
    </div>
  );
};

export default TableBuilder;
