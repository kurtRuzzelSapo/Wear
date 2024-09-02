import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-landing-topnav',
  standalone: true,
  imports:[RouterLink, RouterLinkActive],
  templateUrl: './landing-topnav.component.html',
  styleUrls: ['./landing-topnav.component.css']
})
export class LandingTopnavComponent {

  @Output() searchQuery = new EventEmitter<string>();

  onSearch(event:Event, query: string): void {
    event.preventDefault();
    this.searchQuery.emit(query);
  }
}
