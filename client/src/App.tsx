import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/login/SignIn";
import Home from "./pages/home/Home";
import GoodNotes from "./pages/goodnotes/GoodNotes";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="notes-theme">
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route path="/goodnotes" element={<GoodNotes />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
