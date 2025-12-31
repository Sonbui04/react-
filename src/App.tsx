import { ThemeProvider } from "./components/theme-context";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Lesson56 from "./lessons/lesson56/Lesson56_DesignSystem";
export default function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Lesson56 />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
