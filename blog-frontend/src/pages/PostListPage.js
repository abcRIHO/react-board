import React from 'react';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import HeaderContainer from '../containers/common/HeaderContainer';
import PostList from '../components/post/PostList';
import PostListContainer from '../containers/posts/PostListContainer';
import PaginationContainer from '../containers/posts/PaginationContainer';

const PostListPage = () => {
    return (
    <div>
        <HeaderContainer />
        <PostListContainer />
        <PaginationContainer />
    </div>
    );
};

export default PostListPage;