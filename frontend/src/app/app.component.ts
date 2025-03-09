// App Component (app.component.ts)
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileFormComponent } from './MyComponents/file-form/file-form.component';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SummarizerComponent } from './MyComponents/summarizer/summarizer.component';
import { SimplifierComponent } from './MyComponents/simplifier/simplifier.component';
import { NavbarComponent } from './MyComponents/navbar/navbar.component';
import { SimplifierReplyComponent } from './MyComponents/simplifier-reply/simplifier-reply.component';
import * as pdfjsLib from 'pdfjs-dist';
import { SummarizerService } from './services/summarizer.service';
import { HttpClient } from '@angular/common/http';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FileFormComponent, CommonModule, SummarizerComponent, SimplifierComponent, NavbarComponent, SimplifierReplyComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pdfURL: SafeResourceUrl | null = null;
  extractedText: string = ''; // Holds extracted text
  replyText: string = ''; // Holds processed text

  constructor(private sanitizer: DomSanitizer, private summarizerService: SummarizerService) {}

  async onFileSelected(file: File) {
    console.log('Received file in AppComponent:', file.name);

    this.summarizerService.summarizeFile(file).subscribe(
      (response) => {
        this.extractedText = response.summary; // Set the extracted summary text
        console.log('Summary received:', response.summary);
      },
      (error) => {
        console.error('Error sending file:', error);
      }
    );

    // Load the PDF into the UI
    const unsafeURL = URL.createObjectURL(file);
    this.pdfURL = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeURL);
  }

  handleInput(input: string) {
    this.replyText = input; // Update text for ReplyBoxComponent
  }
}
