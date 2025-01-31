import { Category } from "./Category";
import { User } from "./User";

export class Article {
    id?: number;
    title: string;
    description: string;
    image_url: string;
    category: Category; 
    user: User;
    created_date?: string;
    updated_date?: string;
    delete_date?: string | null;

    constructor(
        title: string,
        description: string,
        image_url: string,
        category: Category,
        user: User,
        created_date: string = new Date().toISOString(),
        updated_date: string = new Date().toISOString(),
        delete_date: string | null = null,
        id?: number
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image_url = image_url;
        this.category = category;
        this.user = user;
        this.created_date = created_date;
        this.updated_date = updated_date;
        this.delete_date = delete_date;
    }
}
