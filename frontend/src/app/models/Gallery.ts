import { User } from "./User";

export class Gallery {
    name: string;
    description: string;
    logo: string;
    background: string;
    video?: string;
    user: User
    created_date?: Date;
    updated_date?: Date;
    delete_date?: Date;
  
    constructor(
      name: string,
      description: string,
      background: string,
      logo: string,
      user: User,
      video?: string,
      created_date?: Date,
      updated_date?: Date,
      delete_date?: Date
    ) {
      this.name = name;
      this.description = description;
      this.background = background;
      this.logo = logo;
      this.video = video;
      this.user = user;
      this.created_date = new Date();
      this.updated_date = new Date();
      this.delete_date = delete_date;
    }
  }
  