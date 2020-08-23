import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {YoutubeApiService} from '../../service/youtube.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {VolumeService} from '../../service/volume.service';
import {YouTubePlayer} from '@angular/youtube-player';
import {isDefined} from '../../util/util';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-youtube-video',
  templateUrl: './youtube-video.component.html',
  styleUrls: ['./youtube-video.component.scss']
})
export class YoutubeVideoComponent implements OnInit, OnDestroy {

  @Input()
  private readonly playerId: string;

  @Input()
  private readonly initialVolume: number;

  @Input()
  private readonly startSilent = false;

  @ViewChild('player')
  set player(player: YouTubePlayer) {
    if (isDefined(player)) {
      this._player = player;
      this.initialisedSubject.next();
    }
  }

  private _player: YouTubePlayer;

  private readonly initialisedSubject = new Subject();
  private readonly destroyed = new Subject();

  readonly form: FormGroup;
  private readonly id: AbstractControl;

  videoId$ = new BehaviorSubject<string>('oHg5SJYRHA0');
  videoTitle$ = new BehaviorSubject<string>(`RickRoll'D`);

  constructor(private readonly volumeService: VolumeService,
              private readonly youtubeService: YoutubeApiService,
              formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      id: ''
    });
    this.id = this.form.get('id');

    this.initialisedSubject.subscribe(() => {
      const initVolume = new Subject();
      this._player.stateChange.pipe(
        takeUntil(initVolume)
      ).subscribe(state => {
        if (state.data === YT.PlayerState.PLAYING) {
          this._player.setVolume(this.initialVolume);
          initVolume.next();
        }
      });

      this.volumeService.register(this._player, this.playerId);

      volumeService.getVolume(this.playerId).pipe(
        takeUntil(this.destroyed)
      ).subscribe(v => {
        if (this._player.isMuted()) {
          this._player.unMute();
        }
        this._player.setVolume(v);
      });
    });
  }

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
  }

  onSubmit(): void {
    const value = this.id.value as string;
    const values = value.split('=');

    this.videoId$.next(values[values.length - 1]);

    this.youtubeService.getDataForVideo(values[values.length - 1]).subscribe(data =>
      this.videoTitle$.next(data.items[0].snippet.title)
    );
  }
}
