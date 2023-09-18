const dialog = document.getElementById('lobby') as HTMLDialogElement;
const selectEl = dialog.querySelector('select') as HTMLSelectElement;
const start = dialog.querySelector('#start') as HTMLButtonElement;
const levels = dialog.querySelectorAll('button.block') as NodeListOf<HTMLButtonElement>;
const selected = { ref: levels[0], level: +levels[0].value, mode: +selectEl.value };

start.addEventListener('click', (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  dialog.close(selectEl.value); // Have to send the select box value here.
  selected.mode = +selectEl.value;
});

levels.forEach((level) => {
  level.addEventListener('click', (event) => {
    selected.ref.classList.remove('selected');
    selected.ref = level;
    selected.level = +level.value;
    selected.ref.classList.add('selected');
  });
});

export { dialog, selected };
