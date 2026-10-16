// Cloudflare R2 Uploader Client App
let currentConfig = null;
let fileQueue = [];
let uploadedHistory = [];
let nextFileId = 1;

// DOM Elements
const folderInput = document.getElementById('folder-input');
const btnClearFolder = document.getElementById('btn-clear-folder');
const folderChips = document.getElementById('folder-chips');
const destPreview = document.getElementById('destination-path-preview');
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('file-input');
const queueHeader = document.getElementById('queue-header');
const queueCount = document.getElementById('queue-count');
const queueTotalSize = document.getElementById('queue-total-size');
const fileQueueList = document.getElementById('file-queue-list');
const btnUploadAll = document.getElementById('btn-upload-all');
const btnUploadCount = document.getElementById('btn-upload-count');
const btnClearQueue = document.getElementById('btn-clear-queue');
const overallProgressWrapper = document.getElementById('overall-progress-wrapper');
const overallProgressBar = document.getElementById('overall-progress-bar');
const overallProgressText = document.getElementById('overall-progress-text');
const resultsCard = document.getElementById('results-card');
const resultsTextarea = document.getElementById('results-textarea');
const resultsPathsTextarea = document.getElementById('results-paths-textarea');
const resultsList = document.getElementById('results-list');
const btnCopyAllUrls = document.getElementById('btn-copy-all-urls');
const btnCopyAllPaths = document.getElementById('btn-copy-all-paths');
const btnCopyJson = document.getElementById('btn-copy-json');
const btnCopyMarkdown = document.getElementById('btn-copy-markdown');
const btnClearResults = document.getElementById('btn-clear-results');


// Navigation & Modals
const connectionBadge = document.getElementById('connection-badge');
const badgeText = document.getElementById('badge-text');
const unconfiguredBanner = document.getElementById('unconfigured-banner');
const btnBannerSettings = document.getElementById('btn-banner-settings');
const modalSettings = document.getElementById('modal-settings');
const btnOpenSettings = document.getElementById('btn-open-settings');
const btnCloseSettings = document.getElementById('btn-close-settings');
const settingsForm = document.getElementById('settings-form');
const btnTestConnection = document.getElementById('btn-test-connection');
const testConnectionResult = document.getElementById('test-connection-result');
const modalExplorer = document.getElementById('modal-explorer');
const btnOpenExplorer = document.getElementById('btn-open-explorer');
const btnCloseExplorer = document.getElementById('btn-close-explorer');
const explorerItems = document.getElementById('explorer-items');
const explorerFilter = document.getElementById('explorer-filter-input');
const btnRefreshExplorer = document.getElementById('btn-refresh-explorer');
const themeToggle = document.getElementById('theme-toggle');
const toastEl = document.getElementById('toast');

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initFolder();
  await loadConfig();
  await loadFolderPresets();
  setupEventListeners();
});

// Theme handling
function initTheme() {
  const savedTheme = localStorage.getItem('r2_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('r2_theme', next);
    themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
  });
}

// Folder Handling
function initFolder() {
  const savedFolder = localStorage.getItem('r2_last_folder') || '';
  folderInput.value = savedFolder;
  updateDestinationPreview();

  folderInput.addEventListener('input', () => {
    localStorage.setItem('r2_last_folder', folderInput.value.trim());
    updateDestinationPreview();
    updateChipHighlights();
  });

  btnClearFolder.addEventListener('click', () => {
    folderInput.value = '';
    localStorage.setItem('r2_last_folder', '');
    updateDestinationPreview();
    updateChipHighlights();
    folderInput.focus();
  });

  folderChips.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    const folder = chip.getAttribute('data-folder');
    folderInput.value = folder;
    localStorage.setItem('r2_last_folder', folder);
    updateDestinationPreview();
    updateChipHighlights();
  });
}

