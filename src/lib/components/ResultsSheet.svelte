<script lang="ts">
  import IconActivity from './icons/ActivityIcon.svelte';
  import IconTrendingUp from './icons/TrendingUpIcon.svelte';
  import IconClock from './icons/ClockIcon.svelte';
  import IconZap from './icons/ZapIcon.svelte';
  import IconAlertCircle from './icons/AlertCircleIcon.svelte';
  import IconCheckCircle from './icons/CheckCircleIcon.svelte';
  import IconArrowRight from './icons/ArrowRightIcon.svelte';
  
  type Props = {
    analysisData?: {
      overallScore: number;
      cadence: number;
      strideLength: number;
      groundContactTime: number;
      verticalOscillation: number;
      recommendations: Array<{
        title: string;
        description: string;
        priority: 'high' | 'medium' | 'low';
      }>;
      strengths: string[];
      gaitPhases: Array<{
        phase: string;
        description: string;
        percentage: number;
      }>;
    };
  };
  
  let { analysisData = {
    overallScore: 82,
    cadence: 168,
    strideLength: 1.32,
    groundContactTime: 248,
    verticalOscillation: 8.2,
    recommendations: [
      {
        title: 'Increase cadence',
        description: 'Aim for 170-180 steps per minute to reduce impact forces and improve efficiency.',
        priority: 'high'
      },
      {
        title: 'Reduce vertical oscillation',
        description: 'Focus on running "lighter" with less up-and-down movement to conserve energy.',
        priority: 'medium'
      },
      {
        title: 'Maintain good posture',
        description: 'Keep your torso upright and engage your core for better form stability.',
        priority: 'low'
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
  } }: Props = $props();
  
  function getScoreColor(score: number): string {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  }
  
  function getScoreLabel(score: number): string {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  }
  
  function getPriorityColor(priority: string): string {
    if (priority === 'high') return 'bg-red-100 text-red-700 border-red-200';
    if (priority === 'medium') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-blue-100 text-blue-700 border-blue-200';
  }
</script>

<div class="w-full bg-white">
  <!-- Overall Score Section -->
  <div class="border-b border-gray-200 p-8">
    <div class="max-w-5xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Your Gait Analysis</h2>
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-500">Overall Score</span>
          <div class={['text-4xl font-bold', getScoreColor(analysisData.overallScore)]}>
            {analysisData.overallScore}
          </div>
          <span class={['text-sm font-medium', getScoreColor(analysisData.overallScore)]}>
            {getScoreLabel(analysisData.overallScore)}
          </span>
        </div>
      </div>
      
      <!-- Key Metrics Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-gray-50 rounded-2xl p-4">
          <div class="flex items-center gap-2 mb-2">
            <IconActivity class="w-4 h-4 text-primary-600" />
            <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Cadence</span>
          </div>
          <div class="text-2xl font-bold text-gray-900">{analysisData.cadence}</div>
          <div class="text-xs text-gray-500">steps/min</div>
        </div>
        
        <div class="bg-gray-50 rounded-2xl p-4">
          <div class="flex items-center gap-2 mb-2">
            <IconTrendingUp class="w-4 h-4 text-primary-600" />
            <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Stride Length</span>
          </div>
          <div class="text-2xl font-bold text-gray-900">{analysisData.strideLength}</div>
          <div class="text-xs text-gray-500">meters</div>
        </div>
        
        <div class="bg-gray-50 rounded-2xl p-4">
          <div class="flex items-center gap-2 mb-2">
            <IconClock class="w-4 h-4 text-primary-600" />
            <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Ground Contact</span>
          </div>
          <div class="text-2xl font-bold text-gray-900">{analysisData.groundContactTime}</div>
          <div class="text-xs text-gray-500">milliseconds</div>
        </div>
        
        <div class="bg-gray-50 rounded-2xl p-4">
          <div class="flex items-center gap-2 mb-2">
            <IconZap class="w-4 h-4 text-primary-600" />
            <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Vertical Osc.</span>
          </div>
          <div class="text-2xl font-bold text-gray-900">{analysisData.verticalOscillation}</div>
          <div class="text-xs text-gray-500">centimeters</div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Recommendations Section -->
  <div class="border-b border-gray-200 p-8">
    <div class="max-w-5xl mx-auto">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Personalized Recommendations</h3>
      <div class="space-y-4">
        {#each analysisData.recommendations as rec}
          <div class="border-2 border-gray-200 rounded-2xl p-6 hover:border-primary-300 transition-colors">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <IconAlertCircle class="w-5 h-5 text-primary-600" />
              </div>
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h4 class="font-semibold text-gray-900">{rec.title}</h4>
                  <span class={['text-xs font-medium px-2 py-1 rounded-full border', getPriorityColor(rec.priority)]}>
                    {rec.priority}
                  </span>
                </div>
                <p class="text-sm text-gray-600">{rec.description}</p>
              </div>
              <IconArrowRight class="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Strengths Section -->
  <div class="border-b border-gray-200 p-8">
    <div class="max-w-5xl mx-auto">
      <h3 class="text-xl font-bold text-gray-900 mb-6">What You're Doing Well</h3>
      <div class="grid md:grid-cols-3 gap-4">
        {#each analysisData.strengths as strength}
          <div class="flex items-start gap-3 bg-green-50 rounded-2xl p-4">
            <IconCheckCircle class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span class="text-sm text-gray-700">{strength}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Gait Phases Section -->
  <div class="p-8">
    <div class="max-w-5xl mx-auto">
      <h3 class="text-xl font-bold text-gray-900 mb-6">Your Gait Story</h3>
      <div class="space-y-4">
        {#each analysisData.gaitPhases as phase}
          <div class="border-2 border-gray-200 rounded-2xl p-6">
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-semibold text-gray-900">{phase.phase}</h4>
              <span class="text-sm font-medium text-primary-600">{phase.percentage}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div 
                class="bg-primary-600 h-2 rounded-full transition-all duration-500"
                style="width: {phase.percentage}%"
              ></div>
            </div>
            <p class="text-sm text-gray-600">{phase.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
