import type { ComboOffer, SpecialDeal } from './entity'
import { MOCK_PASTRIES } from '@/services/mockData'

export const DealsRepository = {
    async getCombos(): Promise<ComboOffer[]> {
        return [
            {
                id: 'c1',
                title: 'Süýji Ertir (Sweet Morning)',
                description: 'Start your day with a fresh croissant and our signature house-blend coffee.',
                items: [MOCK_PASTRIES[2]!], // Croissant
                originalPrice: 8.50,
                dealPrice: 6.00,
                image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=500',
                tag: 'Breakfast Special',
            },
            {
                id: 'c2',
                title: 'Family Pastry Box',
                description: 'A curated selection of our top 6 pastries. Perfect for sharing.',
                items: MOCK_PASTRIES.slice(2, 8).map(p => p!),
                originalPrice: 45.00,
                dealPrice: 35.00,
                image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=500',
                tag: 'Best Value',
            },
            {
                id: 'c3',
                title: 'Tea Time Duo',
                description: 'Two slices of our Signature Velvet Cake and a pot of artisan tea.',
                items: [MOCK_PASTRIES[0]!, MOCK_PASTRIES[1]!],
                originalPrice: 28.00,
                dealPrice: 22.00,
                image: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=80&w=500',
                tag: 'Perfect for Two',
            }
        ]
    },

    async getSpecials(): Promise<SpecialDeal[]> {
        return [
            {
                id: 's1',
                title: 'Happy Hour Delight',
                subtitle: 'All pastries are half price every day after 8 PM.',
                discountText: '50% OFF',
                category: 'Daily',
                image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=500',
                gradient: 'linear-gradient(135deg, #431407 0%, #713f12 100%)',
            },
            {
                id: 's2',
                title: 'Bahar Täzeligi (Spring Bloom)',
                subtitle: 'Seasonal strawberry treats at special prices.',
                discountText: '25% OFF',
                category: 'Seasonal',
                image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=500',
                gradient: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
            }
        ]
    }
}