function updateChipHighlights() {
  const cur = folderInput.value.trim().toLowerCase();
  document.querySelectorAll('.chip').forEach(c => {
    const f = (c.getAttribute('data-folder') || '').trim().toLowerCase();
    c.classList.toggle('active', f === cur);
  });
}

function getSanitizedFolder() {
  return folderInput.value.trim().replace(/^\/+|\/+$/g, '');
}

function updateDestinationPreview() {
  const folder = getSanitizedFolder();
  const domain = currentConfig?.publicDomain || 'https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev';
  const cleanDomain = domain.replace(/\/+$/, '');
  const sampleFile = fileQueue.length > 0 ? (fileQueue[0].customName || fileQueue[0].file.name) : 'image.jpg';
  
  const pathPart = folder ? `${encodeURI(folder)}/` : '';
  destPreview.innerHTML = `${cleanDomain}/${pathPart}<span>${encodeURIComponent(sampleFile)}</span>`;
}

// Load Configuration from backend
async function loadConfig() {
  try {
    const res = await fetch('/api/config');
    const data = await res.json();
    currentConfig = data;

    // Fill settings form
    document.getElementById('cfg-account-id').value = data.accountId || '';
    document.getElementById('cfg-bucket-name').value = data.bucketName || '';
    document.getElementById('cfg-access-key').value = data.accessKeyId || '';
    document.getElementById('cfg-public-domain').value = data.publicDomain || 'https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev';

    if (data.hasSecret) {
      document.getElementById('cfg-secret-key').value = data.secretAccessKey;
      document.getElementById('secret-notice').style.display = 'block';
    }

    if (data.configured) {
      connectionBadge.className = 'badge badge-success';
      badgeText.textContent = `Bucket: ${data.bucketName}`;
      unconfiguredBanner.style.display = 'none';
    } else {
      connectionBadge.className = 'badge badge-warning';
      badgeText.textContent = 'Not configured';
      unconfiguredBanner.style.display = 'flex';
    }

    updateDestinationPreview();
  } catch (err) {
    console.error('Failed to load config:', err);
    connectionBadge.className = 'badge badge-error';
    badgeText.textContent = 'Backend Error';
  }
}

