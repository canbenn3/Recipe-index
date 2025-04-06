import React, { useState } from "react";
import { Header } from "./Components/Header";
import { UploadForm } from "./Components/UploadForm";

function App() {
  const [page, setPage] = useState<string>("home");
  return (
    <>
      <Header />
      <main>
        <UploadForm />
      </main>
    </>
  );
}

export default App;
