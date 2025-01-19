import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TourService } from '../services/tour.service';
import { ITour } from '../models/tour.model';

@Component({
  standalone: true,
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss'],
  imports: [CommonModule]
})
export class TourDetailComponent implements OnInit {
  tourId!: number;
  tour: ITour | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) {
      this.errorMessage = 'No Tour ID!';
      this.isLoading = false;
      return;
    }
    this.tourId = +idParam;

    this.tourService.getTourById(this.tourId).subscribe({
      next: (res) => {
        this.tour = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Ошибка при загрузке тура';
        this.isLoading = false;
      }
    });
  }
}