// Load dynamic folder presets from bucket
async function loadFolderPresets() {
  try {
    const res = await fetch('/api/folders');
    const data = await res.json();
    if (data.folders && data.folders.length > 0) {
      // Add unique folders as chips
      const existingChips = new Set(Array.from(document.querySelectorAll('.chip')).map(c => c.getAttribute('data-folder')));
      data.folders.forEach(f => {
        if (!existingChips.has(f)) {
          const btn = document.createElement('button');
          btn.className = 'chip';
          btn.setAttribute('data-folder', f);
          btn.textContent = f;
          folderChips.appendChild(btn);
        }
      });
    }
  } catch (err) {
    // silently ignore if not yet configured
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Dropzone click & drag
  dropzone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    handleFilesSelected(e.target.files);
    fileInput.value = ''; // reset so same files can be chosen again if needed
  });

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelected(e.dataTransfer.files);
    }
  });

  // Global Clipboard Paste (Ctrl+V)
  window.addEventListener('paste', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    const files = [];
    for (const item of items) {
      if (item.kind === 'file') {
        const f = item.getAsFile();
        if (f) files.push(f);
      }
    }
    if (files.length > 0) {
      handleFilesSelected(files);
      showToast(`Pasted ${files.length} file(s) from clipboard!`);
    }
  });

  // Queue actions
  btnUploadAll.addEventListener('click', uploadAllFiles);
  btnClearQueue.addEventListener('click', clearQueue);

  // Copy batch actions
  btnCopyAllUrls.addEventListener('click', () => {
    const urls = uploadedHistory.map(item => item.url).join('\n');
    copyToClipboard(urls, 'All public URLs copied!');
  });
  btnCopyAllPaths.addEventListener('click', () => {
    const paths = uploadedHistory.map(item => item.key).join('\n');
    copyToClipboard(paths, 'All bucket paths/keys copied!');
  });
  btnCopyJson.addEventListener('click', () => {
    const jsonStr = JSON.stringify(uploadedHistory.map(item => ({
      fileName: item.fileName,
      bucket: item.bucket,
      key: item.key,
      bucketPath: item.bucketPath,
      url: item.url,
      size: item.size,
      contentType: item.contentType,
    })), null, 2);
    copyToClipboard(jsonStr, 'JSON export copied!');
  });
  btnCopyMarkdown.addEventListener('click', () => {
    const md = uploadedHistory.map(item => item.markdown).join('\n');
    copyToClipboard(md, 'Markdown links copied!');
  });
  btnClearResults.addEventListener('click', () => {
    uploadedHistory = [];
    resultsList.innerHTML = '';
    resultsTextarea.value = '';
    resultsPathsTextarea.value = '';
    resultsCard.style.display = 'none';
    showToast('Results cleared');
  });


  // Settings Modal
  btnOpenSettings.addEventListener('click', () => modalSettings.style.display = 'flex');
  btnBannerSettings.addEventListener('click', () => modalSettings.style.display = 'flex');
  btnCloseSettings.addEventListener('click', () => modalSettings.style.display = 'none');
  modalSettings.addEventListener('click', (e) => {
    if (e.target === modalSettings) modalSettings.style.display = 'none';
  });

  settingsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await saveSettings();
  });

  btnTestConnection.addEventListener('click', testConnection);

  // Explorer Modal
  btnOpenExplorer.addEventListener('click', () => {
    modalExplorer.style.display = 'flex';
    fetchExplorerObjects();
  });
  btnCloseExplorer.addEventListener('click', () => modalExplorer.style.display = 'none');
  modalExplorer.addEventListener('click', (e) => {
    if (e.target === modalExplorer) modalExplorer.style.display = 'none';
  });
  btnRefreshExplorer.addEventListener('click', fetchExplorerObjects);
  explorerFilter.addEventListener('input', filterExplorerItems);
}

// Handle File Selection
function handleFilesSelected(fileList) {
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
    
    fileQueue.push({
      id: nextFileId++,
      file,
      customName: file.name,
      previewUrl,
      status: 'pending', // pending, uploading, done, error
      progress: 0,
      result: null,
      errorMsg: null,
    });
  }
  renderQueue();
  updateDestinationPreview();
}

