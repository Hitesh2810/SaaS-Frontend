"use client";

import { Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";

export default function PlanCards({ plans, activePlan, onSelect }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {plans.map((plan, index) => {
        const active = activePlan?.plan_name === plan.name;
        return (
          <motion.div key={plan.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}>
            <Card interactive className={active ? "border-accent p-6" : "p-6"}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">{plan.name}</h2>
                {active ? <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">Active</span> : <Sparkles className="h-5 w-5 text-accent" />}
              </div>
              <p className="mt-5 text-4xl font-semibold">{formatCurrency(plan.price)}<span className="text-sm text-muted-foreground"> / month</span></p>
              <ul className="mt-6 grid gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground"><Check className="h-4 w-4 text-accent" /> {feature}</li>
                ))}
              </ul>
              <Button className="mt-7 w-full" onClick={() => onSelect(plan)}>{active ? "Renew" : activePlan ? "Upgrade" : "Subscribe"}</Button>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
