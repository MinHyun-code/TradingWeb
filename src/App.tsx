import CommonRouter from "@/router/CommonRouter";
import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./ThemeProvider";

function App() {
  return (
    <>
      <ThemeProvider>
        <Toaster />
        <CommonRouter />
      </ThemeProvider>
    </>
  );
}

export default App;
