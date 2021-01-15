import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, interval, Observable, Subject, timer} from 'rxjs';
import {delay, map, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-crossfade-buttons',
  templateUrl: './crossfade-buttons.component.html',
  styleUrls: ['./crossfade-buttons.component.scss']
})
export class CrossfadeButtonsComponent implements OnInit {

  @Input()
  readonly crossfade: (over: number) => void;

  @Input()
  readonly durations = [5, 10, 30, 60];

  durationSubject = new BehaviorSubject<number>(this.durations[0]);

  get duration$(): Observable<number> {
    return this.durationSubject.asObservable();
  }

  directionSubject = new BehaviorSubject<'left' | 'right'>('left');

  get direction$(): Observable<'left' | 'right'> {
    return this.directionSubject.asObservable();
  }

  fading$: Observable<boolean>;

  constructor() {
    this.directionSubject.next('left');
  }

  ngOnInit(): void {
  }

  // TODO: Some kind of protection to let the animation play out when the duration is changed
  click(duration: number): void {
    this.durationSubject.next(duration);
  }

  fade(): void {
    const duration = this.durationSubject.value; // The only time you should do this is in an instant function like this
    this.crossfade(duration);

    const timer$ = timer(duration * 1000);
    this.fading$ = interval(10).pipe(
      map(t => t < duration * 100),
      takeUntil(timer$.pipe(
        delay(1000) // Delay to allow t to become greater than the limit for a second
      ))
    );

    timer$.subscribe(() => this.changeDirection());
  }

  private changeDirection(): void {
    this.directionSubject.next(this.directionSubject.value === 'left' ? 'right' : 'left');
  }
}