// Render Queue
function renderQueue() {
  if (fileQueue.length === 0) {
    queueHeader.style.display = 'none';
    fileQueueList.innerHTML = '';
    return;
  }

  queueHeader.style.display = 'flex';
  const totalBytes = fileQueue.reduce((acc, item) => acc + item.file.size, 0);
  const pendingCount = fileQueue.filter(i => i.status === 'pending').length;

  queueCount.textContent = `${fileQueue.length} file(s) in queue`;
  queueTotalSize.textContent = formatBytes(totalBytes);
  btnUploadCount.textContent = pendingCount;
  btnUploadAll.disabled = pendingCount === 0;

  fileQueueList.innerHTML = '';

  fileQueue.forEach(item => {
    const card = document.createElement('div');
    card.className = `queue-item ${item.status}`;
    card.id = `queue-item-${item.id}`;

    // Thumbnail
    let thumbHtml = '';
    if (item.previewUrl) {
      thumbHtml = `<img src="${item.previewUrl}" class="queue-thumb" alt="Preview" />`;
    } else {
      thumbHtml = `<div class="queue-thumb" style="display:flex;align-items:center;justify-content:center;font-size:1.4rem;">📄</div>`;
    }

    const folder = getSanitizedFolder();
    const destPath = folder ? `${folder}/${item.customName}` : item.customName;

    // Status Badge
    let statusBadge = '<span class="queue-status-badge" style="color:var(--text-muted)">Ready</span>';
    if (item.status === 'uploading') {
      statusBadge = `<span class="queue-status-badge" style="color:var(--primary)">Uploading ${item.progress}%</span>`;
    } else if (item.status === 'done') {
      statusBadge = '<span class="queue-status-badge" style="color:var(--success)">Uploaded ✅</span>';
    } else if (item.status === 'error') {
      statusBadge = `<span class="queue-status-badge" style="color:var(--error)" title="${item.errorMsg || 'Upload failed'}">Failed ❌</span>`;
    }

    card.innerHTML = `
      ${thumbHtml}
      <div class="queue-details">
        <div class="queue-name-row">
          <input 
            type="text" 
            class="queue-name-input" 
            value="${escapeHtml(item.customName)}" 
            ${item.status === 'uploading' || item.status === 'done' ? 'disabled' : ''}
            title="Click to rename before uploading"
          />
        </div>
        <div class="queue-meta">
          <span>${formatBytes(item.file.size)}</span>
          <span>•</span>
          <span class="path" title="${escapeHtml(item.result?.key || destPath)}">
            ${item.status === 'done' && item.result ? `Path: ${escapeHtml(item.result.key)}` : `Target: ${escapeHtml(destPath)}`}
          </span>
          <span>•</span>
          ${statusBadge}
        </div>
      </div>
      <div class="queue-actions-item">
        ${item.status === 'pending' ? `
          <button class="btn btn-primary btn-sm btn-upload-single" title="Upload this file only">
            Upload
          </button>
        ` : ''}
        ${item.status === 'done' && item.result ? `
          <button class="btn btn-secondary btn-sm btn-copy-path" title="Copy Bucket Path">
            📋 Path
          </button>
          <button class="btn btn-secondary btn-sm btn-copy-single" title="Copy Public URL">
            📋 URL
          </button>
          <a href="${item.result.url}" target="_blank" rel="noopener noreferrer" class="btn btn-icon btn-sm" title="View image">↗</a>
        ` : ''}
        <button class="btn btn-icon btn-sm btn-remove-item" title="Remove from queue">✕</button>
      </div>
    `;

    // Event listeners for item card
    const nameInput = card.querySelector('.queue-name-input');
    nameInput.addEventListener('change', () => {
      item.customName = nameInput.value.trim() || item.file.name;
      renderQueue();
      updateDestinationPreview();
    });

    const btnUploadSingle = card.querySelector('.btn-upload-single');
    if (btnUploadSingle) {
      btnUploadSingle.addEventListener('click', () => uploadSingleFile(item));
    }

    const btnCopyPath = card.querySelector('.btn-copy-path');
    if (btnCopyPath) {
      btnCopyPath.addEventListener('click', () => copyToClipboard(item.result.key, 'Bucket path copied!'));
    }

    const btnCopySingle = card.querySelector('.btn-copy-single');
    if (btnCopySingle) {
      btnCopySingle.addEventListener('click', () => copyToClipboard(item.result.url, 'Public URL copied!'));
    }


    const btnRemove = card.querySelector('.btn-remove-item');
    btnRemove.addEventListener('click', () => {
      if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      fileQueue = fileQueue.filter(i => i.id !== item.id);
      renderQueue();
      updateDestinationPreview();
    });

    fileQueueList.appendChild(card);
  });
}

