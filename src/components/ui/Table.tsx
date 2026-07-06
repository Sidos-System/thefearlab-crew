import type { ReactNode } from "react";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
};

type TableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  className?: string;
};

export default function Table<T>({
  columns,
  rows,
  getRowKey,
  className,
}: TableProps<T>) {
  return (
    <Card
      className={cn("overflow-hidden p-0", className)}
      padding="none"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead className="border-b border-border-soft bg-surface-1/70 text-xs uppercase text-text-muted">
            <tr>
              {columns.map((column) => (
                <th
                  className={cn("px-5 py-4 font-bold", column.className)}
                  key={column.key}
                  scope="col"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {rows.map((row) => (
              <tr
                className="transition duration-200 hover:bg-surface-3/50"
                key={getRowKey(row)}
              >
                {columns.map((column) => (
                  <td
                    className={cn("px-5 py-4 text-text-secondary", column.className)}
                    key={column.key}
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
