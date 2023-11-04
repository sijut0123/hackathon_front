import React from "react";
import "./home.css";
import { useState } from "react";
import { useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Outlet } from "react-router-dom";
import LogoutForm from "./LogoutForm";

interface UserData {
  category : string;
  title : string;
  body : string;
  url : string;
}

function Home() {
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [userData, setUserData] = useState<UserData[]>([]);
  const [pageSize, setPageSize] = useState<number>(30);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()

    try{
      const response = await fetch(
        "https://hackathon-backend-zjgwehekya-uc.a.run.app/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category,
            title,
            body,
            url,
          }),
        }
      );
      if (response.status === 200) {
        fetchUsers();
      } else {
        console.error("POST request failed")
      }

      setCategory("");
      setBody("");
      setTitle("");
      setUrl("");

    } catch (err) {
      console.error(err)
    }
  };

  const fetchUsers = async () => {
    try{
      const getResponse = await fetch("https://hackathon-backend-zjgwehekya-uc.a.run.app/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (getResponse.status === 200) {
        // GETリクエストの結果を処理
        const userData = await getResponse.json();
        setUserData(userData);
        // userDataを適切に処理するコードをここに追加
      } else {
        // GETリクエストが失敗した場合の処理
        console.error("GET request failed");
      }
    } catch (err) {
      console.error(err)
    }
  };

  useEffect(() => {
    fetchUsers();
  },[]);

  const columnHelper = createColumnHelper<UserData>();

  const columns = [
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
    columnHelper.accessor('url', {
      header: () => 'Url',
    }),
  ];

  const table = useReactTable({
    data: userData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="App">
      <header className="App-header">
        <div className="border">
          <p className="p">User Register </p>
        </div>
        <LogoutForm />
      </header>
        <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
          <div className="block_1">
            <label>Category: <input
              type={"text"}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="txt_1"
            ></input></label>
          </div>
          <div className="block_1">
          <label>Title: <input 
            type={"text"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="txt_1"
          ></input></label>
          </div>
          <div className="block_1">
          <label>Body: <input 
            type={"text"}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="txt_1"
          ></input></label>
          </div>
          <div className="block_1">
          <label>URL: <input 
            type={"text"}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="txt_1"
          ></input></label>
          </div>
          <button type={"submit"} className="block_1">POST</button>
        </form>
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
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    );
  }

  export default Home;