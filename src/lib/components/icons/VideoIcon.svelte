<script lang="ts">
  type Props = {
    class?: string;
    className?: string;
  };
  
  let { class: classAttr = '', className = "w-6 h-6 inline-block align-text-bottom" }: Props = $props();
  
  let finalClass = $derived(classAttr || className);
</script>

<svg viewBox="0 0 24 24" fill="currentColor" class={finalClass} xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="6" width="14" height="12" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
  <path d="M16 10l6-3v10l-6-3z" stroke="currentColor" stroke-width="2" fill="none" stroke-linejoin="round"/>
</svg>
