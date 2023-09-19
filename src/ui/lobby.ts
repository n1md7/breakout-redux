import { stages } from '/src/commands/stage/stages';

const dialog = document.getElementById('lobby') as HTMLDialogElement;
const selectEl = dialog.querySelector('select') as HTMLSelectElement;
const start = dialog.querySelector('#start') as HTMLButtonElement;

{
  const levels = dialog.querySelector('div.levels') as HTMLDivElement;

  for (const [index, stage] of stages.entries()) {
    const classes = index === 0 ? 'block selected' : 'block';
    const disabled = stage.isUnlocked() ? '' : 'disabled';
    levels.innerHTML += `<button class="${classes}" value="${index}" ${disabled}>${stage.name}</button>`;
  }
}

const levels = dialog.querySelectorAll('button.block') as NodeListOf<HTMLButtonElement>;
const selected = { ref: levels[0], level: +levels[0].value, mode: +selectEl.value };

start.addEventListener('click', (event) => {
  event.preventDefault();
  selected.mode = +selectEl.value;
  dialog.close();
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
