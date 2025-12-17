<script lang="ts">
  import type { Snippet } from 'svelte';

  type Props = {
    variant?: 'primary' | 'black';
    className?: string;
    onclick?: () => void;
    children?: Snippet;
  };
  
  let { variant = 'primary', className = '', onclick, children }: Props = $props();
</script>

<button 
  {onclick}
  class="
    inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform active:scale-95
    {variant === 'primary' ? 'bg-black text-white hover:bg-gray-800' : ''}
    {variant === 'black' ? 'bg-black text-white hover:bg-gray-800' : ''}
    {className}
  "
>
  {@render children?.()}
</button>
