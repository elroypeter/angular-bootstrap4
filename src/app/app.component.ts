import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularBootstrap';


  /**
   * testable
   * Testables app component
   * @param test []
   * @returns test
   */
  testable(test: string): string {
    return test;
  }

}
