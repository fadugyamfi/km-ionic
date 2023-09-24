
export default class User {

    public id_cms_privileges: number | null = null;
    public phone_number: string | null = null;
    public name: string | null = null;
    public parent_users_id: number | null = null;
    public location: string | null = null;
    public id: number | null = null;

    constructor(data: Object) {
        Object.assign(this, data)
    }

    firstName() {
        return this.name?.split(' ')[0];
    }

    isSuperAdmin() {
        return this.id_cms_privileges == 1;
    }

    isSaleAgent() {
        return this.id_cms_privileges == 5;
    }

    isSalesManager() {
        return this.id_cms_privileges == 2; // Sales Manager
    }

    isOwner() {
        return this.id_cms_privileges == 4; // Owner
    }
}
