import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-youtube-video',
  templateUrl: './youtube-video.component.html',
  styleUrls: ['./youtube-video.component.scss']
})
export class YoutubeVideoComponent implements OnInit {
  readonly form: FormGroup;

  private readonly id: AbstractControl;

  videoId$ = new BehaviorSubject<string>('oHg5SJYRHA0');

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      id: ''
    });

    this.id = this.form.get('id');
  }

  ngOnInit(): void {
    const tag = document.createElement('script');
    tag.src = 'http://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  onSubmit(): void {
    const value = this.id.value as string;
    const values = value.split('=');

    this.videoId$.next(values[values.length - 1]);
  }
}
