import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simplifier-reply',
  imports: [CommonModule],
  templateUrl: './simplifier-reply.component.html',
  styleUrl: './simplifier-reply.component.css'
})
export class SimplifierReplyComponent {
   @Input() outputText: string = ''; // Receive processed text from AppComponent
}
