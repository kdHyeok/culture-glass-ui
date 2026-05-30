import React from 'react';
import { Check, ExternalLink, Info, Settings } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Avatar, AvatarFallback } from './components/ui/avatar';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Checkbox } from './components/ui/checkbox';
import { Input } from './components/ui/input';
import { Progress } from './components/ui/progress';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Separator } from './components/ui/separator';
import { Skeleton } from './components/ui/skeleton';
import { Slider } from './components/ui/slider';
import { Switch } from './components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Textarea } from './components/ui/textarea';
import { SplashScreen } from './components/SplashScreen';

export type ComponentCategory =
  | 'app'
  | 'utility'
  | 'ui'
  | 'layout'
  | 'feedback'
  | 'form'
  | 'navigation'
  | 'overlay'
  | 'data'
  | 'internal';

export type ComponentInventoryItem = {
  name: string;
  category: ComponentCategory;
  path: string;
  group: string;
  status: 'ready' | 'needs-preview' | 'internal';
  notes: string;
  preview?: () => React.ReactNode;
};

export const componentInventory: ComponentInventoryItem[] = [
  {
    name: 'BottomNav',
    category: 'app',
    path: 'src/app/components/BottomNav.tsx',
    group: 'App Navigation',
    status: 'needs-preview',
    notes: 'Main mobile tab navigation. Preview it inside routed app states.',
  },
  {
    name: 'SharedMicWaveform',
    category: 'app',
    path: 'src/app/components/SharedMicWaveform.tsx',
    group: 'App Navigation',
    status: 'needs-preview',
    notes: 'Shared microphone waveform indicator used by bottom navigation and bottom-sheet surfaces.',
  },
  {
    name: 'ProfileSetupSheet',
    category: 'app',
    path: 'src/app/components/settings/ProfileSetupSheet.tsx',
    group: 'Settings',
    status: 'needs-preview',
    notes: 'Bottom-sheet editor for onboarding-backed profile preferences such as language, birth date, gender, and interests.',
  },
  {
    name: 'DeviceConnectionSheet',
    category: 'app',
    path: 'src/app/components/settings/DeviceConnectionSheet.tsx',
    group: 'Settings',
    status: 'needs-preview',
    notes: 'Bottom-sheet device connection flow used by Settings device preferences.',
  },
  {
    name: 'BirthDateFields',
    category: 'app',
    path: 'src/app/components/profile/BirthDateFields.tsx',
    group: 'Profile',
    status: 'needs-preview',
    notes: 'Reusable year, month, and day selectors shared by onboarding and profile settings.',
  },
  {
    name: 'SplashScreen',
    category: 'app',
    path: 'src/app/components/SplashScreen.tsx',
    group: 'App Startup',
    status: 'ready',
    notes: 'Initial app splash screen using the local logo asset.',
    preview: () => (
      <div className="relative h-[420px] overflow-hidden rounded-md border border-border bg-background">
        <SplashScreen contained />
      </div>
    ),
  },
  {
    name: 'VisitSlideshow',
    category: 'app',
    path: 'src/app/components/diary/VisitSlideshow.tsx',
    group: 'Diary',
    status: 'needs-preview',
    notes: 'Auto-advancing highlight carousel for visited places ranked by viewing time and questions.',
  },
  {
    name: 'VisitGallery',
    category: 'app',
    path: 'src/app/components/diary/VisitGallery.tsx',
    group: 'Diary',
    status: 'needs-preview',
    notes: 'Date-grouped square photo album grid used by the diary screen.',
  },
  {
    name: 'VisitDetailSheet',
    category: 'app',
    path: 'src/app/components/diary/VisitDetailSheet.tsx',
    group: 'Diary',
    status: 'needs-preview',
    notes: 'Bottom-sheet detail surface for a visited place, opened within the diary screen.',
  },
  {
    name: 'TimeScrollScrubber',
    category: 'app',
    path: 'src/app/components/diary/TimeScrollScrubber.tsx',
    group: 'Diary',
    status: 'needs-preview',
    notes: 'Touch-friendly right-side timeline scrubber that appears while scrolling or dragging.',
  },
  {
    name: 'MiniVisitMap',
    category: 'app',
    path: 'src/app/components/diary/MiniVisitMap.tsx',
    group: 'Diary',
    status: 'needs-preview',
    notes: 'Compact map preview on diary detail screens that deep-links to the full map tab.',
  },
  {
    name: 'ImageWithFallback',
    category: 'utility',
    path: 'src/app/components/figma/ImageWithFallback.tsx',
    group: 'Media',
    status: 'needs-preview',
    notes: 'Image wrapper used by imported source screens.',
  },
  {
    name: 'Accordion',
    category: 'ui',
    path: 'src/app/components/ui/accordion.tsx',
    group: 'Disclosure',
    status: 'needs-preview',
    notes: 'Expandable stacked content.',
  },
  {
    name: 'Alert',
    category: 'feedback',
    path: 'src/app/components/ui/alert.tsx',
    group: 'Feedback',
    status: 'ready',
    notes: 'Inline message surface for status and guidance.',
    preview: () => (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Scan ready</AlertTitle>
        <AlertDescription>Guide content can be generated from the current view.</AlertDescription>
      </Alert>
    ),
  },
  {
    name: 'AlertDialog',
    category: 'overlay',
    path: 'src/app/components/ui/alert-dialog.tsx',
    group: 'Dialogs',
    status: 'needs-preview',
    notes: 'Confirmation and destructive action dialog.',
  },
  {
    name: 'AspectRatio',
    category: 'layout',
    path: 'src/app/components/ui/aspect-ratio.tsx',
    group: 'Layout',
    status: 'needs-preview',
    notes: 'Fixed-ratio media or preview frame.',
  },
  {
    name: 'Avatar',
    category: 'ui',
    path: 'src/app/components/ui/avatar.tsx',
    group: 'Identity',
    status: 'ready',
    notes: 'Compact person or profile representation.',
    preview: () => (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>CG</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-medium">Culture Glass</div>
          <div className="text-xs text-muted-foreground">Guide profile</div>
        </div>
      </div>
    ),
  },
  {
    name: 'Badge',
    category: 'ui',
    path: 'src/app/components/ui/badge.tsx',
    group: 'Badges',
    status: 'ready',
    notes: 'Small status, tag, or metadata label.',
    preview: () => (
      <div className="flex flex-wrap gap-2">
        <Badge>Ready</Badge>
        <Badge variant="secondary">Draft</Badge>
        <Badge variant="outline">Local</Badge>
      </div>
    ),
  },
  {
    name: 'Breadcrumb',
    category: 'navigation',
    path: 'src/app/components/ui/breadcrumb.tsx',
    group: 'Navigation',
    status: 'needs-preview',
    notes: 'Hierarchy navigation for deeper flows.',
  },
  {
    name: 'Button',
    category: 'ui',
    path: 'src/app/components/ui/button.tsx',
    group: 'Buttons',
    status: 'ready',
    notes: 'Primary command component with variants and sizes.',
    preview: () => (
      <div className="flex flex-wrap gap-2">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button size="icon" aria-label="Settings">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
  {
    name: 'Calendar',
    category: 'form',
    path: 'src/app/components/ui/calendar.tsx',
    group: 'Date And Time',
    status: 'needs-preview',
    notes: 'Date picker calendar surface.',
  },
  {
    name: 'Card',
    category: 'layout',
    path: 'src/app/components/ui/card.tsx',
    group: 'Surfaces',
    status: 'ready',
    notes: 'Reusable framed content surface.',
    preview: () => (
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>Guide card</CardTitle>
          <CardDescription>Reusable content surface.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">Use this for repeated compact content groups.</div>
        </CardContent>
      </Card>
    ),
  },
  {
    name: 'Carousel',
    category: 'layout',
    path: 'src/app/components/ui/carousel.tsx',
    group: 'Media',
    status: 'needs-preview',
    notes: 'Horizontal content browsing.',
  },
  {
    name: 'Chart',
    category: 'data',
    path: 'src/app/components/ui/chart.tsx',
    group: 'Data Display',
    status: 'needs-preview',
    notes: 'Chart container and tooltip helpers.',
  },
  {
    name: 'Checkbox',
    category: 'form',
    path: 'src/app/components/ui/checkbox.tsx',
    group: 'Form Controls',
    status: 'ready',
    notes: 'Binary selection control.',
    preview: () => (
      <label className="flex items-center gap-3 text-sm">
        <Checkbox defaultChecked />
        Save guide transcript
      </label>
    ),
  },
  {
    name: 'Collapsible',
    category: 'ui',
    path: 'src/app/components/ui/collapsible.tsx',
    group: 'Disclosure',
    status: 'needs-preview',
    notes: 'Simple expandable area.',
  },
  {
    name: 'Command',
    category: 'navigation',
    path: 'src/app/components/ui/command.tsx',
    group: 'Command Menu',
    status: 'needs-preview',
    notes: 'Command palette primitives.',
  },
  {
    name: 'ContextMenu',
    category: 'overlay',
    path: 'src/app/components/ui/context-menu.tsx',
    group: 'Menus',
    status: 'needs-preview',
    notes: 'Right-click contextual actions.',
  },
  {
    name: 'Dialog',
    category: 'overlay',
    path: 'src/app/components/ui/dialog.tsx',
    group: 'Dialogs',
    status: 'needs-preview',
    notes: 'Modal dialog shell.',
  },
  {
    name: 'Drawer',
    category: 'overlay',
    path: 'src/app/components/ui/drawer.tsx',
    group: 'Drawers',
    status: 'needs-preview',
    notes: 'Slide-in mobile drawer pattern.',
  },
  {
    name: 'DropdownMenu',
    category: 'overlay',
    path: 'src/app/components/ui/dropdown-menu.tsx',
    group: 'Menus',
    status: 'needs-preview',
    notes: 'Button-triggered action menu.',
  },
  {
    name: 'Form',
    category: 'form',
    path: 'src/app/components/ui/form.tsx',
    group: 'Forms',
    status: 'internal',
    notes: 'React Hook Form integration helpers.',
  },
  {
    name: 'HoverCard',
    category: 'overlay',
    path: 'src/app/components/ui/hover-card.tsx',
    group: 'Hover Surfaces',
    status: 'needs-preview',
    notes: 'Hover-triggered contextual preview.',
  },
  {
    name: 'Input',
    category: 'form',
    path: 'src/app/components/ui/input.tsx',
    group: 'Form Controls',
    status: 'ready',
    notes: 'Single-line text input.',
    preview: () => <Input placeholder="Search components" />,
  },
  {
    name: 'InputOTP',
    category: 'form',
    path: 'src/app/components/ui/input-otp.tsx',
    group: 'Form Controls',
    status: 'needs-preview',
    notes: 'One-time code input.',
  },
  {
    name: 'Label',
    category: 'form',
    path: 'src/app/components/ui/label.tsx',
    group: 'Form Controls',
    status: 'needs-preview',
    notes: 'Accessible form label.',
  },
  {
    name: 'Menubar',
    category: 'navigation',
    path: 'src/app/components/ui/menubar.tsx',
    group: 'Navigation',
    status: 'needs-preview',
    notes: 'Desktop menu bar pattern.',
  },
  {
    name: 'NavigationMenu',
    category: 'navigation',
    path: 'src/app/components/ui/navigation-menu.tsx',
    group: 'Navigation',
    status: 'needs-preview',
    notes: 'Top-level navigation menu.',
  },
  {
    name: 'Pagination',
    category: 'navigation',
    path: 'src/app/components/ui/pagination.tsx',
    group: 'Navigation',
    status: 'needs-preview',
    notes: 'Paged list navigation.',
  },
  {
    name: 'Popover',
    category: 'overlay',
    path: 'src/app/components/ui/popover.tsx',
    group: 'Popovers',
    status: 'needs-preview',
    notes: 'Anchored floating content.',
  },
  {
    name: 'Progress',
    category: 'feedback',
    path: 'src/app/components/ui/progress.tsx',
    group: 'Feedback',
    status: 'ready',
    notes: 'Linear completion indicator.',
    preview: () => <Progress value={62} />,
  },
  {
    name: 'RadioGroup',
    category: 'form',
    path: 'src/app/components/ui/radio-group.tsx',
    group: 'Form Controls',
    status: 'ready',
    notes: 'Mutually exclusive option group.',
    preview: () => (
      <RadioGroup defaultValue="audio" className="flex gap-4">
        <label className="flex items-center gap-2 text-sm">
          <RadioGroupItem value="audio" />
          Audio
        </label>
        <label className="flex items-center gap-2 text-sm">
          <RadioGroupItem value="text" />
          Text
        </label>
      </RadioGroup>
    ),
  },
  {
    name: 'Resizable',
    category: 'layout',
    path: 'src/app/components/ui/resizable.tsx',
    group: 'Layout',
    status: 'needs-preview',
    notes: 'Resizable panel primitives.',
  },
  {
    name: 'ScrollArea',
    category: 'layout',
    path: 'src/app/components/ui/scroll-area.tsx',
    group: 'Layout',
    status: 'needs-preview',
    notes: 'Styled scroll container.',
  },
  {
    name: 'Select',
    category: 'form',
    path: 'src/app/components/ui/select.tsx',
    group: 'Form Controls',
    status: 'ready',
    notes: 'Single-selection dropdown.',
    preview: () => (
      <Select defaultValue="korean">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="korean">Korean</SelectItem>
          <SelectItem value="english">English</SelectItem>
          <SelectItem value="french">French</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
  {
    name: 'Separator',
    category: 'layout',
    path: 'src/app/components/ui/separator.tsx',
    group: 'Layout',
    status: 'ready',
    notes: 'Horizontal or vertical content divider.',
    preview: () => <Separator />,
  },
  {
    name: 'Sheet',
    category: 'overlay',
    path: 'src/app/components/ui/sheet.tsx',
    group: 'Sheets',
    status: 'needs-preview',
    notes: 'Side sheet overlay.',
  },
  {
    name: 'Sidebar',
    category: 'navigation',
    path: 'src/app/components/ui/sidebar.tsx',
    group: 'Navigation',
    status: 'needs-preview',
    notes: 'Application sidebar structure.',
  },
  {
    name: 'Skeleton',
    category: 'feedback',
    path: 'src/app/components/ui/skeleton.tsx',
    group: 'Feedback',
    status: 'ready',
    notes: 'Loading placeholder.',
    preview: () => (
      <div className="space-y-2">
        <Skeleton className="h-4 w-[220px]" />
        <Skeleton className="h-4 w-[160px]" />
      </div>
    ),
  },
  {
    name: 'Slider',
    category: 'form',
    path: 'src/app/components/ui/slider.tsx',
    group: 'Form Controls',
    status: 'ready',
    notes: 'Continuous numeric input.',
    preview: () => <Slider defaultValue={[45]} max={100} step={1} />,
  },
  {
    name: 'Sonner',
    category: 'feedback',
    path: 'src/app/components/ui/sonner.tsx',
    group: 'Feedback',
    status: 'needs-preview',
    notes: 'Toast notification renderer.',
  },
  {
    name: 'Switch',
    category: 'form',
    path: 'src/app/components/ui/switch.tsx',
    group: 'Form Controls',
    status: 'ready',
    notes: 'On/off setting control.',
    preview: () => (
      <label className="flex items-center gap-3 text-sm">
        <Switch defaultChecked />
        Senior mode
      </label>
    ),
  },
  {
    name: 'Table',
    category: 'data',
    path: 'src/app/components/ui/table.tsx',
    group: 'Data Display',
    status: 'needs-preview',
    notes: 'Structured tabular data.',
  },
  {
    name: 'Tabs',
    category: 'navigation',
    path: 'src/app/components/ui/tabs.tsx',
    group: 'Navigation',
    status: 'ready',
    notes: 'Segmented content navigation.',
    preview: () => (
      <Tabs defaultValue="components" className="w-full">
        <TabsList>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="states">States</TabsTrigger>
        </TabsList>
        <TabsContent value="components" className="text-sm text-muted-foreground">
          Registry-driven component previews.
        </TabsContent>
        <TabsContent value="states" className="text-sm text-muted-foreground">
          Keep reusable states visible before moving them into app screens.
        </TabsContent>
      </Tabs>
    ),
  },
  {
    name: 'Textarea',
    category: 'form',
    path: 'src/app/components/ui/textarea.tsx',
    group: 'Form Controls',
    status: 'ready',
    notes: 'Multi-line text input.',
    preview: () => <Textarea placeholder="Component usage notes" />,
  },
  {
    name: 'Toggle',
    category: 'form',
    path: 'src/app/components/ui/toggle.tsx',
    group: 'Form Controls',
    status: 'needs-preview',
    notes: 'Pressed/unpressed single toggle.',
  },
  {
    name: 'ToggleGroup',
    category: 'form',
    path: 'src/app/components/ui/toggle-group.tsx',
    group: 'Form Controls',
    status: 'needs-preview',
    notes: 'Grouped toggle selection.',
  },
  {
    name: 'Tooltip',
    category: 'overlay',
    path: 'src/app/components/ui/tooltip.tsx',
    group: 'Tooltips',
    status: 'needs-preview',
    notes: 'Hover/focus helper text.',
  },
  {
    name: 'UseMobile',
    category: 'internal',
    path: 'src/app/components/ui/use-mobile.ts',
    group: 'Utilities',
    status: 'internal',
    notes: 'Responsive state hook. No visual component preview needed.',
  },
  {
    name: 'Utils',
    category: 'internal',
    path: 'src/app/components/ui/utils.ts',
    group: 'Utilities',
    status: 'internal',
    notes: 'Shared className utility. No visual component preview needed.',
  },
];

export const catalogSummary = {
  total: componentInventory.length,
  ready: componentInventory.filter((item) => item.status === 'ready').length,
  needsPreview: componentInventory.filter((item) => item.status === 'needs-preview').length,
  internal: componentInventory.filter((item) => item.status === 'internal').length,
  groups: Array.from(new Set(componentInventory.map((item) => item.group))).sort(),
};

export function ComponentStatusBadge({ status }: { status: ComponentInventoryItem['status'] }) {
  if (status === 'ready') {
    return (
      <Badge className="gap-1">
        <Check className="h-3 w-3" />
        Ready
      </Badge>
    );
  }

  if (status === 'internal') {
    return <Badge variant="secondary">Internal</Badge>;
  }

  return (
    <Badge variant="outline" className="gap-1">
      <ExternalLink className="h-3 w-3" />
      Needs preview
    </Badge>
  );
}
