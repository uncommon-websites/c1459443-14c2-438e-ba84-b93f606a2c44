<script lang="ts">
  import IconX from './icons/XIcon.svelte';
  import IconMail from './icons/MailIcon.svelte';
  import IconLock from './icons/LockIcon.svelte';
  import IconUser from './icons/UserIcon.svelte';
  import Button from './Button.svelte';
  
  type Props = {
    isOpen?: boolean;
    onClose?: () => void;
    onAuth?: (email: string, password: string, isSignUp: boolean) => void;
  };
  
  let { isOpen = false, onClose, onAuth }: Props = $props();
  
  let mode = $state<'signin' | 'signup'>('signin');
  let email = $state('');
  let password = $state('');
  let name = $state('');
  let isLoading = $state(false);
  
  function handleSubmit(e: Event) {
    e.preventDefault();
    isLoading = true;
    
    // Simulate auth delay
    setTimeout(() => {
      if (onAuth) {
        onAuth(email, password, mode === 'signup');
      }
      isLoading = false;
    }, 1000);
  }
  
  function toggleMode() {
    mode = mode === 'signin' ? 'signup' : 'signin';
    email = '';
    password = '';
    name = '';
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div 
      role="button"
      tabindex="0"
      class="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onclick={onClose}
      onkeydown={(e) => e.key === 'Escape' && onClose?.()}
    ></div>
    
    <!-- Modal -->
    <div class="relative w-full max-w-md bg-white rounded-3xl p-8 animate-in fade-in zoom-in-95 duration-200">
      <button
        class="absolute top-6 right-6 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
        onclick={onClose}
      >
        <IconX class="w-5 h-5 text-gray-600" />
      </button>
      
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          {mode === 'signin' ? 'Welcome back' : 'Create your account'}
        </h2>
        <p class="text-sm text-gray-500">
          {mode === 'signin' 
            ? 'Sign in to continue your gait analysis' 
            : 'Get started with your first analysis'}
        </p>
      </div>
      
      <form onsubmit={handleSubmit} class="space-y-4">
        {#if mode === 'signup'}
          <div class="space-y-2">
            <label for="name" class="text-sm font-medium text-gray-700">
              Full name
            </label>
            <div class="relative">
              <div class="absolute left-4 top-1/2 -translate-y-1/2">
                <IconUser class="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                bind:value={name}
                required
                class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>
          </div>
        {/if}
        
        <div class="space-y-2">
          <label for="email" class="text-sm font-medium text-gray-700">
            Email
          </label>
          <div class="relative">
            <div class="absolute left-4 top-1/2 -translate-y-1/2">
              <IconMail class="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              bind:value={email}
              required
              class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
              placeholder="you@example.com"
            />
          </div>
        </div>
        
        <div class="space-y-2">
          <label for="password" class="text-sm font-medium text-gray-700">
            Password
          </label>
          <div class="relative">
            <div class="absolute left-4 top-1/2 -translate-y-1/2">
              <IconLock class="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              bind:value={password}
              required
              class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>
        
        <Button className="w-full py-3 mt-6">
          {#if isLoading}
            <span>Processing...</span>
          {:else}
            <span>{mode === 'signin' ? 'Sign in' : 'Create account'}</span>
          {/if}
        </Button>
      </form>
      
      <div class="mt-6 text-center">
        <button
          type="button"
          class="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          onclick={toggleMode}
        >
          {mode === 'signin' 
            ? "Don't have an account? Sign up" 
            : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  </div>
{/if}
