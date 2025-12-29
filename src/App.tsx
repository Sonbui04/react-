import { ThemeProvider } from "./components/theme-context";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Lesson36 from "./lessons/lesson36/Lesson36_ComplexForm";

export default function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Lesson36 />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
