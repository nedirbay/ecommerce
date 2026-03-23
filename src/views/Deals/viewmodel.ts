import { ref, onMounted } from 'vue'
import { DealsService } from './service'
import type { DealsState } from './entity'

export function useDealsViewModel() {
    const state = ref<DealsState>({
        combos: [],
        specials: [],
        loading: true,
        error: null
    })

    async function loadDeals() {
        state.value.loading = true
        state.value.error = null
        try {
            const [combos, specials] = await Promise.all([
                DealsService.getCombos(),
                DealsService.getSpecials()
            ])
            state.value.combos = combos
            state.value.specials = specials
        } catch (e) {
            state.value.error = 'Failed to load the latest deals. Please try again later.'
        } finally {
            state.value.loading = false
        }
    }

    onMounted(loadDeals)

    return {
        state,
        calculateSavings: DealsService.calculateSavings,
        getSavingsPercentage: DealsService.getSavingsPercentage
    }
}
