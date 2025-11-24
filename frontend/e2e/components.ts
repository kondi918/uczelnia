import {Locator, Page, Route } from '@playwright/test';

export class Components
{
    private page: Page;
    resultDisplay: Locator;
    expressionDisplay: Locator;
    calculateButton: Locator;
    errorModal: Locator;


    constructor(page: Page) {
        this.page = page;
        this.resultDisplay = this.page.getByTestId('result-display');
        this.expressionDisplay = this.page.getByTestId('expression-display');
        this.calculateButton = this.page.getByTestId('button-calculate');
        this.errorModal = this.page.getByTestId('error-modal');
    }

    async clickSequence(page: Page, buttonTestIds: string[]) {
        for (const id of buttonTestIds) {
            await page.click(`[data-testid="button-${id}"]`);
        }
    }
    
    async mockSuccessApi(page: Page, result: number) {
        await page.route('**/api/calculator/calculate', async (route: Route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ result: result, equation: 'mocked equation' }), 
            });
        });
    }
    
    async mockErrorApi(page: Page, status: number, errorMessage: string) {
        await page.route('**/api/calculator/calculate', async (route: Route) => {
            await route.fulfill({
                status: status,
                contentType: 'application/json',
                // Oczekujemy, że komponent odczyta pole 'error' lub użyje całego message
                body: JSON.stringify({ error: errorMessage, message: errorMessage }),
            });
        });
    }
}