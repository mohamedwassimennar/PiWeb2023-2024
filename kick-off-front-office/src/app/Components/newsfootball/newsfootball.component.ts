import { Component, OnInit } from '@angular/core';
import { PlayerscoutedService } from '../../Services/playerscouted.service';


@Component({
  selector: 'app-newsfootball',
  templateUrl: './newsfootball.component.html',
  styleUrls: ['./newsfootball.component.css']
})
export class NewsfootballComponent implements OnInit {

  newsArticles: any[]=[];

  constructor(private footballNewsService: PlayerscoutedService) { }

  ngOnInit(): void {
    this.loadFootballNews();
  }

  loadFootballNews(): void {
    this.footballNewsService.getFootballNews().subscribe(
      data => {
        //this.newsArticles = data.slice(0, 6);
        const shuffledArticles = this.shuffleArray(data);
        // Select the first 6 articles
        this.newsArticles = shuffledArticles.slice(0, 6);
      },
      error => {
        console.error('Error fetching football news:', error);
      }
    );
  }
  // Function to shuffle the array
  shuffleArray(array: any[]): any[] {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle
    while (currentIndex !== 0) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap it with the current element
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

}
