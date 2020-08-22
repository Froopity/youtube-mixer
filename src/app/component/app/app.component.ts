import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'YouTube Mixer';

  readonly form: FormGroup;

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
