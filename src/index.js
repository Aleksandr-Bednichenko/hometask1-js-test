import './sass/main.scss';
import { categoryMarkupEl, markupEl, archivedMarkupEl } from './js/renderOperations';
import notes from './data.json';
import getRefs from "./js//getRefs";


const shortid = require('shortid');
const activeNotes = [];
const archivedNotes = [];

let editId;
let taskItemActive = [];
let taskItemArch = [];
let randomeItemActive = [];
let randomeItemArch = [];
let ideaItemActive = [];
let ideaItemArch = [];
let quoteItemActive = [];
let quoteItemArch = [];
let on = 'true';

const refs = getRefs();

refs.form.addEventListener('submit', onFormSubmit);
refs.createBtn.addEventListener('click', onCreateClick);
refs.tbodyEl.addEventListener('click', onFormClick);
window.addEventListener('click', onClick);

function filterByStatus(notes) {
  notes.map(el => {
    if (el.isActive === 'true') {
      activeNotes.push(el);
    } else {
      archivedNotes.push(el);
    }
  });
}

filterByStatus(notes);

const notesMarkup = markupEl(activeNotes);

renderActiveNotes(notesMarkup);

filterByCategories(activeNotes, archivedNotes);

function filterByCategories(activeNotes, archivedNotes) {
  const mas = [...activeNotes, ...archivedNotes];
  const result = mas
    .map(el => el.category)
    .filter((item, index, arr) => {
      return arr.indexOf(item) === index;
    });

  activeNotes.forEach(el => {
    switch (el.category) {
      case 'Task':
        taskItemActive.push(el);
        break;
      case 'Random Thought':
        randomeItemActive.push(el);
        break;
      case 'Idea':
        ideaItemActive.push(el);
        break;
      case 'Quote':
        quoteItemActive.push(el);
        break;
      default:
        break;
    }
  });

  archivedNotes.forEach(el => {
    switch (el.category) {
      case 'Task':
        taskItemArch.push(el);
        break;
      case 'Random Thought':
        randomeItemArch.push(el);
        break;
      case 'Idea':
        ideaItemArch.push(el);
        break;
      case 'Quote':
        quoteItemArch.push(el);
        break;
      default:
        break;
    }
  });

  const notesMarkup = categoryMarkupEl(
    result,
    editId,
    taskItemActive,
    taskItemArch,
    randomeItemActive,
    randomeItemArch,
    ideaItemActive,
    ideaItemArch,
    quoteItemActive,
    quoteItemArch,
  );

  renderCategories(notesMarkup);
}

function onFormSubmit(e) {
  e.preventDefault();

  makeEmptyAllArr();

  if (!editId) {
    activeNotes.push({
      id: shortid.generate(),
      name: e.target[0].value,
      category: e.target[1].value,
      created: new Date().toLocaleDateString(),
      сontent: e.target[2].value,
      dates: e.target[2].value.match(/\b\d+.|\/|-\d+.|\/|-\d+\b/g)
        ? [e.target[2].value.match(/\b\d+.|\/|-\d+.|\/|-\d+\b/g).join('')]
        : [],
      isActive: 'true',
    });
  }

  activeNotes.forEach(el => {
    if (el.id === editId) {
      el.name = document.getElementById('fname').value;
      el.category = document.getElementById('category').value;
      el.сontent = document.getElementById('сontent').value;
      const categDateValue = document
        .getElementById('сontent')
        .value.match(/\b\d+.|\/|-\d+.|\/|-\d+\b/g);

      if (categDateValue) {
        el.dates.push(categDateValue.join(''));
      }
    }
  });

  const newNotesMarkup = markupEl(activeNotes);

  renderActiveNotes(newNotesMarkup);

  filterByCategories(activeNotes, archivedNotes);
}

function onCreateClick() {
  editId = '';
  refs.modal.classList.add('isOpen');
}

function onFormClick(e) {
  if (!e.target.alt) {
    return;
  }

  switch (e.target.alt) {
    case 'pencil':
      onEditNote(e);
      break;
    case 'archive':
      onArchiveNote(e.target.parentElement.parentElement);
      break;
    case 'bin':
      onRemoveNote(e.target.parentElement.parentElement);
      break;

    default:
      break;
  }
}

function onEditNote(e) {
  editId = e.target.parentElement.parentElement.id.toString();

  document.getElementById('fname').value =
    e.target.parentElement.parentElement.children[1].textContent;
  document.getElementById('сontent').value =
    e.target.parentElement.parentElement.children[4].textContent;
    onOpenModal(e)
}

function onArchiveNote(e) {
  makeEmptyAllArr();

  if (e.className === 'active') {
    activeNotes.forEach((el, index) => {
      if (el.id === e.id) {
        if (el.isActive === 'true') {
          el.isActive = 'false';
          archivedNotes.push(el);
          activeNotes.splice(index, 1);

          const notesMarkup = markupEl(activeNotes);
          renderActiveNotes(notesMarkup);
        }
      }
    });
  }

  if (e.className === 'archived') {
    archivedNotes.forEach((el, index) => {
      if (el.id === e.id) {
        if (el.isActive === 'false') {
          el.isActive = 'true';
          activeNotes.push(el);
          archivedNotes.splice(index, 1);

          const notesMarkup = archivedMarkupEl(archivedNotes);
          renderActiveNotes(notesMarkup);
        }
      }
    });
  }
  filterByCategories(activeNotes, archivedNotes);
}

function onRemoveNote({ id }) {
  makeEmptyAllArr();

  const index = activeNotes.findIndex(el => el.id === id);
  if (index !== -1) {
    activeNotes.splice(index, 1);
  }
  const delNotes = markupEl(activeNotes);
  renderActiveNotes(delNotes);

  filterByCategories(activeNotes, archivedNotes);
}

function onClick(e) {
  if (e.target === refs.modal) {
    onCloseModal(e);
  }
  if (e.target === document.getElementById('archiveId')) {
    on === 'true' ? onArchiveRender(e) : onActiveRender(activeNotes);
  }
}

function onCloseModal(e) {
  refs.modal.classList.remove('isOpen');
}

function onOpenModal(e) {
  refs.modal.classList.add('isOpen');
}

function renderCategories(notesMarkup) {
  refs.categoryEl.innerHTML = '';
  refs.categoryEl.insertAdjacentHTML('beforeend', notesMarkup);
}

function onArchiveRender(e) {
  on = 'false';
  const btnSub = document.getElementById('sbtBtn');
  btnSub.classList.add('isHidden');

  const notesMarkup = archivedMarkupEl(archivedNotes);
  renderActiveNotes(notesMarkup);
}

function onActiveRender(e) {
  on = 'true';

  const notesMarkup = markupEl(activeNotes);
  renderActiveNotes(notesMarkup);
}

function renderActiveNotes(newNotesMarkup) {
  refs.tbodyEl.innerHTML = '';
  refs.tbodyEl.insertAdjacentHTML('beforeend', newNotesMarkup);
  onCloseModal();
}

function makeEmptyAllArr() {
  taskItemActive = [];
  taskItemArch = [];
  randomeItemActive = [];
  randomeItemArch = [];
  ideaItemActive = [];
  ideaItemArch = [];
  quoteItemActive = [];
  quoteItemArch = [];
}
