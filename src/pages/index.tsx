import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { Timeline } from 'flowbite-react';

import { posts } from '../lib/notion';
import { Post } from '../lib/types';

interface Props {
    posts: Post[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const postsList = await posts();

    return {
        props: {
            posts: postsList,
        },
    };
};

const Home: NextPage<Props> = ({ posts }) => {
    return (
        <Timeline>
            {posts.map((post) => (
                <Timeline.Item key={post.id}>
                    <Timeline.Point />
                    <Timeline.Content>
                        <Timeline.Time>{post.date}</Timeline.Time>
                        <Timeline.Title>{post.title}</Timeline.Title>
                    </Timeline.Content>
                </Timeline.Item>
            ))}
        </Timeline>
    );
};

export default Home;
