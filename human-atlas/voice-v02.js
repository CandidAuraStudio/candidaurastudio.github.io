/* HUMAN ATLAS v02 — private, per-story audio narration on this device.
   Browser permission is requested only when a person taps Record.
   IndexedDB stores original blobs locally. Nothing is uploaded. */
(function () {
  "use strict";
  const dialog = document.getElementById("story-dialog");
  if (!dialog) return;
  const DB = "human-atlas-voice-v02";
  const STORE = "recordings";
  const FIVE_MINUTES = 5 * 60 * 1000;
  let recorder = null;
  let stream = null;
  let timer = null;
  let activeStory = null;
  let previewURL = null;
  let recording = false;

  const ui = id => document.getElementById(id);
  function status(msg) { const el = ui("voice-status"); if (el) el.textContent = msg; }
  function storyId() {
    const match = location.hash.match(/^#\/story\/([^/?]+)/);
    try { return match ? decodeURIComponent(match[1]) : null; } catch (_) { return null; }
  }
  function cleanupPreview() {
    const audio = ui("voice-player");
    if (audio) { audio.pause(); audio.removeAttribute("src"); audio.load(); }
    if (previewURL) { URL.revokeObjectURL(previewURL); previewURL = null; }
  }
  function refreshButtons(hasClip) {
    const start = ui("voice-record"), stop = ui("voice-stop"), remove = ui("voice-delete"), download = ui("voice-download");
    if (start) start.disabled = recording;
    if (stop) stop.disabled = !recording;
    if (remove) remove.disabled = recording || !hasClip;
    if (download) download.disabled = recording || !hasClip;
  }
  function dbOpen() {
    return new Promise((resolve, reject) => {
      if (!("indexedDB" in window)) return reject(new Error("Browser recording storage is unavailable."));
      const req = indexedDB.open(DB, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: "id" });
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error || new Error("Could not open device storage."));
    });
  }
  async function dbRead(id) {
    const db = await dbOpen();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const req = tx.objectStore(STORE).get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error || new Error("Could not read this recording."));
      tx.oncomplete = () => db.close();
      tx.onerror = () => db.close();
    });
  }
  async function dbWrite(id, blob) {
    const db = await dbOpen();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put({ id: id, blob: blob, type: blob.type, recordedAt: new Date().toISOString() });
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => { db.close(); reject(tx.error || new Error("Could not save this recording.")); };
      tx.onabort = () => { db.close(); reject(tx.error || new Error("Recording storage was cancelled.")); };
    });
  }
  async function dbDelete(id) {
    const db = await dbOpen();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).delete(id);
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => { db.close(); reject(tx.error || new Error("Could not delete this recording.")); };
    });
  }
  function releaseMicrophone() {
    if (timer) { clearTimeout(timer); timer = null; }
    if (stream) { stream.getTracks().forEach(track => track.stop()); stream = null; }
  }
  function stopRecording() {
    if (!recorder || recorder.state === "inactive") return;
    try { recorder.stop(); } catch (_) { releaseMicrophone(); recording = false; }
    status("Saving this recording privately on your device…");
  }
  async function showRecording() {
    const id = storyId();
    cleanupPreview();
    if (!dialog.open || !id) return;
    refreshButtons(false);
    if (recording) { status("Recording… Tap Stop when finished."); return; }
    status("Checking for a recording saved in this browser…");
    try {
      const item = await dbRead(id);
      if (!dialog.open || id !== storyId() || recording) return;
      refreshButtons(!!item);
      const audio = ui("voice-player");
      if (item && item.blob instanceof Blob && audio) {
        previewURL = URL.createObjectURL(item.blob);
        audio.src = previewURL;
        audio.hidden = false;
        status("Saved on this device. Play below or export your audio backup.");
      } else {
        if (audio) audio.hidden = true;
        status("No recording saved for this story yet.");
      }
    } catch (err) { status("Local audio storage is unavailable: " + (err.message || String(err))); }
  }
  async function startRecording() {
    const id = storyId();
    if (!dialog.open || !id || recording) return;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
      status("This browser does not support microphone recording. Try opening the site directly in Chrome or Safari.");
      return;
    }
    if (!("indexedDB" in window)) { status("This browser cannot save voice recordings locally."); return; }
    const prior = await dbRead(id).catch(() => null);
    if (prior && !confirm("Replace the narration already saved for this story? Export the old recording first if needed.")) return;
    cleanupPreview();
    try {
      const granted = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      if (!dialog.open || id !== storyId()) { granted.getTracks().forEach(t => t.stop()); return; }
      stream = granted;
      if ("speechSynthesis" in window) speechSynthesis.cancel();
      const types = ["audio/webm;codecs=opus", "audio/mp4", "audio/webm"];
      const mimeType = types.find(t => MediaRecorder.isTypeSupported(t)) || "";
      recorder = mimeType ? new MediaRecorder(stream, { mimeType: mimeType }) : new MediaRecorder(stream);
      const chunks = [];
      const recordingId = id;
      recorder.ondataavailable = ev => { if (ev.data && ev.data.size) chunks.push(ev.data); };
      recorder.onerror = () => { recording = false; releaseMicrophone(); status("Recording failed. Please retry."); refreshButtons(!!prior); };
      recorder.onstop = async () => {
        recording = false;
        releaseMicrophone();
        const blob = new Blob(chunks, { type: recorder && recorder.mimeType ? recorder.mimeType : (mimeType || "audio/webm") });
        recorder = null;
        if (blob.size < 200) {
          status("Recording was too short or empty. Try again.");
          if (dialog.open) refreshButtons(!!prior);
          return;
        }
        try {
          await dbWrite(recordingId, blob);
          if (dialog.open && storyId() === recordingId) await showRecording();
        } catch (err) { status("Could not save audio: " + (err.message || "Device storage is full.")); refreshButtons(!!prior); }
      };
      recorder.start(1000);
      activeStory = recordingId;
      recording = true;
      refreshButtons(!!prior);
      status("Recording… Microphone active. Maximum five minutes.");
      timer = setTimeout(() => { stopRecording(); }, FIVE_MINUTES);
    } catch (err) {
      releaseMicrophone();
      recorder = null;
      recording = false;
      refreshButtons(!!prior);
      status(err && err.name === "NotAllowedError" ? "Microphone permission was denied. Allow it in your browser settings to record." : "Could not start recording: " + (err.message || String(err)));
    }
  }
  async function downloadRecording() {
    const id = storyId(); if (!id) return;
    try {
      const item = await dbRead(id);
      if (!item || !(item.blob instanceof Blob)) return status("No saved recording available to export.");
      const type = item.type || item.blob.type || "";
      const ext = /mp4|m4a/i.test(type) ? "m4a" : /ogg/i.test(type) ? "ogg" : "webm";
      const href = URL.createObjectURL(item.blob);
      const a = document.createElement("a");
      a.href = href; a.download = "human-atlas-narration-" + id.replace(/[^a-z0-9-]/gi, "-").slice(0,70) + "." + ext;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(href), 10000);
      status("Audio export requested. Check your Downloads folder.");
    } catch (err) { status("Could not export audio: " + (err.message || String(err))); }
  }
  async function deleteRecording() {
    const id = storyId();
    if (!id || recording || !confirm("Delete this voice recording from this device? Export it first if you want a backup.")) return;
    try { await dbDelete(id); await showRecording(); } catch (err) { status("Could not delete audio: " + (err.message || String(err))); }
  }
  document.addEventListener("click", event => {
    const control = event.target.closest("[data-voice-action]");
    if (!control || !dialog.contains(control)) return;
    event.preventDefault();
    const action = control.dataset.voiceAction;
    if (action === "start") startRecording();
    if (action === "stop") stopRecording();
    if (action === "download") downloadRecording();
    if (action === "delete") deleteRecording();
  });
  window.addEventListener("hashchange", () => { if (recording && activeStory !== storyId()) stopRecording(); setTimeout(showRecording, 40); });
  dialog.addEventListener("close", () => { if (recording) stopRecording(); cleanupPreview(); });
  if (location.hash.startsWith("#/story/")) setTimeout(showRecording, 0);
})();