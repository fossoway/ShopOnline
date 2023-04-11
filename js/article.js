const currentURL = window.location.search;
const curPage = new URLSearchParams(currentURL);
const id = +curPage.getAll('id');


const loadArticle = async (currentPage) => {
  const response = await fetch(`https://gorest.co.in/public-api/posts/${currentPage}`);
  const article = await response.json();
  return article.data;
}


const loadAuthor = async (authorID) => {
  const response = await fetch(`https://gorest.co.in/public-api/users/${authorID}`);
  const author = await response.json();
  return author.data.name;
}


const post = await loadArticle(id);
const authorName = await loadAuthor(post.user_id);
const nav = document.querySelector('.navigation__item-title');
const title = document.querySelector('.article__title');
const body = document.querySelector('.article__body');
const author = document.querySelector('.article__author');


nav.innerText = post.title;
title.innerText = post.title;
body.innerText = post.body;
author.innerText = authorName ? authorName : 'Автор неизвестен';
