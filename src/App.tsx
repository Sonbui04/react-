import { ThemeProvider } from "./components/theme-context";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Lesson51 from "./lessons/lesson51/Lesson51_MemoPitfalls";

export default function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Lesson51/>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
