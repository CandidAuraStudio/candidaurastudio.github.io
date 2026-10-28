/* HeartClear — verified original video intake and release gate.
 * Commands (read-only; media is never processed or re-encoded):
 * node human-practice-prototype/tests/hc-deep-hold-media-gate.cjs
 * node human-practice-prototype/tests/hc-deep-hold-media-gate.cjs --inspect deep-hold "/path/to/videoplayback (9).mp4"
 * node human-practice-prototype/tests/hc-deep-hold-media-gate.cjs --inspect resilience-five-rounds "/path/to/resilience.mp4"
 * node human-practice-prototype/tests/hc-deep-hold-media-gate.cjs --release deep-hold "/path/to/videoplayback (9).mp4"
 */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const cp=require('node:child_process');
const ROOT=path.resolve(__dirname,'..','media-intake');
const expected={
 'deep-hold':{filename:'deep-hold-20261025.json',driveId:'1I-DTKONkn-cbg0n-hst0iKldgnOJ6b-J',bytes:44947258,duration:1031.058866,sha256:'755969e2218fc511590bf37afdecec39a024a0124c08e5a9aff19fc9b46545b1'},
 'resilience-five-rounds':{filename:'resilience-five-rounds-20261025.json',driveId:'1JJpsuYRe792yC5FpvPsx4zyQcig-YkMM',bytes:62747290,duration:1589.034376,sha256:'53678fb188bac04ee33c0d1440e25c57bf296260f64c70adf5d36988befaed8d'}
};
const entries=Object.entries(expected).map(([id,e])=>[id,e,JSON.parse(fs.readFileSync(path.join(ROOT,e.filename),'utf8'))]);
for(const [id,e,item] of entries){
 assert.equal(item.schema,1,id);
 assert.equal(item.id,id);
 assert.equal(item.source_drive_file_id,e.driveId);
 assert.equal(item.source_size_bytes,e.bytes);
 assert.ok(Math.abs(item.verified_duration_seconds-e.duration)<0.01);
 assert.equal(item.verified_sha256,e.sha256);
 assert.equal(item.media_available,true);
 assert.equal(item.source_verified,true);
 assert.equal(item.original_audio_unchanged,true);
 assert.equal(item.original_video_unchanged,true);
 assert.equal(item.no_noise_reduction,true);
 assert.equal(item.no_voice_filtering,true);
 // The review branch is an inventory only, not an authorization to publish video.
 // Any later approval must include evidence and intentionally revise this contract.
 assert.equal(item.playable,false,id+' must not be publicly playable');
 assert.equal(item.source_media_url,null,id+' must not expose a public media URL');
 assert.equal(item.redistribution_permission_verified,false,id+' has no redistribution license');
 assert.equal(item.license_explicitly_permits_public_heartclear_distribution,false,id+' has no explicit HeartClear permission');
 assert.equal(item.redistribution_authorization_evidence_url,null,id+' has no documentary authorization');
 assert.equal(item.reviewed_for_release,false,id+' has not passed release review');
 assert.equal(item.safety_review_completed,false,id+' safety review is still outstanding');
 assert.equal(item.device_review_completed,false,id+' device review is still outstanding');
 assert.equal(item.rights_review_url,'https://breathewithsandy.com/terms-of-service/');
 assert.notEqual(item.source_drive_file_id,'1AJCfNPgTdq2cOc4rtjFcAh0ixnyKMm_C','Never substitute the unrelated two-hour Islamic Dhikr');
 if(item.playable){
  assert.equal(item.redistribution_permission_verified,true,'Publishing requires creator rights');
  assert.equal(item.reviewed_for_release,true,'Publishing requires content/safety and release review');
 }
}
const [mode='--contract',selected,file]=process.argv.slice(2);
assert.ok(['--contract','--inspect','--release','--status'].includes(mode),'Unsupported mode');
if(mode==='--contract'){
 console.log('PASS: both original source records are consistent and public playback remains blocked.');
}else if(mode==='--status'){
 for(const [id,,item] of entries){
  console.log('HOLD '+id+': verified private source; rights, safety and device approval missing; not publicly playable.');
 }
}else{
 assert.ok(expected[selected],'Unknown video ID');
 assert.ok(file&&fs.existsSync(file)&&fs.statSync(file).isFile(),'Exact source MP4 not found');
 const item=entries.find(([id])=>id===selected)[2],e=expected[selected];
 const bytes=fs.statSync(file).size;
 assert.equal(bytes,e.bytes,'Exact original source size differs');
 const digest=crypto.createHash('sha256'),fd=fs.openSync(file,'r'),buf=Buffer.allocUnsafe(1024*1024);
 try{let pos=0,n=0;while((n=fs.readSync(fd,buf,0,buf.length,pos))>0){digest.update(buf.subarray(0,n));pos+=n}}finally{fs.closeSync(fd)}
 const sha=digest.digest('hex');assert.equal(sha,e.sha256,'Original media fingerprint mismatch');
 const ff=cp.spawnSync('ffprobe',['-v','error','-show_format','-show_streams','-of','json',file],{encoding:'utf8',maxBuffer:4*1024*1024});
 assert.equal(ff.status,0,'ffprobe failed');
 const parsed=JSON.parse(ff.stdout),duration=Number(parsed.format?.duration);
 assert.ok(Math.abs(duration-e.duration)<0.02,'Actual original duration differs');
 assert.ok(parsed.streams.some(s=>s.codec_type==='video'&&s.codec_name==='h264'),'Original video missing');
 assert.ok(parsed.streams.some(s=>s.codec_type==='audio'&&s.codec_name==='aac'&&Number(s.channels)===2),'Original stereo audio missing');
 console.log('PASS '+selected+': '+duration.toFixed(3)+'s; SHA256 '+sha+'; stereo AAC preserved unchanged');
 if(mode==='--release'){
  assert.equal(item.redistribution_permission_verified,true,'Rights permission not confirmed');
  assert.equal(item.reviewed_for_release,true,'Release review not completed');
  assert.equal(item.playable,true,'Public playback not authorized/verified');
  console.log('Release gate satisfied; release manager must separately verify Android/PWA playback.');
 }
}
