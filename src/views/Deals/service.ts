import { DealsRepository } from './repository'
import type { ComboOffer, SpecialDeal } from './entity'

export const DealsService = {
    async getCombos(): Promise<ComboOffer[]> {
        return DealsRepository.getCombos()
    },

    async getSpecials(): Promise<SpecialDeal[]> {
        return DealsRepository.getSpecials()
    },

    calculateSavings(original: number, deal: number): number {
        return original - deal
    },

    getSavingsPercentage(original: number, deal: number): number {
        return Math.round(((original - deal) / original) * 100)
    }
}
