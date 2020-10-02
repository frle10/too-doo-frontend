import { UNTITLED } from './constants';
export const focusInput = () => {
  const input = document.getElementById('toDoListName') as HTMLInputElement;
  setTimeout(() => input.focus(), 0);
};

export const makeEditable = (setShowInput: (showInput: boolean) => void) => {
  setShowInput(true);
  focusInput();
};

export const validateNameChange = (
  setShowInput: (showInput: boolean) => void,
  changeName: (name: string) => void
) => {
  const input = document.getElementById('toDoListName') as HTMLInputElement;
  if (!input.value) {
    input.value = UNTITLED;
  }

  changeName(input.value);
  setShowInput(false);
};
