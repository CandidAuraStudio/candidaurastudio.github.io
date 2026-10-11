import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

function extractFunction(name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = html.match(new RegExp('function ' + escaped + '\\([^)]*\\)\\s*\\{[\\s\\S]*?\\n\\}'));
  assert.ok(match, name + ' must be defined');
  return match[0];
}

function appHarness() {
  const state = { screen: 'practices', selected: null };
  const context = {
    state,
    bookAudioEl: { paused: true, pause() {} },
    soundLabAudio: { paused: true, pause() {} },
    localStorage: { setItem() {} },
    renderStep() {},
    preparePlayer() {},
    show(id) { state.screen = id; },
    showSessionReady() { state.screen = 'sessionReady'; state.selected = [chosenKicker, chosenTitle, chosenSeconds]; },
    navigator: { userAgent: 'Test browser' },
    document: {
      getElementById(id) {
        if (id === 'readySessionText') return { set textContent(value) { state.readyText = value; } };
        if (id === 'readyDeviceHelp') return { set textContent(value) { state.deviceHelp = value; } };
        if (id === 'practiceCardMessage') return { set textContent(value) { state.message = value; } };
        return null;
      }
    },
    fmt(seconds) { return seconds === 600 ? '10:00' : seconds === 2400 ? '40:00' : '60:00'; }
  };
  vm.createContext(context);
  context.showSessionReady = vm.runInContext('(function(){ state.screen = \"sessionReady\"; state.selected = [chosenKicker, chosenTitle, chosenSeconds]; })', context);
  vm.runInContext('let chosenSeconds=0; let chosenUrl=""; let chosenIntroUrl=""; let chosenVisualUrl=""; let chosenKicker=""; let chosenTitle="";\n'+extractFunction('choosePractice'), context);
  return context;
}

test('practice id opens the matching readiness screen and preserves the current media mapping', () => {
  const harness = appHarness();
  const catalogMatch = html.match(/const PRACTICES\s*=\s*(\[[\s\S]*?\n\]);/);
  assert.ok(catalogMatch, 'PRACTICES catalog must be defined');
  vm.runInContext('const PRACTICES = '+catalogMatch[1]+';\n'+extractFunction('openPracticeById'), harness);
  const result = vm.runInContext('openPracticeById("deep-wake-up")', harness);
  assert.equal(result, true);
  assert.equal(harness.state.screen, 'sessionReady');
  assert.deepEqual(Array.from(harness.state.selected), ['Deep Wake Up', 'Morning · guided breath', 600]);
  assert.equal(vm.runInContext('chosenUrl', harness), 'https://d2ol7oe51mr4n9.cloudfront.net/user_3IG4Dqurc9uVifJQecwifzNzNg3/f4d262f6-56fe-40e3-84ea-930c11fe7c54.mp3');
});

test('unknown practice id leaves the current screen unchanged', () => {
  const harness = appHarness();
  const catalogMatch = html.match(/const PRACTICES\s*=\s*(\[[\s\S]*?\n\]);/);
  assert.ok(catalogMatch, 'PRACTICES catalog must be defined');
  vm.runInContext('const PRACTICES = '+catalogMatch[1]+';\n'+extractFunction('openPracticeById'), harness);
  assert.equal(vm.runInContext('openPracticeById("missing")', harness), false);
  assert.equal(harness.state.screen, 'practices');
});

test('tapping a library card opens its matching practice and reports unknown ids', () => {
  const harness = appHarness();
  const catalogMatch = html.match(/const PRACTICES\s*=\s*(\[[\s\S]*?\n\]);/);
  assert.ok(catalogMatch, 'PRACTICES catalog must be defined');
  const helperFunctions = ['openPracticeById','showPracticeCardMessage','handlePracticeLibraryClick']
    .map(extractFunction).join('\n');
  vm.runInContext('const PRACTICES = '+catalogMatch[1]+';\n'+helperFunctions, harness);

  const card = { dataset: { practiceId: 'noon-reset' } };
  harness.event = { target: { closest: () => card } };
  vm.runInContext('handlePracticeLibraryClick(event)', harness);
  assert.equal(harness.state.screen, 'sessionReady');
  assert.equal(harness.state.selected[0], 'Noon Reset');
  assert.equal(harness.state.selected[2], 2400);
  assert.equal(harness.state.message || '', '');

  harness.state.screen = 'practices';
  harness.event = { target: { closest: () => ({ dataset: { practiceId: 'missing' } }) } };
  vm.runInContext('handlePracticeLibraryClick(event)', harness);
  assert.equal(harness.state.screen, 'practices');
  assert.match(harness.state.message, /unavailable/i);
});

