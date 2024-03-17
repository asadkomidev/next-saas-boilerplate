export type pricingPlansType = {
  plan: string;
  tagline: string;
  popular: boolean;
  features: [
    {
      text: string;
      footnote: string;
      negative: boolean;
    }
  ];
};
