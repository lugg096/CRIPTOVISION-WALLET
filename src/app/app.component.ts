import { Component } from '@angular/core';
/* import { StatusBar } from '@ionic-native/status-bar/ngx'; */
import {
  Plugins,
  StatusBarBackgroundColorOptions,
  StatusBarStyle,
} from '@capacitor/core';

const { StatusBar } = Plugins;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isStatusBarLight = true

  constructor() {
    StatusBar.setStyle({
      style: this.isStatusBarLight ? StatusBarStyle.Dark : StatusBarStyle.Light
    });
    this.isStatusBarLight = !this.isStatusBarLight;

    StatusBar.setBackgroundColor({
      color: "#15966B"
    });

    StatusBar.setOverlaysWebView({
      overlay: false
    });
  }

}
