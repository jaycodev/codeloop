export interface PaymentStatsResponse {
  monthlyPayments: MonthlyPayment[];
  totalRevenue: number;
}

export interface MonthlyPayment {
  month: string;       // ejemplo: "2025-03"
  totalAmount: number; // monto en ese mes
}
