import { Timestamp } from "rxjs";

export interface noteInterface {
    id: string,
    iduser: string,
    archived: boolean,
    content: string,
    date: number,
    title: string
}