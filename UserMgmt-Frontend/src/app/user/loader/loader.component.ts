import { Component, OnDestroy } from '@angular/core';
import {LoaderserviceService} from './loaderservice.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnDestroy {
  isLoading = false;
  subscription: Subscription = new Subscription;

  constructor(private loaderService: LoaderserviceService) { }

  ngOnInit(): void {
    this.subscription = this.loaderService.loaderState.subscribe((state) => {
      this.isLoading = state;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
