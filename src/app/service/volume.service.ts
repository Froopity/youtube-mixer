import {Injectable} from '@angular/core';
import {YouTubePlayer} from '@angular/youtube-player';
import {lowerVolume, raiseVolume} from '../util/youtube-player';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VolumeService {

  private readonly volumes: Map<string, Subject<number>> = new Map();

  public register(player: YouTubePlayer, id: string): void {
    this.volumes.set(id, new BehaviorSubject<number>(player.getVolume()));
  }

  public deregister(id: string): void {
    this.volumes.delete(id);
  }

  public getVolume(id: string): Observable<number> {
    return this.volumes.get(id).asObservable();
  }

  public crossfade(over: number, from: string, to: string): void {
    lowerVolume(over, t => {
      this.volumes.get(from).next(t);
    });

    raiseVolume(over, t => {
      this.volumes.get(to).next(t);
    });
  }
}
