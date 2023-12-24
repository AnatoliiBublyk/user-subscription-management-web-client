import { Component, OnInit, ViewChild } from '@angular/core';
import { SubscriptionService } from '../../services/subscription/subscription.service';
import { Subscription } from '../../services/models/subscription';
import { NgForm } from '@angular/forms';
import { Observable, forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.css']
})
export class AddSubscriptionComponent implements OnInit {
  subscriptions: Subscription[] = [];
  userSubscriptions: Subscription[] = [];

  @ViewChild('myForm') myForm!: NgForm;

  constructor(private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.loadUserSubscriptions();
    this.loadAllSubscriptions();
  }

  loadUserSubscriptions(): void {
    this.subscriptionService.getUserSubscriptions().subscribe(
      (data) => {
        this.userSubscriptions = data?.subscriptions ?? [];
      },
      (error) => {
        console.error('Error loading user subscriptions:', error);
      }
    );
  }

  loadAllSubscriptions(): void {
    this.subscriptionService.getSubscriptions().subscribe(
      (data) => {
        this.subscriptions = data;
      },
      (error) => {
        console.error('Error loading all subscriptions:', error);
      }
    );
  }

  isSubscriptionCheckedAndDisabled(subscription: Subscription): boolean {
    return this.userSubscriptions.some(userSub => userSub.key === subscription.key);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const checkedSubscriptions = this.subscriptions.filter(sub => sub.isChecked)
    const observables = checkedSubscriptions.map(sub =>
      this.subscriptionService.addUserSubscription(sub.key ?? "")
    );

    forkJoin(observables).subscribe(() => {
      this.ngOnInit();
      this.myForm.reset();
    });
  }


  onCheckBoxChange(subscription: Subscription): void {
    subscription.isChecked = !subscription.isChecked
  }

}
