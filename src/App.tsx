import { ThemeProvider } from "./components/theme-context";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Lesson49 from "./lessons/lesson49/Lesson49_InfiniteScroll";

export default function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Lesson49 />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
