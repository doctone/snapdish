import * as React from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table'
import type { Receipt } from '../types/receipt'

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const columns: ColumnDef<Receipt>[] = [
  {
    accessorKey: 'original_filename',
    header: 'Filename',
  },
  {
    accessorKey: 'content_type',
    header: 'Type',
  },
  {
    accessorKey: 'size_bytes',
    header: 'Size',
    cell: ({ getValue }) => formatBytes(getValue<number>()),
  },
  {
    accessorKey: 'created_at',
    header: 'Uploaded',
    cell: ({ getValue }) => formatDate(getValue<string>()),
  },
]

type ReceiptListProps = {
  receipts: Receipt[]
}

export function ReceiptList({ receipts }: ReceiptListProps) {
  const table = useReactTable({
    data: receipts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border-b border-outline-variant"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left font-medium text-on-surface-variant"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-outline-variant last:border-0 hover:bg-surface-container"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3 text-on-surface">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}