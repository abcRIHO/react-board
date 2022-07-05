import React, { useEffect } from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import PostList from '../../components/post/PostList';
import { listPosts } from '../../modules/posts';

const PostListContainer = ({ match }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = useParams();

    const { posts, error, loading, user } = useSelector(
        ({ posts, loading, user }) => ({
            posts: posts.posts,
            error: posts.error,
            loading: loading['posts/LIST_POSTS'],
            user: user.user,
        }),
    );
    useEffect(() => {
        const { username } = params;
        const { tag, page } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        dispatch(listPosts({ tag, username, page }));
    }, [dispatch, location.search, params]);

    return (
        <PostList loading={loading} error={error} posts={posts} showWriteButton={user} />
    );
};

export default PostListContainer;