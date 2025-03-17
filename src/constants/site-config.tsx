import { SVGAttributes } from 'lucide-react';
import React from 'react';
import { IUserBase } from 'types/schema/user.schema';

const _siteTitleBase = 'Gadget Nova - Admin';

export const SiteConfig = {
  siteTitle: {
    default: _siteTitleBase,
    signIn: `${_siteTitleBase} | Sign In`,
    dashboard: `${_siteTitleBase} | Dashboard`,
    product: {
      list: `Dashboard | Products`,
      view: `Dashboard | Product View`
    },
    productAttribute: {
      list: `Dashboard | Product Attributes`,
      view: `Dashboard | Product Attribute View`
    },
    brand: {
      list: `Dashboard | Brands`,
      view: `Dashboard | Brand View`
    },
    category: {
      list: `Dashboard | Categories`,
      view: `Dashboard | Category View`
    },
    user: {
      list: `Dashboard | Users`,
      view: `Dashboard | User View`,
      getUserViewTitle: (user: IUserBase) => `Dashboard | ${user.name} Details`
    }
  },
  siteDescription: {
    default: 'Admin Panel for Gadget Nova',
    signIn:
      'Welcome to the Admin panel for Gadget Nova. Please Sign In to continue.'
  },
  featureFlags: {
    disableAuth: true,
    maxFileSize: 5000000,
    acceptedImageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  }
  // TODO: Add more items here
};

