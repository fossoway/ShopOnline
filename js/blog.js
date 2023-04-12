export const loadArticle = async (page) => {
  // if (page === 1) {
  //   const response = await fetch('https://gorest.co.in/public-api/posts');
  //   const articleList = await response.json();
  //   console.log(articleList);
  //   return {posts: articleList.data,
  //     meta: articleList.meta};
  // }
  const response = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);
  const articleList = await response.json();

  return {
    posts: articleList.data,
    meta: articleList.meta,
  };
}


const createTitle = (postTitle, postId) => {
  const title = document.createElement('h2');
  title.classList.add('blog__title');

  const postLink = document.createElement('a');
  postLink.href = `article.html?id=${postId}`;

  let postName = postTitle;
  if (postName.length > 50) {
    postName = postTitle.slice(0, 50) + '...';
  }

  postLink.innerText = postName;
  title.append(postLink);

  return title;
};


const createView = () => {
  const postView = document.createElement('p');
  postView.classList.add('blog__views');
  postView.innerText = '0';
  const viewIcon = document.createElement('span');
  viewIcon.classList.add('blog__views-icon');
  postView.prepend(viewIcon);

  return postView;
}


const createComment = () => {
  const postComment = document.createElement('p');
  postComment.classList.add('blog__comments');
  postComment.innerText = '0';
  const commentIcon = document.createElement('span');
  commentIcon.classList.add('blog__comments-icon');
  postComment.prepend(commentIcon);

  return postComment;
}


const createImg = (width) => {
  const postImg = document.createElement('img');
  postImg.src = 'img/blog/image.png';
  postImg.width = width;

  return postImg;
}


const createDate = () => {
  const postDate = document.createElement('p');
  postDate.classList.add('blog__date');
  const today = new Date();
  postDate.innerText = today.toLocaleString();
   return postDate;
}


const createPost = post => {
  const blogItem = document.createElement('div');
  blogItem.classList.add('blog__item');

  const img = createImg(195);

  const postDescription = document.createElement('div');
  postDescription.classList.add('blog__description');

  const postHeader = document.createElement('div');
  postHeader.classList.add('blog__header');

  const title = createTitle(post.title, post.id);
  const date = createDate();

  postHeader.append(title, date);

  const postInform = document.createElement('div');
  postInform.classList.add('blog__inform');

  const view = createView();
  const comment = createComment();

  postInform.append(view, comment);
  postDescription.append(postHeader, postInform);
  blogItem.append(img, postDescription);

  return blogItem;
};


export const renderPosts = (postsList, app) => {
  const render = postsList.map(createPost);
  app.append(...render);
}


const app = async () => {
  const currentURL = window.location.search;
  const currentPage = +(new URLSearchParams(currentURL)).getAll('page');
  const {posts, meta} = await loadArticle(currentPage);
  const blog = document.querySelector('.blog');
  console.log(meta, currentPage);
  renderPosts(posts, blog);
  return {
    page: currentPage,
    meta,
  }
}


export const {page, meta} = await app();
