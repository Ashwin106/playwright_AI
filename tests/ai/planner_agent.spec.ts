
import { test, expect } from '@playwright/test';

import { PlannerAgent } from '../../src/agents/plannerAgent';

test('Planner Agent should analyse login requirements', async () => {

    test.setTimeout(120000);

    // Step 1: Create Planner Agent

    const planner = new PlannerAgent();

    // Step 2: Give requirement

    const requirement = `
    Create login functionality.

    Username and password are mandatory.

    Invalid credentials should display an error message.

    Valid credentials should navigate to dashboard.
    `;

    // Step 3: Execute Planner Agent

    const result = await planner.execute(requirement);

    // Step 4: Display AI output

    console.log('\n===== PLANNER AGENT OUTPUT =====');

    console.log(JSON.stringify(result, null, 2));

    // Step 5: Validate result

    expect(result.feature).toBeTruthy();

    expect(result.requirements.length).toBeGreaterThan(0);

    expect(result.status).toMatch(
        /^(draft|review|approved)$/
    );

});
