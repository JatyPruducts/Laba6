import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourService } from '../../services/tour.service';
import { ITour } from '../../models/tour.model'; // Ваш интерфейс/модель
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  imports: [CommonModule, RouterLink]
})
export class MainPageComponent implements OnInit {
  tours: ITour[] = [];
  data = {
    title: 'Stepik Travel',
    subtitle: 'Лучшие туры!',
    description: 'Описание главной страницы...'
  };

  constructor(private tourService: TourService) {}

  ngOnInit() {
    // При загрузке компонента - получаем туры
    this.tourService.getAllTours().subscribe({
      next: (res) => {
        // Допустим, хотим взять случайные 6
        this.tours = this.getRandomSix(res);
      },
      error: (err) => {
        console.error('Ошибка при загрузке туров', err);
      }
    });
  }

  getRandomSix(tours: ITour[]): ITour[] {
    if (tours.length <= 6) return tours;
    const shuffled = [...tours].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }
}