test('the special Human Practice card still opens its existing screen', () => {
  const harness = appHarness();
  const helperFunctions = ['openPracticeById','showPracticeCardMessage','handlePracticeLibraryClick']
    .map(extractFunction).join('\n');
  vm.runInContext(helperFunctions, harness);
  harness.event = { target: { closest: () => ({ dataset: { specialPractice: 'human' } }) } };
  vm.runInContext('handlePracticeLibraryClick(event)', harness);
  assert.equal(harness.state.screen, 'human');
});

test('all four existing practice ids keep their titles, durations, and audio URLs', () => {
  const expected = [
    ['deep-wake-up','Deep Wake Up','Morning · guided breath',600,'https://d2ol7oe51mr4n9.cloudfront.net/user_3IG4Dqurc9uVifJQecwifzNzNg3/f4d262f6-56fe-40e3-84ea-930c11fe7c54.mp3','https://d2ol7oe51mr4n9.cloudfront.net/user_3IG4Dqurc9uVifJQecwifzNzNg3/7fd8e8ee-cc5a-49c3-940b-6b4330a42c5e.mp4','https://d2ol7oe51mr4n9.cloudfront.net/user_3IG4Dqurc9uVifJQecwifzNzNg3/d10879c1-d600-400c-999e-3237ec672b86.mp4'],
    ['noon-reset','Noon Reset','Noon · guided breath',2400,'https://d2ol7oe51mr4n9.cloudfront.net/user_3IG4Dqurc9uVifJQecwifzNzNg3/b7f691a0-16a1-4449-b143-38e7b3be74df.mp3','https://d2ol7oe51mr4n9.cloudfront.net/user_3IG4Dqurc9uVifJQecwifzNzNg3/a71c8fd6-be58-4262-83ef-1469597b1630.mp4','https://d2ol7oe51mr4n9.cloudfront.net/user_3IG4Dqurc9uVifJQecwifzNzNg3/40c72fc3-df5b-4dc9-a518-2ba3ab7f4ac3.mp4'],
    ['evening-release','Evening Release','Evening · guided breath',3600,'https://d2ol7oe51mr4n9.cloudfront.net/user_3IG4Dqurc9uVifJQecwifzNzNg3/93c0e1fe-0e8b-4e7e-9277-47edf8dd0b63.mp3','https://d2ol7oe51mr4n9.cloudfront.net/user_3IG4Dqurc9uVifJQecwifzNzNg3/12095b12-f0ae-4859-9b9b-cf28c8224987.mp4','https://d2ol7oe51mr4n9.cloudfront.net/user_3IG4Dqurc9uVifJQecwifzNzNg3/c1a8df3c-dabd-4b96-ac42-92f57d3f1ce1.mp4'],
    ['deep-sleep','Deep Sleep','Night · nose only',3600,'https://d2ol7oe51mr4n9.cloudfront.net/user_3IG4Dqurc9uVifJQecwifzNzNg3/74f43c24-d734-4ace-b1d0-f1c3263cb299.mp3','https://d2ol7oe51mr4n9.cloudfront.net/user_3IG4Dqurc9uVifJQecwifzNzNg3/e4717cb6-dae0-4bce-a4c3-f1ccab0fb9bf.mp4','https://d2ol7oe51mr4n9.cloudfront.net/user_3IG4Dqurc9uVifJQecwifzNzNg3/c8bffc30-9905-4e18-8321-e6ecbb597947.mp4']
  ];
  for (const [id,kicker,title,seconds,url,introUrl,visualUrl] of expected) {
    const app = appHarness();
    const catalogMatch = html.match(/const PRACTICES\s*=\s*(\[[\s\S]*?\n\]);/);
    assert.ok(catalogMatch, 'PRACTICES catalog must be defined');
    vm.runInContext('const PRACTICES = '+catalogMatch[1]+';\n'+extractFunction('openPracticeById'), app);
    assert.equal(vm.runInContext('openPracticeById('+JSON.stringify(id)+')', app), true);
    assert.deepEqual(Array.from(app.state.selected), [kicker,title,seconds]);
    assert.equal(vm.runInContext('chosenUrl', app), url);
    assert.equal(vm.runInContext('chosenIntroUrl', app), introUrl);
    assert.equal(vm.runInContext('chosenVisualUrl', app), visualUrl);
  }
});
