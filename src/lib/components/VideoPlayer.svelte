<script lang="ts">
  import IconPlay from './icons/PlayIcon.svelte';
  import IconPause from './icons/PauseIcon.svelte';
  import IconVolume2 from './icons/VolumeIcon.svelte';
  import IconVolumeX from './icons/VolumeXIcon.svelte';
  import IconMaximize from './icons/MaximizeIcon.svelte';
  
  type Props = {
    src: string;
    title?: string;
  };
  
  let { src, title = 'Running Analysis' }: Props = $props();
  
  let videoElement = $state<HTMLVideoElement | null>(null);
  let isPlaying = $state(false);
  let isMuted = $state(false);
  let currentTime = $state(0);
  let duration = $state(0);
  let showControls = $state(true);
  let controlsTimeout: number;
  
  function togglePlay() {
    if (!videoElement) return;
    
    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    isPlaying = !isPlaying;
  }
  
  function toggleMute() {
    if (!videoElement) return;
    videoElement.muted = !videoElement.muted;
    isMuted = videoElement.muted;
  }
  
  function toggleFullscreen() {
    if (!videoElement) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoElement.requestFullscreen();
    }
  }
  
  function handleTimeUpdate() {
    if (videoElement) {
      currentTime = videoElement.currentTime;
    }
  }
  
  function handleLoadedMetadata() {
    if (videoElement) {
      duration = videoElement.duration;
    }
  }
  
  function handleSeek(e: Event) {
    const input = e.target as HTMLInputElement;
    if (videoElement) {
      videoElement.currentTime = parseFloat(input.value);
    }
  }
  
  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  
  function handleMouseMove() {
    showControls = true;
    clearTimeout(controlsTimeout);
    controlsTimeout = setTimeout(() => {
      if (isPlaying) {
        showControls = false;
      }
    }, 2000);
  }
</script>

<div 
  role="region"
  class="relative w-full bg-black rounded-2xl overflow-hidden group"
  onmousemove={handleMouseMove}
  onmouseleave={() => isPlaying && (showControls = false)}
>
  <video
    bind:this={videoElement}
    {src}
    class="w-full h-auto"
    ontimeupdate={handleTimeUpdate}
    onloadedmetadata={handleLoadedMetadata}
    onclick={togglePlay}
  >
    <track kind="captions" />
  </video>
  
  <!-- Controls Overlay -->
  <div 
    class={[
      'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transition-opacity duration-300',
      showControls ? 'opacity-100' : 'opacity-0'
    ]}
  >
    <!-- Progress Bar -->
    <input
      type="range"
      min="0"
      max={duration || 0}
      value={currentTime}
      oninput={handleSeek}
      class="w-full h-1 mb-4 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
    />
    
    <!-- Controls -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button
          onclick={togglePlay}
          class="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
        >
          {#if isPlaying}
            <IconPause class="w-5 h-5 text-white" />
          {:else}
            <IconPlay class="w-5 h-5 text-white ml-0.5" />
          {/if}
        </button>
        
        <button
          onclick={toggleMute}
          class="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          {#if isMuted}
            <IconVolumeX class="w-4 h-4 text-white" />
          {:else}
            <IconVolume2 class="w-4 h-4 text-white" />
          {/if}
        </button>
        
        <span class="text-sm text-white font-medium">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
      
      <button
        onclick={toggleFullscreen}
        class="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        <IconMaximize class="w-4 h-4 text-white" />
      </button>
    </div>
  </div>
  
  <!-- Play Button Overlay (when paused) -->
  {#if !isPlaying}
    <button
      onclick={togglePlay}
      class="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity hover:bg-black/30"
    >
      <div class="w-20 h-20 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors">
        <IconPlay class="w-10 h-10 text-black ml-1" />
      </div>
    </button>
  {/if}
</div>
