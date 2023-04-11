import {meta, currentPage} from "./blog.js";


const createPageList = (number) => {
  const page = document.createElement('a');
  page.classList.add('pagination__item');
  page.innerText = number;

  if (number === 1 && currentPage === 0) {
    page.href = `blog.html`;
    page.classList.add('pagination__item-active');
  } else {page.href = `blog.html?page=${number}`}

  if (number === currentPage) {
    page.classList.add('pagination__item-active');
  }

  return page;
}


const pageList = document.querySelector('.pagination__list');
const rightButton = document.querySelector('.pagination__arrow-right');
const leftButton = document.querySelector('.pagination__arrow-left');
pageList.innerText = '';
const allPages = meta.pagination.pages;
let firstPage = 1;
const gap = 5;

if (currentPage > 1) {
  firstPage = currentPage;
  leftButton.classList.add('pagination__arrow-left-active');
}

const renderPages = (firstPage, gap, app) => {
  let n = firstPage;

  let limit = firstPage + gap - 1;

  if ((firstPage + gap) > allPages) {
    limit = allPages;
    rightButton.classList.add('pagination__arrow-right-disabled');
    rightButton.disabled = true;
  }

  if (firstPage <= 1) {
    n = 1;
    leftButton.disabled = true;
    leftButton.classList.remove('pagination__arrow-left-active');
  }

  for (n; n <= limit; n += 1) {
    const page = createPageList(n);
    app.append(page);
  }
}


renderPages(firstPage, gap, pageList);

rightButton.addEventListener('click', e => {
  firstPage = firstPage + gap;
  pageList.innerText = '';
  leftButton.disabled = false;
  leftButton.classList.add('pagination__arrow-left-active');
  renderPages(firstPage, gap, pageList);
})


leftButton.addEventListener('click', e => {
  firstPage = firstPage - gap;
  pageList.innerText = '';
  rightButton.disabled = false;
  rightButton.classList.remove('pagination__arrow-right-disabled');
  renderPages(firstPage, gap, pageList);
})
