import { Component, OnInit, Input } from '@angular/core';
import { YoutubeService } from 'app/shared/services/youtube.service';
import { YoutubeSearchResult, YoutubeSearchVideos } from 'app/shared/models/youtube.model';
import { Video } from 'app/shared/models/video.model';
import { SubmissionPayload } from 'app/shared/models/playlist-payload.model';
import { JukeboxService } from '../../jukebox.service';
import { AuthSubject } from 'app/shared/models/session.model';

@Component({
    selector: 'app-search-tab',
    templateUrl: './search-tab.component.html',
    styleUrls: ['./search-tab.component.scss']
})
export class SearchTabComponent implements OnInit {
    @Input() boxToken: string;
    @Input() user: AuthSubject;
    searchValue = ''

    searchResults: Array<Video> = []

    constructor(
        private jukeboxService: JukeboxService,
        private youtubeService: YoutubeService
    ) { }

    ngOnInit() {
    }

    searchYouTube() {
        this.youtubeService.search(this.searchValue).subscribe(
            (response: YoutubeSearchResult) => {
                this.searchResults = response.items.map((responseVideo: YoutubeSearchVideos) => {
                    return new Video({
                        _id: null,
                        name: responseVideo.snippet.title,
                        link: responseVideo.id.videoId
                    })
                })
            }
        )
    }

    resetSearch() {
        this.searchValue = ''
    }

    /**
     * Relays the output event from the video-entry component and submits the video
     * to the box, via the jukebox service method "submitVideo"
     *
     * @param {Video} video The video to submit
     * @memberof FavoritelistComponent
     */
    submitVideo(video: Video) {
        const submissionPayload: SubmissionPayload = {
            link: video.link,
            userToken: this.user._id,
            boxToken: this.boxToken
        };
        this.jukeboxService.submitVideo(submissionPayload);
    }

}
