import { Component, OnDestroy, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { MultiplesNumberService } from '@core/multiples-number.service';
import { CredentialsService } from '@app/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, OnDestroy {
  version: string | null = environment.version;
  mnSubscription: Subscription;
  mnRecords: any[] = [];

  constructor(
    public afs: AngularFirestore,
    public mnService: MultiplesNumberService,
    private credentialsService: CredentialsService
  ) {
    this.mnSubscription = this.mnService.getMNRecords(this.credentialsService.credentials.token).subscribe((data) => {
      this.mnRecords = data;
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.mnSubscription.unsubscribe();
  }

  setItemClass(item: any, value: any) {
    return {
      'bg-green': item.multiples_3.includes(value),
      'bg-red': item.multiples_5.includes(value),
      'bg-blue': item.multiples_7.includes(value),
    };
  }
}
