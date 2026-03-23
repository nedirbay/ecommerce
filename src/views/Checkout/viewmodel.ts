import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useCartStore } from '@/stores/useCartStore'
import { CheckoutService } from './service'
import type { OrderForm, PaymentMethod } from './entity'

export function useCheckoutViewModel() {
    const router = useRouter()
    const cartStore = useCartStore()

    const step = ref<1 | 2 | 3>(1)
    const loading = ref(false)

    const form = ref<OrderForm>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        paymentMethod: 'card',
    })

    const orderSummary = computed(() =>
        CheckoutService.buildOrderSummary(
            cartStore.items,
            cartStore.totalPrice,
            cartStore.totalSavings,
        ),
    )

    async function placeOrder() {
        const error = CheckoutService.validateOrderForm(form.value as unknown as Record<string, string>)
        if (error) {
            ElMessage.error(error)
            return
        }
        loading.value = true
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        loading.value = false
        cartStore.clearCart()
        step.value = 3
    }

    return { step, form, orderSummary, loading, placeOrder }
}
