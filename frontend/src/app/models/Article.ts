import { Category } from "./Category";
import { User } from "./User";

export class Article {
    id?: number;
    title: string;
    description: string;
    imageUrl: string;
    category: Category; 
    user: User;
    createdDate?: Date;
    updatedDate?: Date;
    deleteDate?: Date;

    constructor(
        title: string,
        description: string,
        imageUrl: string,
        category: Category,
        user: User,
        createdDate?: Date,
        updatedDate?: Date,
        delete_date?: Date,
        id?: number
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.category = category;
        this.user = user;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.deleteDate = delete_date;
    }
}
