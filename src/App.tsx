import { ThemeProvider } from "./components/theme-context";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Lesson40 from "./lessons/lesson40/Lesson40_FinalTodoApp";

export default function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Lesson40 />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
