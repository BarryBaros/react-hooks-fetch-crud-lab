import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

test('displays question prompts after fetching', async () => {
  render(<App />);
  expect(await screen.findByText(/Questions/i)).toBeInTheDocument();
});

test('creates a new question when the form is submitted', async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/New Question/i));

  fireEvent.change(screen.getByLabelText(/Prompt/i), {
    target: { value: 'Test Prompt' },
  });
  fireEvent.change(screen.getByLabelText(/Answer 1/i), {
    target: { value: 'Answer 1' },
  });
  fireEvent.change(screen.getByLabelText(/Answer 2/i), {
    target: { value: 'Answer 2' },
  });
  fireEvent.change(screen.getByLabelText(/Answer 3/i), {
    target: { value: 'Answer 3' },
  });
  fireEvent.change(screen.getByLabelText(/Answer 4/i), {
    target: { value: 'Answer 4' },
  });
  fireEvent.change(screen.getByLabelText(/Correct Answer/i), {
    target: { value: '0' },
  });

  fireEvent.click(screen.getByText(/Add Question/i));

  fireEvent.click(screen.getByText(/View Questions/i));

  await waitFor(() => expect(screen.getByText('Test Prompt')).toBeInTheDocument());
});

test('deletes the question when the delete button is clicked', async () => {
  render(<App />);

  fireEvent.click(screen.queryAllByText('Delete Question')[0]);

  await waitFor(() =>
    expect(screen.queryByText(/lorem testum 1/)).not.toBeInTheDocument()
  );
});

test('updates the answer when the dropdown is changed', async () => {
  render(<App />);

  // Change the correct answer of the first question
  fireEvent.change(screen.queryAllByLabelText(/Correct Answer/)[0], {
    target: { value: '3' },
  });

  await waitFor(() =>
    expect(screen.queryAllByLabelText(/Correct Answer/)[0].value).toBe('3')
  );
});
