import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'YouTube Mixer';

  private readonly form: FormGroup;

  private readonly id: AbstractControl;

  videoId$ = new BehaviorSubject<string>('oHg5SJYRHA0');

  constructor(formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      id: ''
    });

    this.id = this.form.get('id');
  }

  onSubmit(): void {
    this.videoId$.next(this.id.value);
  }
}
