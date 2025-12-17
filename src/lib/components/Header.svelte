<script lang="ts">
  import Button from './Button.svelte';
</script>

<header class="w-full max-w-[1200px] mx-auto px-6 py-6 flex items-center justify-between">
  <div class="flex items-center gap-2">
    <svg class="w-6 h-6 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.2566 21.954C17.929 21.954 22.5274 17.484 22.5274 11.9699C22.5274 6.45586 17.929 1.98584 12.2566 1.98584C6.58422 1.98584 1.98584 6.45586 1.98584 11.9699C1.98584 17.484 6.58422 21.954 12.2566 21.954ZM15.4608 6.63684C15.6167 6.09831 15.0791 5.77985 14.5881 6.1199L7.73395 10.8665C7.20146 11.2352 7.28522 11.9699 7.85977 11.9699H9.66465V11.9563H13.1823L10.3161 12.9394L9.05251 17.303C8.89655 17.8415 9.43412 18.16 9.92517 17.8199L16.7793 13.0734C17.3118 12.7046 17.228 11.9699 16.6535 11.9699H13.9165L15.4608 6.63684Z"
        fill="currentColor"
      />
    </svg>
    <div class="font-bold text-xl tracking-tight">Gaitor</div>
  </div>
  <Button>
    <span>Get Started</span>
  </Button>
</header>
