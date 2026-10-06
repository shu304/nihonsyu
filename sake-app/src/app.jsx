import { useState } from "react";
import List from "./pages/List.jsx";
import Edit from "./pages/Edit.jsx";

export default function App() {
  const [page, setPage] = useState("list");

  return (
    <>
      {page === "list" && <List goEdit={() => setPage("edit")} />}
      {page === "edit" && <Edit goList={() => setPage("list")} />}
    </>
  );
}
