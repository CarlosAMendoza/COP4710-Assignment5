import { SearchListComponent } from './search-list/search-list.component'
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searching = false
  searchQuery: string
  banner: string
  @ViewChild('search', {static: false}) searchingList: SearchListComponent

  onSearch() {
    if (this.searching) {
      this.searchingList.getSearch();
    }
    this.searching = true

    this.banner = this.searchQuery
  }

  onBack() {
    this.searching = false
    this.searchQuery = ''
  }
}
