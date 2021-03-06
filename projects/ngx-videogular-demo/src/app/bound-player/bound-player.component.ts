import { Component, OnInit } from '@angular/core';
import { VgAPI, VgFullscreenAPI } from 'ngx-videogular';

// tslint:disable:ban-types
@Component({
    selector: 'app-bound-player',
    templateUrl: './bound-player.component.html',
    styleUrls: [ './bound-player.component.scss' ]
})
export class BoundPlayerComponent implements OnInit {
    sources: Array<Object>;
    controls = false;
    autoplay = false;
    loop = false;
    preload = 'auto';
    api: VgAPI;
    fsAPI: VgFullscreenAPI;
    nativeFs = true;

    constructor() {
        this.sources = [
            {
                src: 'http://static.videogular.com/assets/videos/videogular.mp4',
                type: 'video/mp4'
            },
            {
                src: 'http://static.videogular.com/assets/videos/videogular.ogg',
                type: 'video/ogg'
            },
            {
                src: 'http://static.videogular.com/assets/videos/videogular.webm',
                type: 'video/webm'
            }
        ];
    }

    onPlayerReady(api: VgAPI) {
        this.api = api;
        this.fsAPI = this.api.fsAPI;
        this.nativeFs = this.fsAPI.nativeFullscreen;

        this.api.getDefaultMedia().subscriptions.ended.subscribe(
            () => {
                // Set the video to the beginning
                this.api.getDefaultMedia().currentTime = 0;
            }
        );     
    }

    onChangeNativeFs($event) {
        this.fsAPI.nativeFullscreen = this.nativeFs;
        console.log('onChangeNativeFs', this.fsAPI.nativeFullscreen, this.nativeFs);
    }

    onClickUpdateSource() {
        this.sources = [
            {
                src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
                type: 'video/mp4'
            },
            {
                src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_stereo.ogg',
                type: 'video/ogg'
            }
        ];
    }

    ngOnInit() {

    }
}
