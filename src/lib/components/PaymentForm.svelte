<script lang="ts">
  import IconCreditCard from './icons/CreditCardIcon.svelte';
  import IconCheck from './icons/CheckIcon.svelte';
  import IconLock from './icons/LockIcon.svelte';
  import Button from './Button.svelte';
  
  type Props = {
    onPaymentComplete?: () => void;
  };
  
  let { onPaymentComplete }: Props = $props();
  
  let isProcessing = $state(false);
  let cardNumber = $state('');
  let expiryDate = $state('');
  let cvc = $state('');
  
  function formatCardNumber(value: string) {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(' ');
  }
  
  function handleCardNumberInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const value = input.value.replace(/\s/g, '');
    if (value.length <= 16) {
      cardNumber = formatCardNumber(value);
    }
  }
  
  function handleExpiryInput(e: Event) {
    const input = e.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    expiryDate = value;
  }
  
  function handleSubmit(e: Event) {
    e.preventDefault();
    isProcessing = true;
    
    // Simulate Stripe payment processing
    setTimeout(() => {
      isProcessing = false;
      if (onPaymentComplete) {
        onPaymentComplete();
      }
    }, 2000);
  }
</script>

<div class="w-full max-w-md mx-auto">
  <div class="bg-white rounded-3xl border-2 border-gray-200 p-8">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">
        Complete your purchase
      </h2>
      <p class="text-sm text-gray-500">
        One-time analysis for instant gait insights
      </p>
    </div>
    
    <!-- Pricing -->
    <div class="bg-gray-50 rounded-2xl p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="font-semibold text-gray-900">Gait Analysis</h3>
          <p class="text-xs text-gray-500">Single video analysis</p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-gray-900">$29</div>
        </div>
      </div>
      
      <div class="space-y-2 pt-4 border-t border-gray-200">
        <div class="flex items-center gap-2 text-sm text-gray-600">
          <IconCheck class="w-4 h-4 text-primary-600" />
          <span>Complete biomechanical analysis</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-600">
          <IconCheck class="w-4 h-4 text-primary-600" />
          <span>Personalized recommendations</span>
        </div>
        <div class="flex items-center gap-2 text-sm text-gray-600">
          <IconCheck class="w-4 h-4 text-primary-600" />
          <span>Visual gait breakdown</span>
        </div>
      </div>
    </div>
    
    <!-- Payment Form -->
    <form onsubmit={handleSubmit} class="space-y-4">
      <div class="space-y-2">
        <label for="card-number" class="text-sm font-medium text-gray-700">
          Card number
        </label>
        <div class="relative">
          <div class="absolute left-4 top-1/2 -translate-y-1/2">
            <IconCreditCard class="w-5 h-5 text-gray-400" />
          </div>
          <input
            id="card-number"
            type="text"
            bind:value={cardNumber}
            oninput={handleCardNumberInput}
            required
            class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
            placeholder="1234 5678 9012 3456"
            maxlength="19"
          />
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <label for="expiry" class="text-sm font-medium text-gray-700">
            Expiry date
          </label>
          <input
            id="expiry"
            type="text"
            bind:value={expiryDate}
            oninput={handleExpiryInput}
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
            placeholder="MM/YY"
            maxlength="5"
          />
        </div>
        
        <div class="space-y-2">
          <label for="cvc" class="text-sm font-medium text-gray-700">
            CVC
          </label>
          <input
            id="cvc"
            type="text"
            bind:value={cvc}
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all"
            placeholder="123"
            maxlength="3"
          />
        </div>
      </div>
      
      <Button className="w-full py-3 mt-6">
        {#if isProcessing}
          <span>Processing payment...</span>
        {:else}
          <span>Pay $29</span>
        {/if}
      </Button>
      
      <div class="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
        <IconLock class="w-3 h-3" />
        <span>Secured by Stripe</span>
      </div>
    </form>
  </div>
</div>
