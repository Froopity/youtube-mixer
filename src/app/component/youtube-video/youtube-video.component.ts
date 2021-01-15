import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {YoutubeApiService} from '../../service/youtube.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {VolumeService} from '../../service/volume.service';
import {YouTubePlayer} from '@angular/youtube-player';
import {isDefined} from '../../util/util';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {parseURL} from '../../util/parse-url';

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

  private videoIdSubject = new Subject<string>();

  videoId$ = new Observable<string>();
  videoTitle$ = new Observable<string>();

  constructor(private readonly volumeService: VolumeService,
              private readonly youtubeService: YoutubeApiService,
              formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      id: ''
    });
    this.id = this.form.get('id');

    this.initialisedSubject.subscribe(() => this.init());

    this.videoId$ = this.videoIdSubject.asObservable().pipe(
      takeUntil(this.destroyed)
    );

    this.videoTitle$ = this.videoId$.pipe(
      switchMap(id => this.youtubeService.getDataForVideo(id)),
      map(data => data.items[0].snippet.title),
      takeUntil(this.destroyed)
    );

    this.videoId$.subscribe(console.log);
    this.videoTitle$.subscribe(console.log);

  }

  private init(): void {
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

    this.volumeService.getVolume(this.playerId).pipe(
      takeUntil(this.destroyed)
    ).subscribe(v => {
      if (this._player.isMuted()) {
        this._player.unMute();
      }
      this._player.setVolume(v);
    });

    this.videoIdSubject.next('oHg5SJYRHA0'); // Initialize to Rick Roll
  }

  ngOnInit(): void {
    // TODO: Can we move this out? Directly manipulating the DOM is yucky
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  ngOnDestroy(): void {
    this.destroyed.next();
  }

  onSubmit(): void {
    this.videoIdSubject.next(parseURL(this.id.value as string));
  }
}