// Upload Single File
async function uploadSingleFile(item) {
  if (item.status === 'uploading' || item.status === 'done') return;

  const folder = getSanitizedFolder();
  item.status = 'uploading';
  item.progress = 0;
  renderQueue();

  const formData = new FormData();
  formData.append('files', item.file, item.customName);
  formData.append('folder', folder);
  formData.append('customNames', JSON.stringify([item.customName]));

  try {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload');

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        item.progress = Math.round((e.loaded / e.total) * 100);
        renderQueue();
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);
        if (response.results && response.results.length > 0) {
          const res = response.results[0];
          item.status = 'done';
          item.result = res;
          addUploadResult(res);
          showToast(`Uploaded: ${res.fileName}`);
        } else {
          item.status = 'error';
          item.errorMsg = response.errors?.[0]?.error || 'Upload error';
          showToast(`Error: ${item.errorMsg}`, true);
        }
      } else {
        const err = JSON.parse(xhr.responseText || '{}');
        item.status = 'error';
        item.errorMsg = err.error || 'Server error';
        showToast(`Failed: ${item.errorMsg}`, true);
      }
      renderQueue();
    };

    xhr.onerror = () => {
      item.status = 'error';
      item.errorMsg = 'Network error during upload';
      renderQueue();
      showToast('Network error', true);
    };

    xhr.send(formData);
  } catch (err) {
    item.status = 'error';
    item.errorMsg = err.message;
    renderQueue();
  }
}

// Batch Upload All
async function uploadAllFiles() {
  const pendingItems = fileQueue.filter(i => i.status === 'pending');
  if (pendingItems.length === 0) return;

  overallProgressWrapper.style.display = 'flex';
  overallProgressBar.style.width = '0%';
  overallProgressText.textContent = `Starting batch upload of ${pendingItems.length} files...`;
  btnUploadAll.disabled = true;

  const folder = getSanitizedFolder();
  const formData = new FormData();
  const customNames = [];

  pendingItems.forEach(item => {
    item.status = 'uploading';
    item.progress = 0;
    formData.append('files', item.file, item.customName);
    customNames.push(item.customName);
  });
  formData.append('folder', folder);
  formData.append('customNames', JSON.stringify(customNames));

  renderQueue();

  try {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload');

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100);
        overallProgressBar.style.width = `${pct}%`;
        overallProgressText.textContent = `Uploading files... ${pct}%`;
        pendingItems.forEach(i => i.progress = pct);
        renderQueue();
      }
    };

    xhr.onload = () => {
      overallProgressWrapper.style.display = 'none';
      if (xhr.status >= 200 && xhr.status < 300) {
        const resp = JSON.parse(xhr.responseText);
        
        // Match results back to pending items
        if (resp.results) {
          resp.results.forEach(r => {
            const match = pendingItems.find(i => i.customName === r.fileName || i.file.name === r.originalName);
            if (match) {
              match.status = 'done';
              match.result = r;
            }
            addUploadResult(r);
          });
        }

        if (resp.errors) {
          resp.errors.forEach(err => {
            const match = pendingItems.find(i => i.customName === err.fileName);
            if (match) {
              match.status = 'error';
              match.errorMsg = err.error;
            }
          });
        }

        showToast(`Batch complete: ${resp.uploadedCount} uploaded successfully!`);
      } else {
        const err = JSON.parse(xhr.responseText || '{}');
        pendingItems.forEach(i => {
          i.status = 'error';
          i.errorMsg = err.error || 'Batch upload failed';
        });
        showToast(err.error || 'Batch upload failed', true);
      }
      renderQueue();
    };

    xhr.onerror = () => {
      overallProgressWrapper.style.display = 'none';
      pendingItems.forEach(i => {
        i.status = 'error';
        i.errorMsg = 'Network connection failed';
      });
      renderQueue();
      showToast('Network error', true);
    };

    xhr.send(formData);
  } catch (err) {
    overallProgressWrapper.style.display = 'none';
    showToast(err.message, true);
  }
}

// Clear Queue
function clearQueue() {
  fileQueue.forEach(item => {
    if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
  });
  fileQueue = [];
  renderQueue();
  updateDestinationPreview();
}

