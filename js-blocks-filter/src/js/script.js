const strColors = 'red green blue yellow black pink orange purple';
const countBlock = 24;

const btnCreate = document.querySelector('#btnCreate');
const container = document.querySelector('.container-blocks');
const ctrlPanel = document.querySelector('.control-panel');
const blocksStore = [];

btnCreate.addEventListener('click', () => {
  container.innerHTML = '';

  const arrColors = strColors.split(' ');

  for (let i = 0; i < countBlock; i++) {
    const block = document.createElement('div');
    const randomColor = Math.floor(Math.random() * arrColors.length);
    block.classList.add('block');
    block.classList.add(arrColors[randomColor]);

    blocksStore.push(block);
    container.appendChild(block);
  }

  ctrlPanel.classList.remove('hide');

  const btnCreateFilter = document.querySelector('#btn-create-filter');
  btnCreateFilter.addEventListener('click', clickBtnCreateFilterHandle);
});

const clickBtnCreateFilterHandle = () => {
  const ctrlPanelLogic = document.querySelector('.control-panel--logic');
  ctrlPanelLogic.classList.remove('hide');

  createFilterElement();

  const radios = document.querySelectorAll('input[type="radio"]');

  [...radios].forEach((r) =>
    r.addEventListener('change', inputCheckboxFilterHandle)
  );
};

const createFilterElement = () => {
  const inputCreateFilter = document.querySelector('#input-create-filter');
  const containerCtrlPanel = document.querySelector('.control-panel--right');

  if (inputCreateFilter.value) {
    const containerFilter = document.createElement('div');

    const labelCheckboxFilter = document.createElement('label');

    const filterName = inputCreateFilter.value.trim().replace(/ /g, '-');

    labelCheckboxFilter.innerHTML = filterName;
    labelCheckboxFilter.classList.add(filterName);

    const inputCheckboxFilter = document.createElement('input');
    inputCheckboxFilter.type = 'checkbox';
    inputCheckboxFilter.classList.add(filterName);
    inputCheckboxFilter.addEventListener('change', inputCheckboxFilterHandle);

    const btnRemove = document.createElement('button');
    btnRemove.innerHTML = '✘';
    btnRemove.addEventListener('click', removeFilterElement);

    containerFilter.append(labelCheckboxFilter, inputCheckboxFilter, btnRemove);

    containerCtrlPanel.appendChild(containerFilter);
  } else {
    alert('Фильтр не может быть пустым!');
  }
};

const inputCheckboxFilterHandle = () => {
  const radios = document.querySelectorAll('input[type="radio"]');

  const radioIndex = [...radios].findIndex((r) => r.checked);

  if (radios[radioIndex].id === 'or-filter') {
    addBlockToContainerFromOrFilter();
  }

  if (radios[radioIndex].id === 'except-filter') {
    addBlockToContainerFromExeptionFilter();
  }
};

addBlockToContainerFromOrFilter = () => {
  const filterBlocks = blocksStore.filter(filterOr);

  container.innerHTML = '';

  if (filterBlocks.length === 0) {
    blocksStore.forEach(addBlockToContainer);
  } else {
    filterBlocks.forEach(addBlockToContainer);
  }
};

addBlockToContainerFromExeptionFilter = () => {
  const filterBlocks = blocksStore.filter(filterOr);

  const filterExceptionBlocks = blocksStore.filter(
    (block) => !filterBlocks.includes(block)
  );

  container.innerHTML = '';

  if (filterExceptionBlocks.length === 0) {
    blocksStore.forEach(addBlockToContainer);
  } else {
    filterExceptionBlocks.forEach(addBlockToContainer);
  }
};

const filterOr = (block) => {
  const checks = document.querySelectorAll('input[type="checkbox"]');

  return [...checks].find(
    (checkbox) =>
      checkbox.checked && checkbox.classList.contains(block.classList[1])
  );
};

const addBlockToContainer = (block) => {
  container.appendChild(block);
};

const removeFilterElement = (e) => {
  e.target.parentNode.remove();
  inputCheckboxFilterHandle();
};
