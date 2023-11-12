import "./contents.css";
import "../home.css"
import { useState } from "react";
import { useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import FetchUsers from "../FetchUsers";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { FetchDelete } from "../FetchDelete";
import { useNavigate } from "react-router-dom";
import Filter from "./Filter"

export type User = {
  id              : string;
  curriculum      : string;
  category        : string;
  title           : string;
  url             : string;
  body            : string;
  datetime_column : string;
};

const PersistentDrawerMainContent = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pageSize, setPageSize] = useState<number>(30);

  useEffect(() => {
    FetchUsers((user: User[]) => { setUsers(user) });
  },[]);

  const navigate = useNavigate()
  const movetoupdate = (id: string) => {
    navigate(`${id}`);
  };
  const movetocontents = (id : string ) => {
    navigate(`/contents/${id}`);
  };
  const movetoaddcontents = () => {
    navigate("/addcontents");
  }

  const columnHelper = createColumnHelper<User>();

  const columns = [
    columnHelper.accessor('curriculum',{
      header:"カリキュラム",
      enableSorting: false,
      enableColumnFilter: false,
    }),
    columnHelper.accessor('category', {
      header: 'カテゴリー',
      enableSorting: false,
    }),
    columnHelper.accessor('title', {
      header: 'タイトル',
      enableSorting: false,
      enableColumnFilter: false,
    }),
    columnHelper.accessor('datetime_column', {
      header:  '更新日時',
      enableColumnFilter: false,
    }),
    columnHelper.display({
      id: 'contents',
      header: '詳細',
      cell: (props) => (
        <button onClick={() => movetocontents(props.row.original.id)}>
          詳細
        </button>
      ),
    }),
    columnHelper.display({
      id: 'update',
      header: '更新',
      cell: (props) => (
        <button onClick={() => movetoupdate(props.row.original.id)}>
          更新
        </button>
      ),
    }),
    columnHelper.display({
      id: 'delete',
      header: () => '削除',
      cell: (props) => (
        <button onClick={() => FetchDelete(props.row.original.id)}>
          削除
        </button>
      ),
    }),
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 30,
      },
    },
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  
  return (
    <div className="App">
        <div style={{ margin: '2em' }}>
      <h1>一覧</h1>
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
            ◀️前
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
          次▶️
        </button>
        <button onClick={movetoaddcontents} >
          新規追加
      </button>
  </div>
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell 
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted() as string] ?? null}
                  {header.column.getCanFilter() ? (
                      <div>
                        <Filter column={header.column} table={table} />
                      </div>
                    ) : null}
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