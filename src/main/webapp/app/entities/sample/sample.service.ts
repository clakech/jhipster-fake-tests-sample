import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISample } from 'app/shared/model/sample.model';

type EntityResponseType = HttpResponse<ISample>;
type EntityArrayResponseType = HttpResponse<ISample[]>;

@Injectable({ providedIn: 'root' })
export class SampleService {
    public resourceUrl = SERVER_API_URL + 'api/samples';

    constructor(protected http: HttpClient) {}

    create(sample: ISample): Observable<EntityResponseType> {
        return this.http.post<ISample>(this.resourceUrl, sample, { observe: 'response' });
    }

    update(sample: ISample): Observable<EntityResponseType> {
        return this.http.put<ISample>(this.resourceUrl, sample, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ISample>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ISample[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