// Add Upload Result
function addUploadResult(res) {
  uploadedHistory.push(res);
  resultsCard.style.display = 'block';

  // Update Raw Textareas
  resultsTextarea.value = uploadedHistory.map(item => item.url).join('\n');
  if (resultsPathsTextarea) {
    resultsPathsTextarea.value = uploadedHistory.map(item => item.key).join('\n');
  }

  // Add Rich Result Card Item
  const card = document.createElement('div');
  card.className = 'result-card-item';
  card.innerHTML = `
    <div class="result-card-header">
      <div class="result-file-info">
        <img src="${res.url}" class="result-file-thumb" onerror="this.style.display='none'" />
        <div>
          <div class="result-file-name">${escapeHtml(res.fileName)}</div>
          <div class="result-file-meta">
            <span>${formatBytes(res.size)}</span>
            <span>•</span>
            <span>${escapeHtml(res.contentType || 'image')}</span>
            <span>•</span>
            <span>Bucket: <strong>${escapeHtml(res.bucket || currentConfig?.bucketName || 'R2')}</strong></span>
          </div>
        </div>
      </div>
      <div class="result-badge-success">Uploaded ✅</div>
    </div>

    <div class="result-field-group">
      <!-- 1. Bucket Path / Object Key -->
      <div class="result-field-row">
        <span class="result-field-label">Bucket Path</span>
        <div class="result-field-content">
          <code>${escapeHtml(res.key)}</code>
        </div>
        <div class="result-field-actions">
          <button class="btn btn-secondary btn-sm" onclick="copyToClipboard('${escapeJs(res.key)}', 'Bucket path copied!')">
            📋 Copy Path
          </button>
        </div>
      </div>

      <!-- 2. Public URL -->
      <div class="result-field-row">
        <span class="result-field-label">Public URL</span>
        <div class="result-field-content">
          <a href="${res.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(res.url)}</a>
        </div>
        <div class="result-field-actions">
          <button class="btn btn-secondary btn-sm" onclick="copyToClipboard('${escapeJs(res.url)}', 'Public URL copied!')">
            📋 Copy URL
          </button>
          <a href="${res.url}" target="_blank" rel="noopener noreferrer" class="btn btn-icon btn-sm" title="Open image">
            ↗
          </a>
        </div>
      </div>
    </div>
  `;
  resultsList.prepend(card);
}


// Settings Form Save
async function saveSettings() {
  const accountId = document.getElementById('cfg-account-id').value.trim();
  const bucketName = document.getElementById('cfg-bucket-name').value.trim();
  const accessKeyId = document.getElementById('cfg-access-key').value.trim();
  const secretAccessKey = document.getElementById('cfg-secret-key').value.trim();
  const publicDomain = document.getElementById('cfg-public-domain').value.trim();

  const btnSave = document.getElementById('btn-save-settings');
  btnSave.disabled = true;
  btnSave.textContent = 'Saving...';

  try {
    const res = await fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accountId,
        bucketName,
        accessKeyId,
        secretAccessKey,
        publicDomain,
      }),
    });
    const data = await res.json();
    if (data.success) {
      showToast('Settings saved successfully!');
      modalSettings.style.display = 'none';
      await loadConfig();
      await loadFolderPresets();
    } else {
      showToast(data.error || 'Failed to save settings', true);
    }
  } catch (err) {
    showToast('Failed to save settings: ' + err.message, true);
  } finally {
    btnSave.disabled = false;
    btnSave.textContent = '💾 Save Settings';
  }
}

// Test Connection
async function testConnection() {
  btnTestConnection.disabled = true;
  btnTestConnection.textContent = 'Testing...';
  testConnectionResult.style.display = 'block';
  testConnectionResult.className = 'test-result';
  testConnectionResult.textContent = 'Connecting to Cloudflare R2...';

  // Save current values first to test with fresh inputs
  const accountId = document.getElementById('cfg-account-id').value.trim();
  const bucketName = document.getElementById('cfg-bucket-name').value.trim();
  const accessKeyId = document.getElementById('cfg-access-key').value.trim();
  const secretAccessKey = document.getElementById('cfg-secret-key').value.trim();
  const publicDomain = document.getElementById('cfg-public-domain').value.trim();

  try {
    await fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountId, bucketName, accessKeyId, secretAccessKey, publicDomain }),
    });

    const res = await fetch('/api/test-connection');
    const data = await res.json();

    if (data.success) {
      testConnectionResult.className = 'test-result success';
      testConnectionResult.textContent = `✅ ${data.message}`;
    } else {
      testConnectionResult.className = 'test-result error';
      testConnectionResult.textContent = `❌ ${data.error}`;
    }
  } catch (err) {
    testConnectionResult.className = 'test-result error';
    testConnectionResult.textContent = `❌ Connection test failed: ${err.message}`;
  } finally {
    btnTestConnection.disabled = false;
    btnTestConnection.textContent = '⚡ Test Connection';
  }
}

