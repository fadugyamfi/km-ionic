
export default class Notification {

    public id: number | null = null;
    public title: string | null = null;
    public content: string | null = null;
    public type: string | null = null;
    public type_id: number | null = null;
    public category: string | null = null;
    public created_at: string | null = null;
    public notifiable: object | null = null;

    constructor(data: object) {
        Object.assign(this, data)
    }
};
