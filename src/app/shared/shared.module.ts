import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthDirective } from '../shared/directive/auth.directive';
import { SlideToggleComponent } from './components/slide-toggle/slide-toggle.component';
import { VideoEntryComponent } from './components/video-entry/video-entry.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BoxDeletionEstimationPipe } from './pipes/box-deletion-estimation.pipe';
import { ThemeService } from './services/theme.service';
import { UserService } from './services/user.service';
import { FilterPipe } from './pipes/filter.pipe';
import { PictureUploaderComponent } from './components/picture-uploader/picture-uploader.component';
import { BxAlertComponent } from './components/bx-alert/bx-alert.component';
import { DurationPipe } from './pipes/duration.pipe';
import { LikeButtonComponent } from 'app/modules/jukebox/components/like-button/like-button.component';
import { BxButtonComponent } from './components/bx-button/bx-button.component';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
    ],
    declarations: [
        AuthDirective,
        SlideToggleComponent,
        VideoEntryComponent,
        BoxDeletionEstimationPipe,
        FilterPipe,
        PictureUploaderComponent,
        BxAlertComponent,
        DurationPipe,
        LikeButtonComponent,
        BxButtonComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthDirective,
        SlideToggleComponent,
        VideoEntryComponent,
        NgbModule,
        BoxDeletionEstimationPipe,
        FilterPipe,
        PictureUploaderComponent,
        BxAlertComponent,
        DurationPipe,
        LikeButtonComponent,
        BxButtonComponent
    ],
    providers: [AuthDirective, ThemeService, UserService],
    entryComponents: [
        PictureUploaderComponent
    ]
})
export class SharedModule { }
