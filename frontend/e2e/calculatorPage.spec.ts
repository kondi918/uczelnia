import { test, expect} from '@playwright/test'; 
import { Components } from './components';

test.describe('E2E Calculator Component Tests', () => {
    const BASE_URL = 'https://kalkulatorfront.bravesea-6884d3a9.westus2.azurecontainerapps.io';
    let components : Components

    test.beforeEach(async ({ page }) => {
        components = new Components(page);
        await page.goto(BASE_URL);
    });

    test('Should display 0 initially', async () => {
        await expect(components.resultDisplay).toHaveText('0');
        await expect(components.expressionDisplay).toHaveText('');
    });

    test('Should perform basic addition (5 + 3 = 8)', async ({ page }) => {
        await components.mockSuccessApi(page, 8);

        await components.clickSequence(page, ['5', '+', '3']);
        
        await expect(components.expressionDisplay).toHaveText('5 + 3 3');

        await components.calculateButton.click();

        await expect(components.resultDisplay).toHaveText('8');
        await expect(components.expressionDisplay).not.toHaveText('5 + 3 3');
    });

    test('Should handle consecutive operations (10 * 2 / 4 = 5)', async ({ page }) => {
        await components.mockSuccessApi(page, 20);
        await components.clickSequence(page, ['1', '0', '*', '2']);
        await page.click('[data-testid="button-/"]');

        await expect(components.resultDisplay).toHaveText('20');
        
        await components.mockSuccessApi(page, 5);
        await components.clickSequence(page, ['4']);
        await components.calculateButton.click();

        await expect(components.resultDisplay).toHaveText('5');
    });

    test('Should handle decimal input and calculations (2.5 * 2 = 5)', async ({ page }) => {
        await components.mockSuccessApi(page, 5);

        await components.clickSequence(page, ['2', 'dot', '5', '*', '2']);
        await components.calculateButton.click();

        await expect(components.resultDisplay).toHaveText('5');
    });

    test('Should show error modal on API failure (DivideByZero)', async ({ page }) => {
        const errorMessage = "API Error! Cannot divide by zero.";
        
        await components.mockErrorApi(page, 400, "Cannot divide by zero.");

        await components.clickSequence(page, ['1', '/', '0']);
        await components.calculateButton.click();
        
        await expect(components.errorModal).toBeVisible();
        
        await expect(components.errorModal).toContainText(errorMessage);
        
        await components.errorModal.locator('button').click(); // Kliknięcie np. przycisku zamykającego w modalu
        await expect(components.errorModal).not.toBeVisible();
    });
    
    test('Should clear all state when C button is pressed', async ({ page }) => {
        await components.clickSequence(page, ['1', '2', '+', '3']);
        await expect(components.resultDisplay).toHaveText('3');
        
        await page.click('[data-testid="button-C"]');

        await expect(components.resultDisplay).toHaveText('0');
        await expect(components.expressionDisplay).toHaveText('');
    });
    
    test('Should delete last digit when DEL is pressed', async ({ page }) => {
        await components.clickSequence(page, ['1', '2', '3']);
        await expect(components.resultDisplay).toHaveText('123');
        
        await page.click('[data-testid="button-DEL"]');
        
        await expect(components.resultDisplay).toHaveText('12');
        
        await page.click('[data-testid="button-DEL"]');
        
        await expect(components.resultDisplay).toHaveText('1');
    });
});