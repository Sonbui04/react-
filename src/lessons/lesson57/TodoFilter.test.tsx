import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import TodoFilter, { type Todo } from "./TodoFilter";

const sample: Todo[] = [
  { id: 1, text: "learn react", done: false },
  { id: 2, text: "drink coffee", done: true },
  { id: 3, text: "learn typescript", done: false },
];

describe("TodoFilter (component test with RTL)", () => {
  test("render đúng số lượng ban đầu", () => {
    render(<TodoFilter todos={sample} />);

    expect(screen.getByText(/Showing: 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Done: 1/i)).toBeInTheDocument();
  });

  test("user gõ search => list lọc theo query", async () => {
    const user = userEvent.setup();
    render(<TodoFilter todos={sample} />);

    await user.type(screen.getByLabelText("Search"), "react");

    expect(await screen.findByText("learn react")).toBeInTheDocument();
    expect(screen.queryByText("learn typescript")).not.toBeInTheDocument();
  });

  test("Clear done disabled khi không có done trong visible list", async () => {
    const user = userEvent.setup();
    render(<TodoFilter todos={sample} />);

    await user.type(screen.getByLabelText("Search"), "typescript");

    const btn = await screen.findByRole("button", { name: "Clear done" });
    expect(btn).toBeDisabled();
  });

  test("click Clear done gọi callback khi có done", async () => {
    const user = userEvent.setup();
    const onClearDone = vi.fn();

    render(<TodoFilter todos={sample} onClearDone={onClearDone} />);

    const btn = screen.getByRole("button", { name: "Clear done" });
    expect(btn).toBeEnabled();

    await user.click(btn);
    expect(onClearDone).toHaveBeenCalledTimes(1);
  });
}); 
