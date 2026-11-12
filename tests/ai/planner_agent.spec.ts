
import { test, expect } from '@playwright/test';
import { InputProcessor } from '../../src/input/inputprocessor';
import { PlannerAgent } from '../../src/agents/plannerAgent';
import path from 'path/win32';
import fs from 'fs';

test('Planner Agent should analyse login requirements', async () => {

    test.setTimeout(120000);

    //  Create Planner Agent

    const planner = new PlannerAgent();

    // Give requirement
    //locate file
    // const filepath = path.resolve(process.cwd(), 'input/login_req.txt');

    // const requirement = fs.readFileSync(filepath, 'utf-8');
    const input = await InputProcessor.readRequirementFile(
        'input/login_req.txt');

    // Execute Planner Agent

    const result = await planner.execute(input.content);

    // Step 4: Display AI output

    console.log('===== PLANNER AGENT OUTPUT =====');
    console.log(JSON.stringify(result, null, 2));

    // Step 5: Validate result

    expect(result.feature).toBeTruthy();

    expect(result.requirements.length).toBeGreaterThan(0);

    expect(result.status).toMatch(
        /^(draft|review|approved)$/
    );

});
