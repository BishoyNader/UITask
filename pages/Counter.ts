import { Page } from 'playwright';

export const clickButtonAndVerifyCounter = async (page: Page, buttonX: number, buttonY: number, counterX: number, counterY: number) => {
  // Click the "+" button at the specified coordinates
  await page.mouse.click(buttonX, buttonY);

  // Wait for a moment to allow counter to update
  await page.waitForTimeout(1000); // Adjust timeout as needed

  // Get the counter text content at the specified coordinates before and after click
  const getCounterValue = async (x: number, y: number) => {
    return page.evaluate(([x, y]) => {
      const element = document.elementFromPoint(x, y);
      return element ? element.textContent : null;
    }, [x, y]);
  };

  const counterValueBefore = await getCounterValue(counterX, counterY);
  console.log('Counter value before:', counterValueBefore);

  await page.mouse.click(buttonX, buttonY);

  const counterValueAfter = await getCounterValue(counterX, counterY);
  console.log('Counter value after:', counterValueAfter);

  if (counterValueBefore !== null && counterValueAfter !== null) {
    const before = parseInt(counterValueBefore);
    const after = parseInt(counterValueAfter);
    return after > before;
  } else {
    throw new Error('Unable to retrieve counter value');
  }
};