import { NgModule } from '@angular/core';

import { JhipsterFakeTestsSampleSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [JhipsterFakeTestsSampleSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [JhipsterFakeTestsSampleSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class JhipsterFakeTestsSampleSharedCommonModule {}
