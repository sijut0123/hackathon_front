import './home.css';
import { useState } from "react";
import { useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  getPaginationRowModel,
} from '@tanstack/react-table';
import LogoutForm from "./LogoutForm";
import PersistentDrawerLeft from "./sidecontents/PersistentDrawerLeft";
import { Sidemenu } from "./sidecontents/sidemenu";
import  PersistentDrawerMainContent  from "./sidecontents/persistentDrawerMainContent";
import { useNavigate } from "react-router-dom";

interface UserData {
  curriculum : string;
  category : string;
  title : string;
  body : string;
  datetime_column : string;
}

function Home() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [pageSize, setPageSize] = useState<number>(30);

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
  ];

  const table = useReactTable({
    data: userData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const navigate = useNavigate()
  const movetoaddcontents = () => {
    navigate("/addcontents");
  }

  return (
    <div className="App">
      <PersistentDrawerLeft
        sidemenu={<Sidemenu/>}
        mainContent={<PersistentDrawerMainContent/>}
      />
      <header className="App-header">
        <div>
          <>
          <button onClick={movetoaddcontents}>
              新規追加
          </button>
          </>
        </div>
        <LogoutForm />
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