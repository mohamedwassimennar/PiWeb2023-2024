import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataServiceAiService } from 'src/app/Services/data-service-ai.service';


@Component({
  selector: 'app-file-upload-component',
  templateUrl: './file-upload-component.component.html',
  styleUrls: ['./file-upload-component.component.css']
})
export class FileUploadComponentComponent implements OnInit  {
  videoFile: File | null = null;
  videoPath: string | null = null;
  pdfPath: string | null = null;
  showDownloadButtons: boolean = false;
  loading: boolean = false; 
  videoUrl = 'http://localhost:5000/output_videos/output_video.avi';


  constructor(private flaskApiService: DataServiceAiService,private http: HttpClient) {}

  ngOnInit(): void {
   // this.fetchResults();
   this.fetchVideo();
  }
 /*
  fetchResults() {
    this.flaskApiService.fetchResults().subscribe(data => {
      // Utilisez le chemin d'accès direct à la vidéo AVI fourni par l'API Flask
      this.videoPath = `http://127.0.0.1:5000/${data.videoPath}`;
      this.pdfPath = `http://127.0.0.1:5000/${data.pdfPath}`;
    });
  }

*/
  
  onFileSelected(event: any) {
    this.videoFile = event.target.files[0];
  }

  uploadVideo() {
    if (this.videoFile) {
      this.loading = true;
      this.flaskApiService.processVideo(this.videoFile).subscribe(
        (response) => {
          this.videoPath = `http://localhost:5000/output_videos/output_video.avi`; // Mettre à jour avec le chemin correct
        this.pdfPath = `http://localhost:5000/output_videos/stats.pdf`; // Mettre à jour avec le chemin correct
          this.showDownloadButtons = true;
          console.log('200 ok:');
          this.loading = false;

        },
        (error) => {
          console.error('Error uploading video:', error);
        }
      );
    } else {
      console.error('No video file selected.');
    }
  }



  downloadVideo() {
    if (this.videoPath) {
      window.open(this.videoPath, '_blank');
    } else {
      console.error('Video path is null');
    }
  }
  

downloadPDF() {
  if (this.pdfPath) {
    window.open(this.pdfPath, '_blank');
  } else {
    console.error('PDF path is null');
  }
}
  /*
fetchVideo() {
  this.flaskApiService.getVideoPath().subscribe(
    (data) => {
      this.videoPath = data.videoPath;
    },
    (error) => {
      console.error('Error fetching video path:', error);
    }
  );
}
*/
fetchVideo() {
  const videoUrl = 'http://localhost:5000/get_video'; // L'URL de ton API Flask pour récupérer la vidéo
  this.http.get(videoUrl, { responseType: 'blob' }).subscribe((res: Blob) => {
    const videoBlob = new Blob([res], { type: 'video/mp4' });
    this.videoUrl = URL.createObjectURL(videoBlob);
  });
}
}