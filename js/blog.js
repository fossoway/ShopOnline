export const loadArticle = async (page) => {
  if (page === 1) {
    const response = await fetch('https://gorest.co.in/public-api/posts');
    const articleList = await response.json();
    return {posts: articleList.data,
      meta: articleList.meta};
  }
  const response = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);
  const articleList = await response.json();
  return {posts: articleList.data,
    meta: articleList.meta};
}


const createPost = post => {
  const blogItem = document.createElement('div');
  blogItem.classList.add('blog__item');

  const postImg = document.createElement('img');
  postImg.src = 'img/blog/image.png';
  postImg.width = 195;

  const postDescription = document.createElement('div');
  postDescription.classList.add('blog__description');

  const postHeader = document.createElement('div');
  postHeader.classList.add('blog__header');

  const postTitle = document.createElement('h2');
  postTitle.classList.add('blog__title');

  const postLink = document.createElement('a');
  postLink.href = `article.html?id=${post.id}`;

  let title = post.title;
  if (title.length > 50) {
    title = post.title.slice(0, 50) + '...';
  }

  postLink.innerText = title;
  postTitle.append(postLink);

  const postDate = document.createElement('p');
  postDate.classList.add('blog__date');
  const today = new Date();
  postDate.innerText = today.toLocaleString();

  postHeader.append(postTitle, postDate);

  const postInform = document.createElement('div');
  postInform.classList.add('blog__inform');

  const postView = document.createElement('p');
  postView.classList.add('blog__views');
  postView.innerText = '0';
  const viewIcon = document.createElement('span');
  viewIcon.classList.add('blog__views-icon');
  postView.prepend(viewIcon);

  const postComment = document.createElement('p');
  postComment.classList.add('blog__comments');
  postComment.innerText = '0';
  const commentIcon = document.createElement('span');
  commentIcon.classList.add('blog__comments-icon');
  postComment.prepend(commentIcon);

  postInform.append(postView, postComment);

  postDescription.append(postHeader, postInform);

  blogItem.append(postImg, postDescription);

  return blogItem;
};


export const renderPosts = (postsList, app) => {
  const render = postsList.map(createPost);
  app.append(...render);
}


const currentURL = window.location.search;
export const currentPage = +(new URLSearchParams(currentURL)).getAll('page');
const pagesList = document.querySelectorAll('.pagination__item');
export const {posts, meta} = await loadArticle(currentPage);
const blog = document.querySelector('.blog');
blog.innerText = '';
renderPosts(posts, blog);
pagesList.forEach(item => {
  console.log(+item.innerText);
  if (+item.innerText === currentPage) {
    item.classList.add('pagination__item-active')
  }
});
