import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Keys} from '../../environments/keys';

@Injectable({
  providedIn: 'root'
})
export class YoutubeApiService {

  private readonly apiKey = Keys.YOUTUBE_API_KEY;

  constructor(public http: HttpClient) { }

  getDataForVideo(video: string): Observable<any> {
    const url = 'https://www.googleapis.com/youtube/v3/videos?id=' + video + '&key=' + this.apiKey + '&part=snippet,statistics';
    return this.http.get(url);
  }
}
