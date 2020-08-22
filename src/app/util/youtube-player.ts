import {Subject, timer} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

function duration(seconds: number): number {
  return (seconds * 1000) / 100;
}

/**
 * Lower the volume from max to min of a video over the period of time
 * @param over: the period of time
 * @param lower: the function to supply the falling number to
 */
export function lowerVolume(over: number, lower: (t: number) => void): void {
  const stop = new Subject();

  timer(0, duration(over)).pipe(
    takeUntil(stop)
  ).subscribe(t => {
    if (t >= 100) {
      stop.next();
    }
    lower(100 - t);
  });
}

/**
 * Raise the volume from min to max of a video over the period of time
 * @param over: the period of time
 * @param raise: the function to supply the rising number to
 */
export function raiseVolume(over: number, raise: (t: number) => void): void {
  const stop = new Subject();

  timer(0, duration(over)).pipe(
    takeUntil(stop)
  ).subscribe(t => {
    if (t >= 100) {
      stop.next();
    }
    raise(t);
  });
}
