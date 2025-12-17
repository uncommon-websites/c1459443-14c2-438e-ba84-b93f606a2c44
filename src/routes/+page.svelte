<script lang="ts">
  import { goto } from '$app/navigation';
  import Header from '$lib/components/Header.svelte';
  import Button from '$lib/components/Button.svelte';
  import VideoIcon from '$lib/components/icons/VideoIcon.svelte';
  import RunningShoeIcon from '$lib/components/icons/RunningShoeIcon.svelte';
  import ChartIcon from '$lib/components/icons/ChartIcon.svelte';
  import Laurel from '$lib/components/icons/Laurel.svelte';
  import PhoneUI from '$lib/components/PhoneUI.svelte';
  import UploadZone from '$lib/components/UploadZone.svelte';
  import AuthModal from '$lib/components/AuthModal.svelte';
  import PaymentForm from '$lib/components/PaymentForm.svelte';
  import IconX from '$lib/components/icons/XIcon.svelte';
  import IconArrowLeft from '$lib/components/icons/ArrowLeftIcon.svelte';
  import IconLoader from '$lib/components/icons/LoaderIcon.svelte';
  
  type FlowStep = 'landing' | 'upload' | 'auth' | 'payment' | 'processing';
  
  let currentStep = $state<FlowStep>('landing');
  let uploadedFile = $state<File | null>(null);
  let isAuthenticated = $state(false);
  let userEmail = $state('');
  
  function startFlow() {
    currentStep = 'upload';
  }
  
  function handleUpload(file: File) {
    uploadedFile = file;
    // Check if user is authenticated
    if (!isAuthenticated) {
      currentStep = 'auth';
    } else {
      currentStep = 'payment';
    }
  }
  
  function handleAuth(email: string, password: string, isSignUp: boolean) {
    // In production, this would call your auth API
    isAuthenticated = true;
    userEmail = email;
    currentStep = 'payment';
  }
  
  function handlePaymentComplete() {
    currentStep = 'processing';
    
    // Simulate video processing
    setTimeout(() => {
      // Generate a random analysis ID
      const analysisId = Math.random().toString(36).substring(7);
      goto(`/analysis/${analysisId}`);
    }, 3000);
  }
  
  function goBack() {
    if (currentStep === 'upload') {
      currentStep = 'landing';
      uploadedFile = null;
    } else if (currentStep === 'auth') {
      currentStep = 'upload';
    } else if (currentStep === 'payment') {
      currentStep = isAuthenticated ? 'upload' : 'auth';
    }
  }
  
  function resetFlow() {
    currentStep = 'landing';
    uploadedFile = null;
  }
</script>

