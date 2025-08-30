import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CircuitBoardIcon,
  Command,
  CreditCard,
  File,
  FileText,
  GlobeIcon,
  HelpCircle,
  Image,
  Laptop,
  LayoutDashboardIcon,
  Loader2,
  LogIn,
  LucideIcon,
  LucideProps,
  LucideShoppingBag,
  Moon,
  MoreVertical,
  PackageIcon,
  Pizza,
  Plus,
  Settings,
  Store,
  SunMedium,
  SVGAttributes,
  TagIcon,
  Trash,
  Truck,
  Twitter,
  User,
  UserCircle2Icon,
  UserPen,
  UserX2Icon,
  X
} from 'lucide-react';
import React from 'react';

export type Icon = LucideIcon;

const HexagonIcon = React.forwardRef<SVGElement, SVGAttributes>(
  ({ className, ...props }) => (
    <svg
      width='800'
      height='800'
      viewBox='0 0 14 14'
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M7 1 1.796 4v6L7 13l5.204-3V4zm2.571 7.53L7 10.03l-2.571-1.5V5.562L7 4.061l2.571 1.5z' />
    </svg>
  )
);
HexagonIcon.displayName = 'HexagonIcon';

const CategoryIcon = React.forwardRef<SVGElement, SVGAttributes>(
  ({ className, ...props }) => (
    <svg
      width='800px'
      height='800px'
      viewBox='0 0 48 48'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>category</title>
      <g id='Layer_2' data-name='Layer 2'>
        <g id='invisible_box' data-name='invisible box'>
          <rect width='48' height='48' fill='none' />
        </g>
        <g id='icons_Q2' data-name='icons Q2'>
          <path d='M24,7.7,29.3,16H18.6L24,7.7M24,2a2.1,2.1,0,0,0-1.7,1L13.2,17a2.3,2.3,0,0,0,0,2,1.9,1.9,0,0,0,1.7,1H33a2.1,2.1,0,0,0,1.7-1,1.8,1.8,0,0,0,0-2l-9-14A1.9,1.9,0,0,0,24,2Z' />
          <path d='M43,43H29a2,2,0,0,1-2-2V27a2,2,0,0,1,2-2H43a2,2,0,0,1,2,2V41A2,2,0,0,1,43,43ZM31,39H41V29H31Z' />
          <path d='M13,28a6,6,0,1,1-6,6,6,6,0,0,1,6-6m0-4A10,10,0,1,0,23,34,10,10,0,0,0,13,24Z' />
        </g>
      </g>
    </svg>
  )
);
CategoryIcon.displayName = 'CategoryIcon';

const RedisIcon = React.forwardRef<SVGElement, SVGAttributes>(
  ({ className, ...props }) => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 32 32'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M31.99 19.12c-.01.307-.417.646-1.245 1.078-1.708.891-10.552 4.531-12.438 5.51-1.885.984-2.927.974-4.417.26-1.49-.708-10.901-4.516-12.599-5.323-.844-.406-1.276-.745-1.292-1.068v3.234c0 .323.448.661 1.292 1.068 1.698.813 11.115 4.615 12.599 5.323 1.49.714 2.531.724 4.417-.26 1.885-.979 10.729-4.62 12.438-5.51.87-.448 1.255-.802 1.255-1.12v-3.188q-.001-.006-.01-.005zm0-5.271c-.016.302-.417.641-1.245 1.078-1.708.885-10.552 4.526-12.438 5.505-1.885.984-2.927.974-4.417.266-1.49-.714-10.901-4.516-12.599-5.328-.844-.401-1.276-.745-1.292-1.068v3.234c0 .323.448.667 1.292 1.068 1.698.813 11.109 4.615 12.599 5.328 1.49.708 2.531.719 4.417-.26 1.885-.984 10.729-4.62 12.438-5.51.87-.453 1.255-.807 1.255-1.125v-3.188zm0-5.474c.016-.323-.406-.609-1.266-.922-1.661-.609-10.458-4.109-12.141-4.729-1.682-.615-2.37-.589-4.349.12-1.979.714-11.339 4.385-13.005 5.036-.833.328-1.24.63-1.224.953v3.234c0 .323.443.661 1.292 1.068 1.693.813 11.109 4.615 12.599 5.328 1.484.708 2.531.719 4.417-.266 1.88-.979 10.729-4.62 12.438-5.505.865-.453 1.25-.807 1.25-1.125V8.374zm-20.532 3.063 7.417-1.135-2.24 3.281zm16.401-2.959L23 10.401l-4.385-1.734 4.854-1.917zM14.984 5.302l-.719-1.323 2.24.875 2.109-.688-.573 1.365 2.151.807-2.771.286-.625 1.495-1-1.667-3.203-.286zm-5.526 1.87c2.193 0 3.964.688 3.964 1.531 0 .849-1.776 1.536-3.964 1.536s-3.964-.688-3.964-1.536c0-.844 1.776-1.531 3.964-1.531' />
    </svg>
  )
);

RedisIcon.displayName = 'RedisIcon';

export const Icons = {
  redis: RedisIcon,
  truck: Truck,
  shop: Store,
  tag: TagIcon,
  globe: GlobeIcon,
  package: PackageIcon,
  dashboard: LayoutDashboardIcon,
  hexagon: HexagonIcon,
  category: CategoryIcon,
  logo: Command,
  login: LogIn,
  close: X,
  product: LucideShoppingBag,
  spinner: Loader2,
  kanban: CircuitBoardIcon,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  employee: UserX2Icon,
  post: FileText,
  page: File,
  userPen: UserPen,
  user2: UserCircle2Icon,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  gitHub: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden='true'
      focusable='false'
      data-prefix='fab'
      data-icon='github'
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 496 512'
      {...props}
    >
      <path
        fill='currentColor'
        d='M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z'
      ></path>
    </svg>
  ),
  twitter: Twitter,
  check: Check
};
