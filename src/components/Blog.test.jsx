import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import { vi } from "vitest";

describe("<Blog />", () => {
  const blog = {
    title: "test title",
    user:{
      username:"tester"
    }
  };
  const handleDelete = vi.fn();
  const currentUser = "tester";

  test("renders blog title", () => {

    render(<Blog blog={blog} handleDelete={handleDelete} currentUser={currentUser}/>);

    const element = screen.getByTestId("blog");
    expect(element).toHaveTextContent(blog.title);
  });
});