// Explorer Objects
let allExplorerObjects = [];
async function fetchExplorerObjects() {
  explorerItems.innerHTML = '<div class="loading-state">Loading bucket files...</div>';
  try {
    const res = await fetch('/api/objects');
    const data = await res.json();
    if (data.error) {
      explorerItems.innerHTML = `<div style="color:var(--error);padding:1rem;">${data.error}</div>`;
      return;
    }
    allExplorerObjects = data.items || [];
    renderExplorerItems(allExplorerObjects);
  } catch (err) {
    explorerItems.innerHTML = `<div style="color:var(--error);padding:1rem;">Error loading objects: ${err.message}</div>`;
  }
}

function renderExplorerItems(items) {
  if (items.length === 0) {
    explorerItems.innerHTML = '<div style="color:var(--text-muted);padding:1rem;text-align:center;">No files found in bucket.</div>';
    return;
  }

  explorerItems.innerHTML = '';
  items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'result-row';
    const folder = item.key.includes('/') ? item.key.substring(0, item.key.lastIndexOf('/')) : '';

    row.innerHTML = `
      <div class="result-info">
        <img src="${item.url}" class="result-thumb" onerror="this.style.display='none'" />
        <div>
          <div style="font-weight:600;font-size:0.85rem;">${escapeHtml(item.name)}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">${formatBytes(item.size)} • Folder: ${folder || '(root)'}</div>
        </div>
      </div>
      <div style="display:flex;gap:0.4rem;">
        ${folder ? `<button class="btn btn-secondary btn-sm" onclick="selectExplorerFolder('${escapeJs(folder)}')">Use Folder</button>` : ''}
        <button class="btn btn-secondary btn-sm" onclick="copyToClipboard('${escapeJs(item.url)}', 'URL copied!')">📋 Copy</button>
        <a href="${item.url}" target="_blank" class="btn btn-icon btn-sm">↗</a>
      </div>
    `;
    explorerItems.appendChild(row);
  });
}

function filterExplorerItems() {
  const query = explorerFilter.value.trim().toLowerCase();
  if (!query) {
    renderExplorerItems(allExplorerObjects);
    return;
  }
  const filtered = allExplorerObjects.filter(i => 
    i.key.toLowerCase().includes(query) || i.name.toLowerCase().includes(query)
  );
  renderExplorerItems(filtered);
}

window.selectExplorerFolder = function(folder) {
  folderInput.value = folder;
  localStorage.setItem('r2_last_folder', folder);
  updateDestinationPreview();
  updateChipHighlights();
  modalExplorer.style.display = 'none';
  showToast(`Selected destination folder: ${folder}`);
};

// Utilities
window.copyToClipboard = function(text, successMsg = 'Copied!') {
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMsg);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(successMsg);
  });
};

function showToast(msg, isError = false) {
  toastEl.textContent = msg;
  toastEl.style.display = 'block';
  toastEl.style.borderColor = isError ? 'var(--error)' : 'var(--success)';
  setTimeout(() => {
    toastEl.style.display = 'none';
  }, 2800);
}

function formatBytes(bytes, decimals = 1) {
  if (!bytes) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeJs(str) {
  return String(str || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}
