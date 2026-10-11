import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('failed meditation video playback is reported to the user', () => {
  assert.ok(/id="practiceVisualNote"/.test(html), 'visual fallback status is present');
  assert.ok(/function showPracticeVisualMessage\(/.test(html), 'visual status helper is present');
  assert.ok(/pv\.play\(\)\.catch\(\s*\(\s*\)\s*=>\s*showPracticeVisualMessage\(/.test(html), 'rejected play is visible');
  assert.ok(/practiceVisual\.addEventListener\(['"]error['"]/.test(html), 'video load errors are visible');
});

test('intro video failure gives a visible path to continue', () => {
  assert.ok(/v\.play\(\)\.catch\(\(\)=>showIntroVideoFallback\(\)\)/.test(html), 'intro play rejection is handled');
  assert.ok(/Continue without the video/.test(html), 'intro failure provides a direct path forward');
});

test('closing stillness audio can autoplay with a direct user-gesture fallback', () => {
  assert.ok(/id="closingAudio"/.test(html), 'available closing track is used');
  assert.ok(/function startClosingSound\(/.test(html), 'autoplay handler is present');
  assert.ok(/player\.play\(\)/.test(html), 'autoplay calls the closing player');
  assert.ok(/id="closingSoundFallback"/.test(html), 'a visible play fallback exists');
  assert.ok(/function toggleClosingSoundAutoplay\(/.test(html), 'autoplay is user-configurable');
  assert.ok(/closingSoundAutoplaySwitch/.test(html), 'autoplay setting is visible');
});

test('blur has its own persisted switch and removes blur filters independently', () => {
  assert.ok(/id="blurSwitch"/.test(html), 'blur switch is visible');
  assert.ok(/function toggleBlur\(/.test(html), 'blur can be toggled');
  assert.ok(/function initBlurPreference\(/.test(html), 'blur preference is restored');
  assert.ok(/localStorage\.setItem\(['"]heartclearBlur['"]/.test(html), 'blur preference is saved');
  assert.ok(/body\.no-blur[\s\S]*backdrop-filter:\s*none[\s\S]*-webkit-backdrop-filter:\s*none/.test(html), 'blur filters are disabled by mode');
  const universalBlurRule = html.match(/body\.no-blur \*,body\.no-blur \*:before,body\.no-blur \*:after\{([^}]*)\}/);
  assert.ok(universalBlurRule && !/(^|;)\s*filter\s*:/.test(universalBlurRule[1]), 'non-blur video color filters stay intact');
});
