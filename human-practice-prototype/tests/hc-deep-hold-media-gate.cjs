/* HeartClear Deep Hold intake test.
 * Usage:
 * node human-practice-prototype/tests/hc-deep-hold-media-gate.cjs
 * node human-practice-prototype/tests/hc-deep-hold-media-gate.cjs --inspect /absolute/path/to/source.mp4
 * node human-practice-prototype/tests/hc-deep-hold-media-gate.cjs --release /absolute/path/to/source.mp4
 * No noise removal, transcoding or other media edits are performed.
 */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const cp=require('node:child_process');
const ROOT=path.resolve(__dirname,'..');
const intake=JSON.parse(fs.readFileSync(path.join(ROOT,'media-intake','deep-hold-20261025.json'),'utf8'));
function blocked(message){console.error('BLOCKED: '+message);process.exitCode=1}
assert.equal(intake.schema,1);
assert.equal(intake.id,'deep-hold');
assert.equal(intake.title,'Deep Hold');
assert.equal(intake.original_filename,'videoplayback (9).mp4');
assert.equal(intake.requested_display_duration,'17 min');
for(const k of ['original_video_unchanged','original_audio_unchanged','no_noise_reduction','no_voice_filtering'])assert.equal(intake[k],true,k);
assert.notEqual(intake.source_drive_file_id,'1AJCfNPgTdq2cOc4rtjFcAh0ixnyKMm_C','Never use the unrelated two-hour Dhikr');
const [mode='--contract',file]=process.argv.slice(2);
assert.ok(['--contract','--inspect','--release'].includes(mode),'Unknown mode');
if(mode==='--contract'){
 if(intake.playable || intake.media_available){
  assert.ok(intake.source_media_url || intake.source_drive_file_id,'Source must be verified');
  assert.equal(intake.redistribution_permission_verified,true);
  assert.equal(intake.reviewed_for_release,true);
 }else{
  assert.equal(intake.playable,false);
  assert.equal(intake.media_available,false);
  assert.equal(intake.source_drive_file_id,null);
  assert.equal(intake.source_media_url,null);
 }
 console.log('PASS: pending Deep Hold record is accurate, nonplayable, and preserves original sound.');
}else{
 if(!file || !fs.existsSync(file) || !fs.statSync(file).isFile())throw Error('Original video MP4 is not accessible');
 const size=fs.statSync(file).size;
 assert.equal(path.extname(file).toLowerCase(),'.mp4');
 assert.ok(size>10*1024*1024 && size<120*1024*1024,'Size unexpected: do not substitute the two-hour Dhikr video');
 const hash=crypto.createHash('sha256'),fd=fs.openSync(file,'r'),buf=Buffer.allocUnsafe(1024*1024);
 try{let n=0,pos=0;while((n=fs.readSync(fd,buf,0,buf.length,pos))>0){hash.update(buf.subarray(0,n));pos+=n}}finally{fs.closeSync(fd)}
 const sha256=hash.digest('hex');
 const probe=cp.spawnSync('ffprobe',['-v','error','-show_format','-show_streams','-of','json',file],{encoding:'utf8',maxBuffer:4*1024*1024});
 if(probe.status!==0)throw Error('Could not inspect video/audio: '+probe.stderr);
 const data=JSON.parse(probe.stdout),streams=data.streams||[],duration=Number(data.format?.duration);
 assert.ok(streams.some(s=>s.codec_type==='video'),'No video stream');
 assert.ok(streams.some(s=>s.codec_type==='audio'),'Original soundtrack missing');
 assert.ok(Number.isFinite(duration)&&duration>60,'Cannot confirm duration');
 console.log(JSON.stringify({file:path.basename(file),bytes:size,sha256,duration_seconds:duration,
  video:streams.filter(s=>s.codec_type==='video').map(s=>({codec:s.codec_name,width:s.width,height:s.height})),
  audio:streams.filter(s=>s.codec_type==='audio').map(s=>({codec:s.codec_name,sample_rate:s.sample_rate,channels:s.channels,bit_rate:s.bit_rate})),
  processing:'None; voice, music and background retained unchanged'},null,2));
 if(mode==='--release'){
  if(!intake.redistribution_permission_verified)blocked('Public redistribution permission missing');
  if(!intake.reviewed_for_release)blocked('Release manager review missing');
  if(!intake.source_media_url && !intake.source_drive_file_id)blocked('Verified media source missing');
  if(!intake.media_available || !intake.playable)blocked('Media playback not verified');
  if(intake.verified_sha256 && intake.verified_sha256!==sha256)blocked('Media checksum changed');
  if(intake.verified_duration_seconds && Math.abs(Number(intake.verified_duration_seconds)-duration)>2)blocked('Media duration changed');
 }
}