const SiteLogo = React.forwardRef<SVGElement, SVGAttributes>(
  ({ className, ...props }, ref) => (
    <svg
      width='1127'
      height='336'
      viewBox='0 0 1127 336'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      {...props}
    >
      <g clipPath='url(#clip0_289_1529)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M148.831 107.012V133.215C148.831 140.874 142.706 147.107 135.121 147.107C127.557 147.107 121.41 140.896 121.41 133.215V107.012C121.41 99.3314 127.557 93.1201 135.121 93.1201C138.913 93.1201 142.357 94.6785 144.82 97.172C147.305 99.7099 148.831 103.161 148.831 107.012Z'
          className='fill-current'
        />
        <path
          d='M193.667 149.066C186.757 149.066 179.826 151.737 174.551 157.08C164.001 167.788 164.001 185.109 174.551 195.795L216.227 238.005V276.431H54.0567V176.471V146.861V130.966C54.0567 86.5071 89.6294 50.4637 133.529 50.4637H136.776C158.726 50.4637 178.583 59.4801 192.969 74.04C207.355 88.6221 216.248 108.725 216.248 130.966L251.756 166.943L261.041 176.337L270.305 185.732V132.636C270.305 94.8334 255.178 60.6155 230.722 35.837C205.938 10.7024 171.608 -4.68121 133.725 -4.30274C60.1816 -3.54581 0 59.2797 0 133.793V201.628V252.053V303.836C0 318.953 12.0974 331.22 27.0283 331.22H243.277C250.731 331.22 257.51 328.17 262.393 323.205C267.101 318.441 270.065 311.94 270.283 304.727V215.32L212.783 157.08C207.508 151.737 200.576 149.066 193.667 149.066Z'
          fill='#F05B22'
        />
        <path
          d='M155.239 306.13V301.5H151.991C151.795 300.053 151.425 298.65 150.902 297.337L153.713 295.689L151.425 291.682L148.635 293.307C147.763 292.172 146.76 291.125 145.627 290.235L147.24 287.407L143.273 285.114L141.681 287.919C140.374 287.363 139 286.984 137.54 286.762V283.578H132.963V286.739C131.502 286.94 130.107 287.296 128.778 287.853L127.252 285.114L123.285 287.43L124.811 290.123C123.655 291.014 122.609 292.06 121.715 293.218L119.078 291.682L116.789 295.689L119.405 297.225C118.86 298.561 118.468 300.008 118.271 301.5H115.024V306.13H118.271C118.468 307.622 118.86 309.047 119.405 310.405L116.593 312.052L118.882 316.06L121.715 314.412C122.609 315.57 123.655 316.616 124.811 317.507L123.176 320.378L127.121 322.694L128.778 319.8C130.107 320.334 131.502 320.712 132.963 320.913V324.297H137.54V320.891C138.979 320.69 140.374 320.289 141.681 319.733L143.382 322.716L147.327 320.401L145.605 317.395C146.738 316.505 147.741 315.481 148.613 314.323L151.599 316.082L153.888 312.074L150.88 310.316C151.403 309.002 151.773 307.622 151.97 306.153H155.239V306.13ZM147.588 303.815C147.588 310.761 142.008 316.416 135.164 316.416C128.298 316.416 122.718 310.761 122.718 303.815C122.718 296.869 128.298 291.214 135.164 291.214C142.008 291.214 147.588 296.869 147.588 303.815Z'
          className='fill-current'
        />
        <path
          d='M381.545 63.5316H445.164V139.439H387.249C379.879 139.439 372.758 138.806 365.866 137.575C358.974 136.327 352.561 133.269 346.626 128.401C339.504 122.575 334.508 115.482 331.656 107.104C328.804 98.7259 327.262 90.149 327.014 81.3549C326.89 79.455 326.873 77.6093 326.926 75.8361C326.979 74.0628 327.067 72.2714 327.191 70.4981C328.502 50.3044 333.994 35.4486 343.668 25.9489C353.341 16.4491 367.868 11.6902 387.232 11.6902L445.146 11.5093V33.6029H387.249C374.529 33.7296 366.309 38.2171 362.571 47.0473C358.833 55.8957 356.955 65.6125 356.955 76.1799C356.955 76.3065 356.955 76.397 356.955 76.4513C356.955 76.5056 356.955 76.596 356.955 76.7227C356.955 87.5253 358.833 96.8621 362.571 104.697C366.309 112.532 374.529 116.459 387.249 116.459L417.544 116.278V86.1681H381.545V63.5316Z'
          className='fill-current'
        />
        <path
          d='M541.045 11.5093L595.575 139.439H565.635L553.871 108.968H498.278L486.868 139.439H458.54L512.539 11.5093H541.045ZM507.012 86.1681H545.137L525.72 36.9867L507.012 86.1681Z'
          className='fill-current'
        />
        <path
          d='M667.574 11.5093C687.062 11.6359 701.607 16.4491 711.227 25.9489C720.847 35.4486 726.303 50.3044 727.614 70.4981C727.738 72.2714 727.827 74.0628 727.88 75.8361C727.933 77.6274 727.916 79.455 727.792 81.3549C727.561 90.149 726.002 98.7259 723.15 107.104C720.298 115.482 715.302 122.575 708.18 128.401C702.351 133.16 696.097 136.182 689.383 137.485C682.668 138.788 675.635 139.439 668.265 139.439H608.934V11.5093H667.574ZM667.043 33.7839H635.862V117.183H667.043C667.273 117.309 667.539 117.363 667.84 117.363C668.141 117.363 668.407 117.363 668.637 117.363C672.552 117.363 676.379 116.983 680.135 116.205C683.873 115.427 687.168 113.437 690.021 110.234C692.873 106.905 694.857 103.159 695.991 99.0154C697.125 94.8536 697.869 90.6375 698.223 86.3672C698.347 84.5939 698.4 82.8025 698.4 81.0292C698.4 79.256 698.4 77.4646 698.4 75.6913C698.4 73.8999 698.4 72.0362 698.4 70.0819C698.4 68.1277 698.276 66.1916 698.046 64.2916C697.816 60.1298 697.125 56.0404 695.991 51.9872C694.857 47.9521 692.873 44.3874 690.021 41.2932C687.168 38.0904 683.873 36.0638 680.135 35.2315C676.397 34.3991 672.57 33.9829 668.637 33.9829C668.389 33.9829 668.123 33.9829 667.84 33.9829C667.539 33.9829 667.273 33.9829 667.043 33.9829V33.7839Z'
          className='fill-current'
        />
        <path
          d='M795.942 63.5316H859.561V139.439H801.647C794.277 139.439 787.155 138.806 780.263 137.575C773.372 136.327 766.959 133.269 761.024 128.401C753.902 122.575 748.906 115.482 746.053 107.104C743.201 98.7259 741.66 90.149 741.412 81.3549C741.288 79.455 741.27 77.6093 741.323 75.8361C741.376 74.0628 741.465 72.2714 741.589 70.4981C742.9 50.3044 748.392 35.4486 758.065 25.9489C767.738 16.4491 782.265 11.6902 801.629 11.6902L859.543 11.5093V33.6029H801.629C788.909 33.7296 780.689 38.2171 776.95 47.0473C773.212 55.8957 771.334 65.6125 771.334 76.1799C771.334 76.3065 771.334 76.397 771.334 76.4513C771.334 76.5056 771.334 76.596 771.334 76.7227C771.334 87.5253 773.212 96.8621 776.95 104.697C780.689 112.532 788.909 116.459 801.629 116.459L831.924 116.278V86.1681H795.925V63.5316H795.942Z'
          className='fill-current'
        />
        <path
          d='M911.719 41.7094C906.847 46.8845 904.118 54.2128 903.516 63.7126L977.995 63.5316V85.8063H903.339C903.339 90.3299 903.835 94.6546 904.845 98.8164C905.855 102.978 907.91 106.778 910.992 110.216C913.721 113.419 916.963 115.409 920.701 116.187C924.439 116.965 928.266 117.345 932.199 117.345C932.429 117.345 932.695 117.345 932.996 117.345C933.297 117.345 933.563 117.345 933.793 117.345L977.977 117.164V139.439H932.535C925.289 139.439 918.309 138.788 911.595 137.485C904.88 136.182 898.556 133.16 892.621 128.401C885.499 122.575 880.503 115.482 877.65 107.104C874.798 98.7259 873.257 90.149 873.027 81.3549C872.903 79.455 872.867 77.6093 872.938 75.8361C872.991 74.0628 873.08 72.2714 873.204 70.4981C874.515 50.3044 880.007 35.4486 889.68 25.9489C899.353 16.4491 913.88 11.6902 933.244 11.6902L977.96 11.5093V33.7839H933.775C923.961 33.8925 916.591 36.5343 911.719 41.7094Z'
          className='fill-current'
        />
        <path
          d='M991.389 33.9646V11.6899H1101.87V33.9646H1060.36V139.457H1032.56V33.9646H991.389Z'
          className='fill-current'
        />
        <path
          d='M358.724 202.717L407.713 291.054L406.554 202.717H432.217V325.634H403.058L351.566 232.672L352.726 325.634H326.897V202.717H358.724Z'
          className='fill-current'
        />
        <path
          d='M448.218 236.949C451.101 227.926 455.359 220.589 460.959 214.956C466.575 209.306 473.931 205.29 483.043 202.89C486.373 202.091 489.819 201.465 493.381 201.013C496.943 200.561 500.489 200.335 504.051 200.335C507.828 200.23 511.655 200.387 515.548 200.856C519.442 201.308 523.153 202.056 526.715 203.082C535.595 205.359 542.885 209.358 548.551 215.06C554.217 220.763 558.375 228.134 561.043 237.14C562.153 241.243 563.014 245.59 563.627 250.145C564.24 254.717 564.538 259.272 564.538 263.845C564.538 268.747 564.257 273.546 563.71 278.223C563.147 282.899 562.269 287.35 561.043 291.575C558.375 300.824 554.151 308.265 548.385 313.915C542.603 319.566 535.164 323.478 526.052 325.651C522.49 326.555 518.829 327.215 515.051 327.615C511.274 328.015 507.447 328.224 503.554 328.224C500.108 328.224 496.662 327.998 493.216 327.546C489.77 327.094 486.39 326.45 483.043 325.668C474.047 323.495 466.658 319.583 460.876 313.933C455.094 308.282 450.886 300.841 448.218 291.592C447.108 287.593 446.247 283.264 445.634 278.588C445.021 273.911 444.723 269.165 444.723 264.384C444.723 259.585 445.004 254.821 445.551 250.092C446.098 245.364 446.992 241.052 448.218 237.175V236.949ZM474.213 245.694C473.434 248.771 472.887 251.883 472.539 255.03C472.208 258.177 472.042 261.271 472.042 264.366C472.042 267.565 472.241 270.729 472.622 273.859C473.003 277.006 473.533 280.048 474.213 283.021C475.439 288.271 477.46 292.844 480.293 296.721C483.126 300.598 487.102 303.449 492.205 305.275C494.094 305.953 496.098 306.474 498.202 306.822C500.306 307.17 502.427 307.344 504.531 307.344C506.635 307.344 508.756 307.17 510.86 306.822C512.964 306.474 514.969 305.97 516.857 305.275C521.96 303.449 525.969 300.598 528.852 296.721C531.735 292.844 533.74 288.271 534.85 283.021C535.512 280.048 536.042 277.006 536.44 273.859C536.821 270.729 537.02 267.548 537.02 264.366C537.02 261.289 536.821 258.177 536.44 255.03C536.042 251.883 535.529 248.841 534.85 245.868C533.74 240.617 531.735 236.027 528.852 232.081C525.969 228.152 521.96 225.318 516.857 223.597C514.969 222.919 512.964 222.397 510.86 222.049C508.756 221.702 506.635 221.528 504.531 221.528C502.427 221.528 500.306 221.702 498.202 222.049C496.098 222.397 494.094 222.901 492.205 223.597C487.102 225.422 483.143 228.273 480.376 232.15C477.592 236.027 475.538 240.6 474.213 245.85V245.694Z'
          className='fill-current'
        />
        <path
          d='M559.272 202.717H587.602L623.603 294.305L660.432 202.717H687.255L637.271 325.634H611.277L559.272 202.717Z'
          className='fill-current'
        />
        <path
          d='M731.84 202.717L782.835 325.634H754.836L743.835 296.356H691.846L681.177 325.634H654.686L705.183 202.717H731.84ZM700.014 274.45H735.667L717.509 227.196L700.014 274.45Z'
          className='fill-current'
        />
      </g>
      <defs>
        <clipPath id='clip0_289_1529'>
          <rect width='1126.94' height='335.5' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
);
SiteLogo.displayName = 'SiteLogo';

const SiteEmblem = React.forwardRef<SVGElement, SVGAttributes>(
  ({ className, ...props }, ref) => (
    <svg
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 -4.32 270.33 335.55'
      {...props}
    >
      <g clipPath='url(#a)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M148.831 107.012v26.203c0 7.659-6.125 13.892-13.71 13.892-7.564 0-13.711-6.211-13.711-13.892v-26.203c0-7.68 6.147-13.892 13.711-13.892 3.792 0 7.236 1.558 9.699 4.052a13.98 13.98 0 0 1 4.011 9.84'
          className='fill-current'
        />
        <path
          d='M193.667 149.066a26.8 26.8 0 0 0-19.116 8.014c-10.55 10.708-10.55 28.029 0 38.715l41.676 42.21v38.426H54.057V130.966c0-44.459 35.572-80.502 79.472-80.502h3.247c21.95 0 41.807 9.016 56.193 23.576 14.386 14.582 23.279 34.685 23.279 56.926l35.508 35.977 9.285 9.394 9.264 9.395v-53.096c0-37.803-15.127-72.02-39.583-96.799-24.784-25.135-59.114-40.518-96.997-40.14C60.182-3.546 0 59.28 0 133.793v170.043c0 15.117 12.097 27.384 27.028 27.384h216.249c7.454 0 14.233-3.05 19.116-8.015 4.708-4.764 7.672-11.265 7.89-18.478V215.32l-57.5-58.24a26.8 26.8 0 0 0-19.116-8.014'
          fill='#F05B22'
        />
        <path
          d='M155.239 306.13v-4.63h-3.248a17.7 17.7 0 0 0-1.089-4.163l2.811-1.648-2.288-4.007-2.79 1.625a17.3 17.3 0 0 0-3.008-3.072l1.613-2.828-3.967-2.293-1.592 2.805a17 17 0 0 0-4.141-1.157v-3.184h-4.577v3.161c-1.461.201-2.856.557-4.185 1.114l-1.526-2.739-3.967 2.316 1.526 2.693a17.2 17.2 0 0 0-3.096 3.095l-2.637-1.536-2.289 4.007 2.616 1.536a17.4 17.4 0 0 0-1.134 4.275h-3.247v4.63h3.247a17.7 17.7 0 0 0 1.134 4.275l-2.812 1.647 2.289 4.008 2.833-1.648a17.2 17.2 0 0 0 3.096 3.095l-1.635 2.871 3.945 2.316 1.657-2.894c1.329.534 2.724.912 4.185 1.113v3.384h4.577v-3.406a16.4 16.4 0 0 0 4.141-1.158l1.701 2.983 3.945-2.315-1.722-3.006a16.6 16.6 0 0 0 3.008-3.072l2.986 1.759 2.289-4.008-3.008-1.758a17.5 17.5 0 0 0 1.09-4.163h3.269zm-7.651-2.315c0 6.946-5.58 12.601-12.424 12.601-6.866 0-12.446-5.655-12.446-12.601s5.58-12.601 12.446-12.601c6.844 0 12.424 5.655 12.424 12.601'
          className='fill-current'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h1126.94v335.5H0z' />
        </clipPath>
      </defs>
    </svg>
  )
);
SiteEmblem.displayName = 'SiteEmblem';

export { SiteLogo, SiteEmblem };
