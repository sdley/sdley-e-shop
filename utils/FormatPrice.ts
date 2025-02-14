export const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0, // XOF usually doesn't use decimals
      maximumFractionDigits: 3,
    }).format(amount);
  };
  