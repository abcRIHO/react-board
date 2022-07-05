import qs from 'qs';
import client from "./client";

export const writePost = ({ title, body, tags }) =>
    client.post('/api/posts', { title, body, tags });

export const readPost = id => client.get(`/api/posts/${id}`);
// /api/posts?username=tester&page=2 와 같은 형태로 주소 호출

export const listPosts = ({ page, username, tag }) => {
    const queryString = qs.stringify({
        page,
        username,
        tag,
    });
    return client.get(`/api/posts?${queryString}`);
}

export const updatePost = ({ id, title, body, tags }) => 
    client.patch(`/api/posts/${id}` , { 
        title,
        body,
        tags,
    });

export const removePost = id => client.delete(`/api/posts/${id}`);