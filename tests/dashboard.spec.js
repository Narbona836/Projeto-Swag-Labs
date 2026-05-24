import { test, expect } from '@playwright/test';

import LoginPage from "../pages/loginPages";

test.describe('Dashboard', () => { 
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto('/');
        await loginPage.login('standard_user', 'secret_sauce');
    })

    test('Adicionar itens ao carrinho de compras e exclui-los', async ({ page }) => {
        const buttonsAdd = page.getByRole('button', { name: 'Add to cart' });

        const countAdd = await buttonsAdd.count();

        for (let i = 0; i < countAdd; i++) {
        await buttonsAdd.first().click();
}
        await expect(page.locator('.shopping_cart_badge')).toHaveText('6');

        const buttonsRemove = page.getByRole('button', { name: 'Remove' });

            const countRemove = await buttonsRemove.count();

            for (let i = 0; i < countRemove; i++) {
            await buttonsRemove.first().click();
        }
        
    });

    test('Ordenar itens por preço', async ({ page }) => {
        await page.getByRole('combobox').selectOption('lohi');
        const firstItemPrice = await page.locator('.inventory_item_price').first().textContent();
        const lastItemPrice = await page.locator('.inventory_item_price').nth(5).textContent();
        expect(parseFloat(firstItemPrice.replace('$', ''))).toBeLessThanOrEqual(parseFloat(lastItemPrice.replace('$', '')));
    }); 
});