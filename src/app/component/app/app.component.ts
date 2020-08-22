import {Component} from '@angular/core';
import {VolumeService} from '../../service/volume.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'YouTube Mixer';

  readonly player1 = 'PLAYER_1';
  readonly player2 = 'PLAYER_2';

  private playing: 'PLAYER_1' | 'PLAYER_2' = 'PLAYER_1';

  constructor(private readonly volumeService: VolumeService) {
  }

  crossfade(over: number): void {
    if (this.playing === 'PLAYER_1') {
      this.volumeService.crossfade(over, this.player1, this.player2);
      this.playing = 'PLAYER_2';
    } else {
      this.volumeService.crossfade(over, this.player2, this.player1);
      this.playing = 'PLAYER_1';
    }
  }

  readonly fadeFunc = (over: number) => this.crossfade(over);
}
