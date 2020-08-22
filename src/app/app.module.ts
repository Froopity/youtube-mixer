import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './component/app/app.component';
import { YoutubeVideoComponent } from './component/youtube-video/youtube-video.component';

@NgModule({
  declarations: [
    AppComponent,
    YoutubeVideoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
