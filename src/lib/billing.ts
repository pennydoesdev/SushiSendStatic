/**
 * Pricing model — inlined from @sushisend/billing in the main monorepo.
 * Keep in sync with packages/billing/src/index.ts there.
 */

export const DEDICATED_IP_ADDON_USD_MONTHLY = 39.99;

export interface Plan {
  id: string;
  name: string;
  monthlyUsd: number;
  includedContacts: number;
  includedSends: number;
  overageContactsPer1kUsd: number;
  overageSendsPer1kUsd: number;
  description: string;
}

export const PLANS: ReadonlyArray<Plan> = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyUsd: 0,
    includedContacts: 1_000,
    includedSends: 3_000,
    overageContactsPer1kUsd: 0,
    overageSendsPer1kUsd: 0,
    description: 'Free tier for development and small projects.',
  },
  {
    id: 'growth',
    name: 'Growth',
    monthlyUsd: 19,
    includedContacts: 10_000,
    includedSends: 50_000,
    overageContactsPer1kUsd: 1.5,
    overageSendsPer1kUsd: 0.4,
    description: 'For small teams and SaaS founders.',
  },
  {
    id: 'business',
    name: 'Business',
    monthlyUsd: 79,
    includedContacts: 50_000,
    includedSends: 250_000,
    overageContactsPer1kUsd: 1.0,
    overageSendsPer1kUsd: 0.3,
    description: 'For growing companies that need higher throughput.',
  },
];

export interface CalculatorInput {
  contacts: number;
  monthlySends: number;
  dedicatedIp: boolean;
}

export interface CalculatorResult {
  recommendedPlanId: Plan['id'];
  baseMonthlyUsd: number;
  overageUsd: number;
  dedicatedIpUsd: number;
  totalMonthlyUsd: number;
}

export function quote(input: CalculatorInput): CalculatorResult {
  const plan =
    PLANS.find(
      (p) => input.contacts <= p.includedContacts && input.monthlySends <= p.includedSends,
    ) ?? PLANS[PLANS.length - 1]!;

  const overageContacts = Math.max(0, input.contacts - plan.includedContacts);
  const overageSends = Math.max(0, input.monthlySends - plan.includedSends);
  const overageUsd =
    (overageContacts / 1000) * plan.overageContactsPer1kUsd +
    (overageSends / 1000) * plan.overageSendsPer1kUsd;

  const dedicatedIpUsd = input.dedicatedIp ? DEDICATED_IP_ADDON_USD_MONTHLY : 0;

  return {
    recommendedPlanId: plan.id,
    baseMonthlyUsd: plan.monthlyUsd,
    overageUsd: Math.round(overageUsd * 100) / 100,
    dedicatedIpUsd,
    totalMonthlyUsd:
      Math.round((plan.monthlyUsd + overageUsd + dedicatedIpUsd) * 100) / 100,
  };
}
