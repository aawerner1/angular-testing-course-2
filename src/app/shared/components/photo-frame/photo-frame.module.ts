import { LikeWidgetModule } from './../like-widget/like-widget.module';
import { PhotoFrameComponent } from './photo-frame.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [PhotoFrameComponent],
    imports: [ 
        CommonModule,
        LikeWidgetModule
    ],
    exports: [PhotoFrameComponent],
    providers: [],
})
export class PhotoFrameModule {}