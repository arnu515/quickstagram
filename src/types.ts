export interface User {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: any;
    role: number;
    created_at: string;
    updated_at: string;
}

export interface Post {
    id: number;
    user: User;
    content: string;
    image: Image;
    comments: Comment[];
    published_at: string;
    created_at: string;
    updated_at: string;
}

export interface Comment {
    id: number;
    content: number;
    user: null | User;
    post: number;
    published_at: string;
    created_at: string;
    updated_at: string;
}

export interface Image {
    id: number;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
        thumbnail: ImageMetaData;
        large: ImageMetaData;
        medium: ImageMetaData;
        small: ImageMetaData;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null | string;
    provider: string;
    provider_metadata: null | any;
    created_at: string;
    updated_at: string;
}

interface ImageMetaData {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path: null | string;
    url: number;
}
