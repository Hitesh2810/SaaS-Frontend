import { CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function PricingCards() {
  const plans = [
    { name: "Starter", price: 29, features: ["5 seats", "Core analytics", "Email support"] },
    { name: "Pro", price: 99, features: ["Unlimited seats", "Revenue insights", "Automations"] },
    { name: "Enterprise", price: 299, features: ["SAML SSO", "Audit trails", "Priority support"] }
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {plans.map((plan) => (
        <Card key={plan.name} interactive>
          <h3 className="font-semibold">{plan.name}</h3>
          <p className="mt-3 text-3xl font-semibold">${plan.price}<span className="text-sm text-muted-foreground">/mo</span></p>
          <div className="mt-4 space-y-2">
            {plan.features.map((feature) => <p key={feature} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle className="h-4 w-4 text-accent" /> {feature}</p>)}
          </div>
          <Button className="mt-5 w-full">Create plan</Button>
        </Card>
      ))}
    </div>
  );
}
