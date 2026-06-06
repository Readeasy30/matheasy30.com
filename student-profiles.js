(() => {
  const CONFIG = {
    appId: "mathEasy30",
    appName: "MathEasy30",
    subject: "math",
    scopePrefixes: ["mathEasy30"],
    profilesKey: "mathEasy30StudentProfiles",
    activeKey: "mathEasy30ActiveStudent",
    migratedKey: "mathEasy30LegacyMigratedToProfiles",
    dataPrefix: "mathEasy30StudentData::",
    insertBeforeSelector: ".practice-controls",
    resetSelector: "#resetBtn",
    resetLabel: "Reset This Student",
    newStudentPlaceholder: "Student name or initials"
  };

  const StorageProto = Storage.prototype;
  const rawGetItem = StorageProto.getItem;
  const rawSetItem = StorageProto.setItem;
  const rawRemoveItem = StorageProto.removeItem;
  const rawKey = StorageProto.key;

  const getRaw = key => rawGetItem.call(localStorage, key);
  const setRaw = (key, value) => rawSetItem.call(localStorage, key, String(value));
  const removeRaw = key => rawRemoveItem.call(localStorage, key);

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function createId() {
    return `student-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function cleanName(name, fallback = "Student") {
    const cleaned = String(name || "").trim().replace(/\s+/g, " ").slice(0, 32);
    return cleaned || fallback;
  }

  function readProfiles() {
    try {
      const saved = JSON.parse(getRaw(CONFIG.profilesKey) || "[]");
      return Array.isArray(saved) ? saved.filter(profile => profile && profile.id && profile.name) : [];
    } catch (error) {
      return [];
    }
  }

  function writeProfiles(profiles) {
    setRaw(CONFIG.profilesKey, JSON.stringify(profiles));
  }

  function getActiveId() {
    return getRaw(CONFIG.activeKey) || "";
  }

  function setActiveId(id) {
    setRaw(CONFIG.activeKey, id);
  }

  function ensureProfiles() {
    let profiles = readProfiles();

    if (profiles.length === 0) {
      profiles = [{ id: createId(), name: "Student 1", createdAt: new Date().toISOString() }];
      writeProfiles(profiles);
      setActiveId(profiles[0].id);
    }

    let activeId = getActiveId();
    if (!profiles.some(profile => profile.id === activeId)) {
      activeId = profiles[0].id;
      setActiveId(activeId);
    }

    return profiles;
  }

  function scopedKeyFor(profileId, key) {
    return `${CONFIG.dataPrefix}${profileId}::${key}`;
  }

  function isReservedKey(key) {
    return key === CONFIG.profilesKey ||
      key === CONFIG.activeKey ||
      key === CONFIG.migratedKey ||
      key.startsWith(CONFIG.dataPrefix);
  }

  function shouldScopeKey(key) {
    if (typeof key !== "string" || key.length === 0) return false;
    if (isReservedKey(key)) return false;
    return CONFIG.scopePrefixes.some(prefix => key.startsWith(prefix));
  }

  function getCurrentProfileId() {
    ensureProfiles();
    return getActiveId();
  }

  function mapKey(key) {
    if (!shouldScopeKey(key)) return key;
    return scopedKeyFor(getCurrentProfileId(), key);
  }

  function migrateLegacyData(activeProfileId) {
    if (getRaw(CONFIG.migratedKey) === "true") return;

    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = rawKey.call(localStorage, i);
      if (key && shouldScopeKey(key)) keys.push(key);
    }

    keys.forEach(key => {
      const newKey = scopedKeyFor(activeProfileId, key);
      if (getRaw(newKey) === null) {
        const value = getRaw(key);
        if (value !== null) setRaw(newKey, value);
      }
      removeRaw(key);
    });

    setRaw(CONFIG.migratedKey, "true");
  }

  function patchLocalStorage() {
    const guardKey = `__${CONFIG.appId}StudentProfilesPatched`;
    if (window[guardKey]) return;
    window[guardKey] = true;

    StorageProto.getItem = function patchedGetItem(key) {
      if (this === localStorage) return rawGetItem.call(this, mapKey(key));
      return rawGetItem.call(this, key);
    };

    StorageProto.setItem = function patchedSetItem(key, value) {
      if (this === localStorage) return rawSetItem.call(this, mapKey(key), value);
      return rawSetItem.call(this, key, value);
    };

    StorageProto.removeItem = function patchedRemoveItem(key) {
      if (this === localStorage) return rawRemoveItem.call(this, mapKey(key));
      return rawRemoveItem.call(this, key);
    };
  }

  function getProfileValue(profileId, key) {
    return getRaw(scopedKeyFor(profileId, key));
  }

  function getMathStats(profileId) {
    const level = getProfileValue(profileId, "mathEasy30Level") || "Not set";
    let completed = 0;
    for (let day = 1; day <= 30; day++) {
      if (getProfileValue(profileId, `mathEasy30Day${day}Complete`) === "true") completed++;
    }
    const activeDay = Number(getProfileValue(profileId, "mathEasy30ActiveDay")) || 1;
    return { level, completed, activeDay };
  }

  function buildProfileCards(profiles, activeId) {
    return profiles.map(profile => {
      const stats = getMathStats(profile.id);
      const activeClass = profile.id === activeId ? " active-student" : "";
      const selectedText = profile.id === activeId ? "Selected" : "Switch";

      return `
        <button class="student-card${activeClass}" type="button" data-profile-id="${escapeHtml(profile.id)}" aria-pressed="${profile.id === activeId}">
          <span class="student-name">${escapeHtml(profile.name)}</span>
          <span class="student-stats">Level ${escapeHtml(stats.level)} • ${stats.completed} days • Day ${stats.activeDay}</span>
          <span class="student-action">${selectedText}</span>
        </button>
      `;
    }).join("");
  }

  function renderProfileBox() {
    const anchor = document.querySelector(CONFIG.insertBeforeSelector);
    if (!anchor || document.getElementById(`${CONFIG.appId}StudentProfiles`)) return;

    const profiles = ensureProfiles();
    const activeId = getActiveId();
    const activeProfile = profiles.find(profile => profile.id === activeId) || profiles[0];

    const section = document.createElement("section");
    section.id = `${CONFIG.appId}StudentProfiles`;
    section.className = "student-profile-box";
    section.innerHTML = `
      <div class="student-profile-header">
        <div>
          <p class="student-profile-label">Shared Device Profiles</p>
          <h2>Who is practicing today?</h2>
          <p>Choose a student before starting. Each student gets their own ${CONFIG.subject} progress on this device.</p>
        </div>
        <div class="active-student-pill">Now: ${escapeHtml(activeProfile.name)}</div>
      </div>

      <div class="student-card-grid" id="${CONFIG.appId}StudentList">
        ${buildProfileCards(profiles, activeId)}
      </div>

      <form class="add-student-form" id="${CONFIG.appId}AddStudentForm">
        <label for="${CONFIG.appId}NewStudentName">Add another student</label>
        <div class="add-student-row">
          <input id="${CONFIG.appId}NewStudentName" type="text" maxlength="32" placeholder="${CONFIG.newStudentPlaceholder}" autocomplete="off" />
          <button type="submit">Add Student</button>
        </div>
        <p class="student-profile-note">For schools or libraries, use first name, initials, or a simple nickname. This saves only on this device.</p>
      </form>

      <div class="student-profile-actions">
        <button type="button" class="student-remove-btn" id="${CONFIG.appId}RemoveStudentBtn">Remove Selected Student</button>
      </div>
    `;

    anchor.parentNode.insertBefore(section, anchor);
    wireProfileBox(section);
  }

  function wireProfileBox(section) {
    section.querySelectorAll("[data-profile-id]").forEach(button => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-profile-id");
        if (!id || id === getActiveId()) return;
        setActiveId(id);
        window.location.reload();
      });
    });

    const form = document.getElementById(`${CONFIG.appId}AddStudentForm`);
    const input = document.getElementById(`${CONFIG.appId}NewStudentName`);

    form.addEventListener("submit", event => {
      event.preventDefault();
      const profiles = readProfiles();
      const newProfile = {
        id: createId(),
        name: cleanName(input.value, `Student ${profiles.length + 1}`),
        createdAt: new Date().toISOString()
      };
      profiles.push(newProfile);
      writeProfiles(profiles);
      setActiveId(newProfile.id);
      window.location.reload();
    });

    const removeButton = document.getElementById(`${CONFIG.appId}RemoveStudentBtn`);
    removeButton.addEventListener("click", () => {
      const profiles = readProfiles();
      const activeId = getActiveId();
      const activeProfile = profiles.find(profile => profile.id === activeId);

      if (profiles.length <= 1) {
        alert("Keep at least one student profile on this device.");
        return;
      }

      const ok = confirm(`Remove ${activeProfile ? activeProfile.name : "this student"} and their saved ${CONFIG.subject} progress from this device?`);
      if (!ok) return;

      deleteProfileData(activeId);
      const remaining = profiles.filter(profile => profile.id !== activeId);
      writeProfiles(remaining);
      setActiveId(remaining[0].id);
      window.location.reload();
    });
  }

  function deleteProfileData(profileId) {
    const prefix = `${CONFIG.dataPrefix}${profileId}::`;
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = rawKey.call(localStorage, i);
      if (key && key.startsWith(prefix)) keys.push(key);
    }
    keys.forEach(removeRaw);
  }

  function resetActiveStudent() {
    const profiles = readProfiles();
    const activeId = getActiveId();
    const activeProfile = profiles.find(profile => profile.id === activeId);
    const name = activeProfile ? activeProfile.name : "this student";
    const ok = confirm(`Reset ${name}'s ${CONFIG.subject} progress on this device? Other students will not be changed.`);
    if (!ok) return;
    deleteProfileData(activeId);
    window.location.reload();
  }

  function updateResetButtonText() {
    document.querySelectorAll(CONFIG.resetSelector).forEach(button => {
      button.textContent = CONFIG.resetLabel;
      button.setAttribute("aria-label", `${CONFIG.resetLabel} only`);
    });
  }

  function interceptResetClicks() {
    document.addEventListener("click", event => {
      const button = event.target.closest("button");
      if (!button) return;
      const text = (button.textContent || "").trim().toLowerCase();
      const isReset = button.matches(CONFIG.resetSelector) || text === "reset this student" || text === "reset progress";
      if (!isReset) return;

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      resetActiveStudent();
    }, true);
  }

  function injectStyles() {
    if (document.getElementById(`${CONFIG.appId}StudentProfileStyles`)) return;
    const style = document.createElement("style");
    style.id = `${CONFIG.appId}StudentProfileStyles`;
    style.textContent = `
      .student-profile-box{background:var(--card,#fff);border:1px solid var(--border,#dbe3f0);border-radius:var(--radius,22px);box-shadow:var(--shadow,0 18px 45px rgba(31,45,80,.12));padding:24px;margin-top:20px}.student-profile-header{display:flex;justify-content:space-between;gap:18px;align-items:flex-start}.student-profile-label{display:inline-block;color:var(--primary,#3157d5);background:#eaf0ff;padding:7px 12px;border-radius:999px;font-size:.84rem;font-weight:800;margin:0 0 10px}.student-profile-header h2{margin:0 0 8px}.student-profile-header p{margin:0;color:var(--muted,#5d6b82)}.active-student-pill{background:var(--primary,#3157d5);color:white;border-radius:999px;padding:10px 14px;font-weight:900;white-space:nowrap}.student-card-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px;margin-top:18px}.student-card{display:grid;gap:5px;text-align:left;background:white;color:var(--text,#182033);border:2px solid #dbe8ff;border-radius:18px;padding:16px;cursor:pointer;min-height:100px}.student-card:hover,.student-card:focus{border-color:var(--accent,#16a3a3);box-shadow:0 0 0 4px rgba(22,163,163,.12)}.student-card.active-student{border-color:var(--accent,#16a3a3);background:#eefcff}.student-name{font-weight:900;font-size:1.1rem}.student-stats{font-size:.88rem;color:var(--muted,#5d6b82);line-height:1.4}.student-action{font-size:.8rem;font-weight:900;color:var(--accent,#16a3a3)}.add-student-form{margin-top:16px;background:#f8fbff;border:1px solid #dbe8ff;border-radius:18px;padding:16px}.add-student-form label{display:block;font-weight:900;margin-bottom:8px}.add-student-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px}.add-student-row input{width:100%;min-height:52px;padding:14px 16px;border-radius:16px;border:2px solid #cbd6e8;font-size:1rem;background:#fff}.add-student-row button{background:var(--primary,#3157d5);color:#fff;border:0;border-radius:16px;padding:14px 18px;font-weight:900;cursor:pointer}.student-profile-note{font-size:.9rem;color:var(--muted,#5d6b82);margin:10px 0 0}.student-profile-actions{margin-top:12px}.student-remove-btn{background:#fff;color:#b91c1c;border:2px solid #fecaca;border-radius:16px;padding:12px 16px;font-weight:900;cursor:pointer}@media(max-width:820px){.student-profile-header{flex-direction:column}.active-student-pill{white-space:normal}.add-student-row{grid-template-columns:1fr}.add-student-row button,.student-remove-btn{width:100%}}`;
    document.head.appendChild(style);
  }

  const profiles = ensureProfiles();
  migrateLegacyData(getActiveId() || profiles[0].id);
  patchLocalStorage();
  injectStyles();
  interceptResetClicks();
  renderProfileBox();
  updateResetButtonText();

  window.MathEasy30StudentProfiles = {
    getProfiles: readProfiles,
    getActiveId,
    resetActiveStudent,
    deleteProfileData
  };
})();
