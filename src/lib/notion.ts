import { Client } from '@notionhq/client';
import { Post } from './types';

const client = new Client({
    auth: process.env.NOTION_KEY,
});

async function posts(): Promise<Post[]> {
    const myPosts = await client.databases.query({
        database_id: `${process.env.NOTION_DATABASE}`,
    });

    const formattedPosts: Post[] = myPosts.results.map((post: any) => ({
        id: post.id,
        title: post.properties.Name.title[0].plain_text,
        date: post.properties.Date.date.start,
    }));

    return formattedPosts;
}

export { posts };
