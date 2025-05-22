declare module 'xirr' {
    export function xirr(cashflows: { amount: number; when: Date }[], options?: { guess?: number }): number;
} 