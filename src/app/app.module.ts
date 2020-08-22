import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './component/app/app.component';
import {YoutubeVideoComponent} from './component/youtube-video/youtube-video.component';
import {YouTubePlayerModule} from '@angular/youtube-player';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CrossfadeButtonsComponent } from './component/crossfade-buttons/crossfade-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    CrossfadeButtonsComponent,
    YoutubeVideoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    YouTubePlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
