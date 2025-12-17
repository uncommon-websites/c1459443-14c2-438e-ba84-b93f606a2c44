<script lang="ts">
  import { page } from '$app/stores';
  import Header from '$lib/components/Header.svelte';
  import VideoPlayer from '$lib/components/VideoPlayer.svelte';
  import ResultsSheet from '$lib/components/ResultsSheet.svelte';
  import Button from '$lib/components/Button.svelte';
  import IconDownload from '$lib/components/icons/DownloadIcon.svelte';
  import IconShare2 from '$lib/components/icons/ShareIcon.svelte';
  
  // Get analysis ID from URL params
  let analysisId = $derived($page.params.id);
  
  // Mock video URL - in production this would come from your backend
  let videoUrl = '/demo-running-video.mp4';
  
  // Mock analysis data - in production this would be fetched based on analysisId
  let analysisData = {
    overallScore: 82,
    cadence: 168,
    strideLength: 1.32,
    groundContactTime: 248,
    verticalOscillation: 8.2,
    recommendations: [
      {
        title: 'Increase cadence',
        description: 'Aim for 170-180 steps per minute to reduce impact forces and improve efficiency.',
        priority: 'high' as const
      },
      {
        title: 'Reduce vertical oscillation',
        description: 'Focus on running "lighter" with less up-and-down movement to conserve energy.',
        priority: 'medium' as const
      },
      {
        title: 'Maintain good posture',
        description: 'Keep your torso upright and engage your core for better form stability.',
        priority: 'low' as const
      }
    ],
    strengths: [
      'Good stride length for your height',
      'Consistent foot strike pattern',
      'Minimal overstriding'
    ],
    gaitPhases: [
      { phase: 'Initial Contact', description: 'Heel strikes ground smoothly', percentage: 15 },
      { phase: 'Loading Response', description: 'Weight transfer is balanced', percentage: 20 },
      { phase: 'Mid Stance', description: 'Good stability through stance phase', percentage: 30 },
      { phase: 'Terminal Stance', description: 'Effective push-off preparation', percentage: 20 },
      { phase: 'Swing Phase', description: 'Efficient leg recovery', percentage: 15 }
    ]
  };
  
  function handleDownload() {
    // In production, generate and download PDF report
    console.log('Downloading analysis report...');
  }
  
  function handleShare() {
    // In production, implement share functionality
    console.log('Sharing analysis...');
  }
</script>

<svelte:head>
  <title>Analysis Results - Gaitor</title>
</svelte:head>

<div class="min-h-screen bg-white text-black font-sans">
  <Header />
  
  <main class="pt-8 pb-16">
    <!-- Video Section -->
    <div class="max-w-5xl mx-auto px-4 mb-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Analysis Complete</h1>
          <p class="text-sm text-gray-500">Analysis ID: {analysisId}</p>
        </div>
        
        <div class="flex items-center gap-3">
          <Button variant="black" className="flex items-center gap-2" onclick={handleShare}>
            <IconShare2 class="w-4 h-4" />
            <span>Share</span>
          </Button>
          <Button variant="black" className="flex items-center gap-2" onclick={handleDownload}>
            <IconDownload class="w-4 h-4" />
            <span>Download Report</span>
          </Button>
        </div>
      </div>
      
      <VideoPlayer src={videoUrl} title="Your Running Analysis" />
    </div>
    
    <!-- Results Sheet -->
    <ResultsSheet {analysisData} />
    
    <!-- CTA Section -->
    <div class="max-w-5xl mx-auto px-4 mt-12">
      <div class="bg-gray-50 rounded-3xl p-8 text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-3">
          Ready to track your progress?
        </h3>
        <p class="text-gray-600 mb-6">
          Upload another video to see how your form improves over time
        </p>
        <Button>
          <span>Analyze Another Video</span>
        </Button>
      </div>
    </div>
  </main>
</div>
