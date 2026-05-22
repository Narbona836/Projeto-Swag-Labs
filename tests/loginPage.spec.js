// @ts-check
import { test, expect } from '@playwright/test';

import LoginPage from '../pages/loginPages';

test('Padrao', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/');
  await loginPage.login('standard_user', 'secret_sauce');
});

test('Login com falha', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/');
  await loginPage.login('standard_user', 'secret_sauce1');
  await expect(page.locator('#login_button_container > div > form > div.error-message-container.error > h3')).toHaveText('Epic sadface: Username and password do not match any user in this service');
});

;

test('Usuário bloqueado', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/');
  await loginPage.login('locked_out_user', 'secret_sauce');
  await expect(page.locator('#login_button_container > div > form > div.error-message-container.error > h3')).toHaveText('Epic sadface: Sorry, this user has been locked out.'); 
});

test('Login com usuário problemático', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/');
  await loginPage.login('problem_user', 'secret_sauce');
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('Login com usuário performance', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/');
  await loginPage.login('performance_glitch_user', 'secret_sauce');
  await expect(page).toHaveTitle(/Swag Labs/);
});


test('Login com usuário vazio', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/');
  await loginPage.login('', '');
  await expect(page.locator('#login_button_container > div > form > div.error-message-container.error > h3')).toHaveText('Epic sadface: Username is required');
});
