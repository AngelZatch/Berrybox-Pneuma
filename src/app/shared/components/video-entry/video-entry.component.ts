import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Video } from '../../models/video.model';
import { UserService } from 'app/shared/services/user.service';
import { JukeboxService } from 'app/modules/jukebox/jukebox.service';
import { Permission, QueueItem } from '@teamberry/muscadine';

@Component({
    selector: 'app-video-entry',
    templateUrl: './video-entry.component.html',
    styleUrls: ['./video-entry.component.scss']
})
export class VideoEntryComponent implements OnInit {
    @Input() video: Video;
    @Input() permissions: Array<Permission> = [];
    @Input() options: {
        none?: boolean,
        submit?: boolean,
        inQueue?: boolean,
        forceNext?: boolean,
        forcePlay?: boolean,
        removeFromPlaylist?: boolean,
        addToPlaylist?: boolean,
        berries?: boolean,
    } = {}

    appliedOptions = {
        none: false,
        submit: false,
        inQueue: false,
        forceNext: false,
        forcePlay: false,
        removeFromPlaylist: false,
        addToPlaylist: false,
        berries: false,
    }

    @Output() submit: EventEmitter<{ video: Video, flag?: 'next' | 'now' }> = new EventEmitter();
    @Output() addedToPlaylist: EventEmitter<Video> = new EventEmitter();
    @Output() removedFromPlaylist: EventEmitter<Video> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        this.buildOptions()
    }

    buildOptions() {
        if (this.options.none) {
            this.appliedOptions.none = true;
            return;
        }
        Object.keys(this.options).map(
            (value: string) => {
                this.appliedOptions[value] = this.options[value] ?? this.appliedOptions[value]
            }
        )
    }

    submitVideo(flag?: 'now' | 'next') {
        this.submit.emit({ video: this.video, flag });
    }

    addToPlaylist() {
        this.addedToPlaylist.emit(this.video);
    }

    removeFromPlaylist() {
        this.removedFromPlaylist.emit(this.video);
    }
}
