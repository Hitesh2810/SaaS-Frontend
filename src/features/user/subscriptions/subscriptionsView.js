"use client";

import { useState } from "react";
import UserPortalShell from "@/features/user/dashboard/UserPortalShell";
import { getActiveSubscription, useUserSubscriptions } from "@/features/user/dashboard/dashboard";
import { useUserAuth } from "@/contexts/UserAuthContext";
import DummyPaymentModal from "./DummyPaymentModal";
import PlanCards from "./PlanCards";
import SubscriptionTable from "./SubscriptionTable";
import { USER_PLANS, useSubscribeMutation } from "./subscriptions";

export default function UserSubscriptionsView() {
  const { user } = useUserAuth();
  const { data = [] } = useUserSubscriptions();
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const subscribe = useSubscribeMutation(user);
  const active = getActiveSubscription(data);

  async function pay(card) {
    const response = await subscribe.mutateAsync({ plan: selected, card });
    setResult(response);
  }

  function close() {
    setSelected(null);
    setResult(null);
  }

  return (
    <UserPortalShell>
      <div className="mb-5">
        <h1 className="text-3xl font-semibold">Subscription</h1>
        <p className="mt-2 text-sm text-muted-foreground">Choose, upgrade, or renew your plan with a simulated payment flow.</p>
      </div>
      <PlanCards plans={USER_PLANS} activePlan={active} onSelect={setSelected} />
      <SubscriptionTable subscriptions={data} />
      <DummyPaymentModal plan={selected} open={Boolean(selected)} onClose={close} onPay={pay} loading={subscribe.isPending} result={result} />
    </UserPortalShell>
  );
}
