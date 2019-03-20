export interface ISample {
    id?: number;
    city?: string;
    stateProvince?: string;
}

export class Sample implements ISample {
    constructor(public id?: number, public city?: string, public stateProvince?: string) {}
}
