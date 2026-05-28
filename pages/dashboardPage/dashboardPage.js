export default class DashboardPage {
    constructor(page) {
        this.page = page;
        this.addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
        this.removeButtons = page.getByRole('button', { name: 'Remove' });
        this.cartLink = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async addAllItemsToCart() {
        const totalItems = await this.addToCartButtons.count();

        for (let i = 0; i < totalItems; i++) {
            await this.addToCartButtons.first().click();
        }
    }

    async removeAllItemsFromCart() {
        const totalItems = await this.removeButtons.count();

        for (let i = 0; i < totalItems; i++) {
            await this.removeButtons.first().click();
        }
    }

    async openCart() {
        await this.cartLink.click();
    }
}
