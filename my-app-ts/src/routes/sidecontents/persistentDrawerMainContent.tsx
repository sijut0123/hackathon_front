import "./oscommand.css";
import { useState } from "react";
import { useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  getPaginationRowModel,
} from '@tanstack/react-table';
import FetchUsers from "./FetchUsers";
import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export type User = {
  id : string;
  curriculum : string;
  category : string;
  title : string;
  body : string;
  datetime_column : string;
}

const PersistentDrawerMainContent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pageSize, setPageSize] = useState<number>(30);

  useEffect(() => {
    FetchUsers((user: User[]) => { setUsers(user) });
  },[]);

  const columnHelper = createColumnHelper<User>();

  const columns = [
    {
      id: 'select',
      header: () => (
        <Checkbox
          //現在のページの全ての行が選択されているかどうか
          checked={table.getIsAllRowsSelected()}
          //全ての行のチェックボックスを切り替えるために使用するハンドラーを返す
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }:{row : any}) => (
        <Checkbox
          //行が選択されているかどうか
          checked={row.getIsSelected()}
          //未実施の場合は非活性
          disabled={!row.original.isDone}
          //チェックボックスを切り替えるために使用するハンドラーを返す
          onChange={row.getToggleSelectedHandler()}
        />
      )
    },
    {
      accessorKey: "id",
      header:"Id",
    },
    {
      accessorKey: "curriculum",
      header:"Curriculum",
    },
    {
      accessorKey: "category",
      header:"Category",
    },
    {
      accessorKey: "title",
      header:"Title",
    },
    {
      accessorKey: "body",
      header:"Body",
    },
    {
      accessorKey: "datetime_column",
      header:"Date",
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  
  return (
    <div className="App">
      <header className="App-header">
      </header>
        <div style={{ margin: '2em' }}>
      <h1>Posts List</h1>
      <div>Page Size</div>
        <select
          value={pageSize}
          onChange={(e) => {
            table.setPageSize(parseInt(e.target.value));
            setPageSize(parseInt(e.target.value));
          }}
        >
          <option value={10}>10</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <div style={{ display: 'flex', marginBottom: '1em' }}>
        <button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
        >
            Privious
        </button>
        {Array.from({ length: table.getPageCount() }, (_, i) => i).map(
        (index) => (
            <div
            key={index}
            style={{
              backgroundColor:
                table.getState().pagination.pageIndex === index ? 'blue' : '',
              color:
                table.getState().pagination.pageIndex === index
                  ? 'white'
                  : 'black',
              padding: '0 0.5em 0 0.5em',
              margin: '0 0.2em 0 0.2em',
              cursor: 'pointer',
            }}
            onClick={() => table.setPageIndex(index)}
            >
                {index + 1}
            </div>
        )
    )}
    <button
    disabled={!table.getCanNextPage()}
    onClick={() => table.nextPage()}
    >
    Next
    </button>
  </div>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table
            .getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </div>
    );
  }

export default PersistentDrawerMainContent;