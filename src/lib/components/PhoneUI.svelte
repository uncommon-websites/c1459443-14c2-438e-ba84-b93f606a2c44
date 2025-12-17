<div class="relative bg-black rounded-[3rem] p-3 w-full h-full border-2 border-gray-900">
  <!-- Power Button -->
  <div class="absolute -right-[2px] top-24 w-[2px] h-12 bg-gray-800 rounded-r-md"></div>
  <!-- Volume Buttons -->
  <div class="absolute -left-[2px] top-24 w-[2px] h-8 bg-gray-800 rounded-l-md"></div>
  <div class="absolute -left-[2px] top-36 w-[2px] h-8 bg-gray-800 rounded-l-md"></div>

  <!-- Screen -->
  <div class="bg-white w-full h-full rounded-[2.5rem] overflow-hidden relative flex flex-col">
    <!-- Status Bar / Notch Area -->
    <div class="h-12 w-full flex justify-center items-start pt-2 absolute top-0 left-0 z-20">
      <div class="w-28 h-7 bg-black rounded-full flex items-center justify-center gap-2 px-3">
        <!-- Dynamic Island Content Simulation -->
        <div class="w-full h-full flex items-center justify-between opacity-0">
           <!-- Hidden content just to keep size -->
        </div>
      </div>
    </div>

    <!-- App Content -->
    <div class="flex-1 overflow-y-auto pt-12 px-6 pb-6 text-xs font-medium select-none scrollbar-hide">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6 mt-2">
        <h2 class="text-2xl font-bold tracking-tight">Your Analysis</h2>
        <div class="text-[10px] text-gray-400 font-semibold">Jan 15</div>
      </div>

      <!-- Overall Score -->
      <div class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-5 mb-6">
        <div class="text-[10px] text-primary-700 font-semibold uppercase tracking-wide mb-2">Form Score</div>
        <div class="flex items-baseline gap-2 mb-1">
          <span class="text-4xl font-bold text-primary-900">82</span>
          <span class="text-lg text-primary-600">/100</span>
        </div>
        <div class="text-[11px] text-primary-700 font-medium">Good form with room to improve</div>
      </div>

      <!-- Key Metrics -->
      <div class="mb-6">
        <h3 class="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-3">Key Metrics</h3>
        <div class="space-y-3">
          <!-- Cadence -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 7v5l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <div>
                <div class="text-sm font-semibold text-black">Cadence</div>
                <div class="text-[10px] text-gray-400">Steps per minute</div>
              </div>
            </div>
            <div class="text-sm font-bold text-black">172</div>
          </div>

          <!-- Stride Length -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12h16M16 8l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div>
                <div class="text-sm font-semibold text-black">Stride Length</div>
                <div class="text-[10px] text-gray-400">Average distance</div>
              </div>
            </div>
            <div class="text-sm font-bold text-black">1.2m</div>
          </div>

          <!-- Ground Contact -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 19v-7m0 0l-3 3m3-3l3 3M12 12V5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div>
                <div class="text-sm font-semibold text-black">Ground Contact</div>
                <div class="text-[10px] text-gray-400">Time on ground</div>
              </div>
            </div>
            <div class="text-sm font-bold text-black">245ms</div>
          </div>
        </div>
      </div>

      <!-- Top Recommendation -->
      <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
        <div class="flex items-start gap-3">
          <div class="w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div>
            <div class="text-[11px] font-bold text-gray-900 mb-1">Increase Cadence</div>
            <div class="text-[10px] text-gray-600 leading-relaxed">Try taking shorter, quicker steps. Aim for 180 steps per minute to reduce impact forces.</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Home Indicator -->
    <div class="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-black rounded-full opacity-20"></div>
  </div>
</div>

