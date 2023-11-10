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
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export type User = {
  id :string
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
    columnHelper.accessor('curriculum',{
      header:"Curriculum",
    }),
    columnHelper.accessor('category', {
      header: 'Category',
    }),
    columnHelper.accessor('title', {
    header: () => 'Title',
    }),
    columnHelper.accessor('body', {
      header: 'Body',
      cell: (props) => props.getValue().toUpperCase(),
    }),
    columnHelper.accessor('datetime_column', {
      header: () => 'Date',
    }),
    columnHelper.display({
      id: 'delete',
      header: () => '削除',
      cell: (props) => (
        <Button >
          削除
        </Button>
      ),
    }),
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