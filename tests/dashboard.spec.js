import { test, expect } from '@playwright/test';

import LoginPage from "../pages/loginPage/loginPage";
import DashboardPage from "../pages/dashboardPage/dashboardPage";
import CartPage from "../pages/cartPage/cartPage";
import CheckoutPage from "../pages/checkoutPage/checkoutPage";

test.describe('Dashboard', () => {
    let loginPage;
    let dashboardPage;
    let cartPage;
    let checkoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        await page.goto('/');
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('Adicionar itens ao carrinho de compras e exclui-los', async () => {
        await dashboardPage.addAllItemsToCart();
        await expect(dashboardPage.cartBadge).toHaveText('6');

        await dashboardPage.removeAllItemsFromCart();
        await expect(dashboardPage.cartBadge).toBeHidden();
    });

    test('Adicionar itens ao carrinho de compras e finalizar a compra com sucesso', async () => {
        await dashboardPage.addAllItemsToCart();
        await expect(dashboardPage.cartBadge).toHaveText('6');

        await dashboardPage.openCart();
        await expect(cartPage.cartItems).toHaveCount(6);

        await cartPage.goToCheckout();
        await expect(checkoutPage.firstNameInput).toBeVisible();
        await expect(checkoutPage.checkoutTitle).toHaveText('Checkout: Your Information');

        await checkoutPage.completeCustomerInformation('Narbo', 'Tester', '12345');
        await expect(checkoutPage.checkoutTitle).toHaveText('Checkout: Overview');
        await expect(checkoutPage.checkoutItems).toHaveCount(6);
        await expect(checkoutPage.paymentInformation).toBeVisible();
        await expect(checkoutPage.shippingInformation).toBeVisible();
        await expect(checkoutPage.subtotalLabel).toContainText('Item total: $');
        await expect(checkoutPage.taxLabel).toContainText('Tax: $');
        await expect(checkoutPage.totalLabel).toContainText('Total: $');

        await checkoutPage.finishCheckout();
        await expect(checkoutPage.checkoutTitle).toHaveText('Checkout: Complete!');
        await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
        await expect(checkoutPage.completeText).toBeVisible();
        await expect(checkoutPage.backHomeButton).toBeVisible();
    });
});
