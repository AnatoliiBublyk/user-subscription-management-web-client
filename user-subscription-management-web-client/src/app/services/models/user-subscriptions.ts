import { Subscription } from "./subscription";

export interface UserSubscriptionsResponse {
    username: string | null;
    subscriptions: Subscription[] | null;
  }