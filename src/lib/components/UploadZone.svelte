<script lang="ts">
  import IconUpload from './icons/UploadIcon.svelte';
  import IconVideo from './icons/VideoIcon.svelte';
  import IconX from './icons/XIcon.svelte';
  
  type Props = {
    onUpload?: (file: File) => void;
  };
  
  let { onUpload }: Props = $props();
  
  let isDragging = $state(false);
  let selectedFile = $state<File | null>(null);
  let videoPreview = $state<string | null>(null);
  
  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    isDragging = true;
  }
  
  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
  }
  
  function handleDrop(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
    
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  }
  
  function handleFileInput(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      handleFileSelection(input.files[0]);
    }
  }
  
  function handleFileSelection(file: File) {
    if (file.type.startsWith('video/')) {
      selectedFile = file;
      videoPreview = URL.createObjectURL(file);
      if (onUpload) {
        onUpload(file);
      }
    }
  }
  
  function clearSelection() {
    selectedFile = null;
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
      videoPreview = null;
    }
  }
</script>

<div class="w-full max-w-2xl mx-auto">
  {#if !selectedFile}
    <div
      role="button"
      tabindex="0"
      class={[
        'relative border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer',
        isDragging ? 'border-primary-600 bg-primary-50' : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
      ]}
      ondragover={handleDragOver}
      ondragleave={handleDragLeave}
      ondrop={handleDrop}
      onclick={() => document.getElementById('file-input')?.click()}
      onkeydown={(e) => e.key === 'Enter' && document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept="video/*"
        class="hidden"
        onchange={handleFileInput}
      />
      
      <div class="flex flex-col items-center gap-4">
        <div class="w-16 h-16 rounded-full bg-white flex items-center justify-center">
          <IconUpload class="w-8 h-8 text-primary-600" />
        </div>
        
        <div class="space-y-2">
          <h3 class="text-xl font-semibold text-gray-900">
            Upload your running video
          </h3>
          <p class="text-sm text-gray-500">
            Drag and drop or click to browse
          </p>
        </div>
        
        <div class="flex items-center gap-2 text-xs text-gray-400">
          <IconVideo class="w-4 h-4" />
          <span>MP4, MOV, or AVI • Side view recommended</span>
        </div>
      </div>
    </div>
  {:else}
    <div class="relative border-2 border-gray-200 rounded-3xl overflow-hidden bg-black">
      <button
        class="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
        onclick={clearSelection}
      >
        <IconX class="w-5 h-5 text-gray-900" />
      </button>
      
      {#if videoPreview}
        <video
          src={videoPreview}
          class="w-full h-auto"
          controls
        >
          <track kind="captions" />
        </video>
      {/if}
      
      <div class="p-4 bg-white border-t border-gray-200">
        <div class="flex items-center gap-3">
          <IconVideo class="w-5 h-5 text-primary-600" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {selectedFile.name}
            </p>
            <p class="text-xs text-gray-500">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
