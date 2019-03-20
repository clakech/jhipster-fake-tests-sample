import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISample } from 'app/shared/model/sample.model';
import { AccountService } from 'app/core';
import { SampleService } from './sample.service';

@Component({
    selector: 'jhi-sample',
    templateUrl: './sample.component.html'
})
export class SampleComponent implements OnInit, OnDestroy {
    samples: ISample[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected sampleService: SampleService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.sampleService
            .query()
            .pipe(
                filter((res: HttpResponse<ISample[]>) => res.ok),
                map((res: HttpResponse<ISample[]>) => res.body)
            )
            .subscribe(
                (res: ISample[]) => {
                    this.samples = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSamples();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISample) {
        return item.id;
    }

    registerChangeInSamples() {
        this.eventSubscriber = this.eventManager.subscribe('sampleListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