<div class="min-h-screen bg-white text-black font-sans selection:bg-gray-200">
  <Header />

  <main class="flex flex-col items-center w-full">
    {#if currentStep === 'landing'}
      <!-- Hero Section -->
      <section class="flex flex-col items-center text-center pt-10 pb-12 px-4 max-w-4xl mx-auto">
        <h2 class="text-sm font-semibold mb-6 text-primary-600">AI-Powered Gait Analysis</h2>
        
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-10">
          <div class="flex flex-wrap justify-center items-center gap-x-3 gap-y-2">
            <span>Turn</span>
            <span class="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-2xl align-middle mx-1">
              <VideoIcon className="w-6 h-6 md:w-8 md:h-8" />
            </span>
            <span>phone</span>
          </div>
          <div class="flex flex-wrap justify-center items-center gap-x-3 gap-y-2">
            <span>videos into</span>
            <span class="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-2xl align-middle mx-1">
              <RunningShoeIcon className="w-6 h-6 md:w-8 md:h-8" />
            </span>
            <span>running</span>
          </div>
          <div class="flex flex-wrap justify-center items-center gap-x-3 gap-y-2">
            <span class="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-2xl align-middle mx-1">
              <ChartIcon className="w-6 h-6 md:w-8 md:h-8" />
            </span>
            <span>insights</span>
          </div>
        </h1>

        <div class="mb-12">
          <Button onclick={startFlow}>
            <span class="text-base">Try Gaitor Free</span>
          </Button>
        </div>

        <!-- Social Proof -->
        <div class="flex flex-wrap justify-center gap-8 md:gap-16 text-gray-400 text-[10px] md:text-xs font-medium uppercase tracking-widest">
          <div class="flex items-center gap-2">
            <Laurel className="w-6 h-12 md:w-8 md:h-16 scale-x-[-1]" />
            <div class="flex flex-col items-center leading-tight">
              <span class="text-[8px] md:text-[10px] text-gray-300 mb-0.5">Trusted by</span>
              <span class="font-bold text-gray-300">10K+ Runners</span>
            </div>
            <Laurel className="w-6 h-12 md:w-8 md:h-16" />
          </div>
          <div class="flex items-center gap-2">
            <Laurel className="w-6 h-12 md:w-8 md:h-16 scale-x-[-1]" />
            <div class="flex flex-col items-center leading-tight">
              <span class="text-[8px] md:text-[10px] text-gray-300 mb-0.5">Popular in</span>
              <span class="font-bold text-gray-300">Strava Clubs</span>
            </div>
            <Laurel className="w-6 h-12 md:w-8 md:h-16" />
          </div>
        </div>
      </section>

      <!-- Phone Showcase -->
      <section class="w-full max-w-[1000px] px-4 mb-24 relative flex justify-center">
        <!-- Background glow/shadow simulation -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-100/50 rounded-full blur-3xl -z-10"></div>
        
        <!-- Phone Container -->
        <div class="relative w-[300px] md:w-[340px] h-[680px] md:h-[720px] transition-transform hover:scale-[1.02] duration-500">
          <PhoneUI />
        </div>
      </section>

      <!-- Features Text -->
      <section class="max-w-4xl mx-auto px-6 pb-32 space-y-24 text-center">
        <div class="space-y-6">
          <h3 class="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Professional gait analysis from a simple side-view video. No expensive lab visits or specialized equipment needed.
          </h3>
        </div>

        <div class="space-y-6">
          <h3 class="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Get your form score, key running metrics, and personalized recommendations — all explained in plain English.
          </h3>
        </div>

        <div class="space-y-10">
          <h3 class="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Built for recreational runners who want to improve their form, prevent injuries, and run more efficiently.
          </h3>
          
          <div class="pt-4">
            <Button onclick={startFlow}>
              <span class="text-base">Start Your Analysis</span>
            </Button>
          </div>
        </div>
      </section>
    {:else if currentStep === 'upload'}
      <!-- Upload Flow -->
      <section class="w-full max-w-4xl mx-auto px-4 py-16">
        <div class="mb-8 flex items-center justify-between">
          <button
            onclick={goBack}
            class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <IconArrowLeft class="w-5 h-5" />
            <span class="font-medium">Back</span>
          </button>
          
          <button
            onclick={resetFlow}
            class="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <IconX class="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Upload your running video
          </h2>
          <p class="text-gray-600">
            Record yourself running from the side for best results
          </p>
        </div>
        
        <UploadZone onUpload={handleUpload} />
      </section>
    {:else if currentStep === 'payment'}
      <!-- Payment Flow -->
      <section class="w-full max-w-4xl mx-auto px-4 py-16">
        <div class="mb-8 flex items-center justify-between">
          <button
            onclick={goBack}
            class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <IconArrowLeft class="w-5 h-5" />
            <span class="font-medium">Back</span>
          </button>
          
          <button
            onclick={resetFlow}
            class="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <IconX class="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <PaymentForm onPaymentComplete={handlePaymentComplete} />
      </section>
    {:else if currentStep === 'processing'}
      <!-- Processing State -->
      <section class="w-full max-w-4xl mx-auto px-4 py-32 text-center">
        <div class="flex flex-col items-center gap-6">
          <div class="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
            <IconLoader class="w-8 h-8 text-primary-600 animate-spin" />
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">
              Analyzing your gait
            </h2>
            <p class="text-gray-600">
              This will take just a moment...
            </p>
          </div>
        </div>
      </section>
    {/if}
    
    <!-- Auth Modal -->
    <AuthModal 
      isOpen={currentStep === 'auth'} 
      onClose={goBack}
      onAuth={handleAuth}
    />

    <!-- Footer -->
    <footer class="w-full py-12 flex flex-col items-center gap-6 text-center border-t border-gray-100 mt-auto">
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.2566 21.954C17.929 21.954 22.5274 17.484 22.5274 11.9699C22.5274 6.45586 17.929 1.98584 12.2566 1.98584C6.58422 1.98584 1.98584 6.45586 1.98584 11.9699C1.98584 17.484 6.58422 21.954 12.2566 21.954ZM15.4608 6.63684C15.6167 6.09831 15.0791 5.77985 14.5881 6.1199L7.73395 10.8665C7.20146 11.2352 7.28522 11.9699 7.85977 11.9699H9.66465V11.9563H13.1823L10.3161 12.9394L9.05251 17.303C8.89655 17.8415 9.43412 18.16 9.92517 17.8199L16.7793 13.0734C17.3118 12.7046 17.228 11.9699 16.6535 11.9699H13.9165L15.4608 6.63684Z"
            fill="currentColor"
          />
        </svg>
        <div class="font-bold text-xl tracking-tight text-gray-200">Gaitor</div>
      </div>
      <div class="flex flex-wrap justify-center gap-4 text-xs text-gray-400 font-medium">
        <a href="#" class="hover:text-black transition-colors">Get Started</a>
        <span>•</span>
        <a href="#" class="hover:text-black transition-colors">Contact</a>
        <span>•</span>
        <a href="#" class="hover:text-black transition-colors">Strava Community</a>
        <span>•</span>
        <a href="#" class="hover:text-black transition-colors">Privacy Policy</a>
      </div>
      <div class="text-[10px] text-gray-300">
        Making biomechanical insights accessible to every runner
      </div>
    </footer>
  </main>
</div>


