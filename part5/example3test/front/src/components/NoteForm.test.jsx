import { render, screen } from "@testing-library/react";
import { NoteForm } from "./NoteForm";
import userEvent from "@testing-library/user-event";

test("<NoteForm /> updates parent state and calls onSubmit", async () => {
  const createNote = vi.fn();
  const user = userEvent.setup();

  const { container } = render(<NoteForm createNote={createNote} />);

  // const input = screen.getByRole("textbox"); //devuelve un arreglo con todos los inputs
  const input = screen.getByPlaceholderText("write note content here"); //devuelve el input encontrado con el valor en el plaveholder
  // const input = container.querySelector("#note-input"); //devuelve el input encontrado por el id de la etiqueta input
  const sendButton = screen.getByText("save");

  await user.type(input, "testing a form...");
  await user.click(sendButton);

  console.log(createNote.mock.calls);

  expect(createNote.mock.calls).toHaveLength(1);
  expect(createNote.mock.calls[0][0].content).toBe("testing a form...");
});
