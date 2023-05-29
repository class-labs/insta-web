type Author = {
  id: string;
  name: string;
  profilePhoto: string;
};

type Comment = {
  id: string;
  text: string;
  author: Author;
  createdAt: string;
};

export type GetPost = {
  post: {
    id: string;
    photo: string;
    caption: string;
    isLikedByViewer: boolean;
    likeCount: number;
    author: Author;
    comments: Array<Comment>;
  };
};

export type Post = {
  id: string;
  photo: string;
  caption: string;
  likeCount: number;
  commentCount: number;
  isLikedByViewer: boolean;
  author: Author;
  createdAt: string;
};
