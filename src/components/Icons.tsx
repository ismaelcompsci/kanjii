import {
  ArrowRight,
  CreditCard,
  LucideProps,
  Moon,
  Package,
  Settings,
  Star,
  SunMedium,
  Twitter,
  User,
  type Icon as LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  user: User,
  sun: SunMedium,
  moon: Moon,
  twitter: Twitter,
  settings: Settings,
  billing: CreditCard,
  arrowRight: ArrowRight,
  package: Package,
  like: Star,
  logo: (props: LucideProps) => (
    <svg
      viewBox="0 0 109 109"
      width="109"
      height="109"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        id="kvg:StrokePaths_0788c"
        style={{
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 3,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
      >
        <g id="kvg:0788c">
          <g id="kvg:0788c-g1">
            <path
              id="kvg:0788c-s1"
              d="M10.63,24.68c0.69,0.13,1.97,0.17,2.66,0.13c8.7-0.47,14.79-1.46,26.41-2.27c1.15-0.08,1.85,0.06,2.43,0.13"
            />
            <path
              id="kvg:0788c-s2"
              d="M25.45,26.68c0.05,0.86,0.1,2.22-0.1,3.46C24.16,37.43,17.34,53.45,8,63.25"
            />
            <g id="kvg:0788c-g2">
              <path
                id="kvg:0788c-s3"
                d="M18.48,51.79c0.26,0.51,0.53,0.93,0.64,1.56c0.9,5.02,1.49,18.87,2.1,27.89"
              />
              <path
                id="kvg:0788c-s4"
                d="M20.23,52.62C27,51,33.84,50.04,37.1,49.49c1.19-0.2,1.9,1.19,1.73,2.36C38.13,56.72,37.05,69.27,36,76"
              />
              <path
                id="kvg:0788c-s5"
                d="M21.59,78.09c4.91-0.84,9.41-1.59,16.35-1.64"
              />
            </g>
          </g>
          <g id="kvg:0788c-g3">
            <g id="kvg:0788c-g4">
              <path
                id="kvg:0788c-s6"
                d="M59.31,11.5c0.69,0.93,0.71,2.72,0.35,4.19c-1.73,6.98-2.61,9.47-4.78,14.8c-0.6,1.49-0.78,2.88,1.48,2.73c6.69-0.46,11.56-1.32,22.02-1.9"
              />
              <path
                id="kvg:0788c-s7"
                d="M59.53,19.36c2.97-0.18,17.38-2.27,20.09-2.48c2.26-0.17,3.18,1.01,2.81,2.28c-1.39,4.7-1.55,8.65-5.54,23.23"
              />
              <path
                id="kvg:0788c-s8"
                d="M45.44,44.92c1.03,0.33,2.93,0.36,3.96,0.33c10.95-0.31,34.2-3.6,45.05-3.13c1.72,0.07,2.76,0.16,3.62,0.32"
              />
            </g>
            <g id="kvg:0788c-g5">
              <path
                id="kvg:0788c-s9"
                d="M68.77,46.33c0.09,0.48,1.26,2.49,1.26,5.52c0,18.15-0.26,34.66-0.26,39.62c0,10.53-7.21,1.5-8.71,0.25"
              />
              <path id="kvg:0788c-s10" d="M49.5,55.75c3,1.59,7.75,6.53,8.5,9" />
              <path
                id="kvg:0788c-s11"
                d="M44,83.1c1.57,1.66,2.88,2.36,4.45,0.95c0.93-0.84,8.88-7.77,12.8-11.79"
              />
              <path
                id="kvg:0788c-s12"
                d="M88.78,50.14c0.03,0.28,0.06,0.73-0.05,1.14c-0.66,2.41-4.46,7.7-9.66,10.93"
              />
              <path
                id="kvg:0788c-s13"
                d="M71,59c3.5,6,16.5,22.5,22.36,27.65c1.41,1.23,2.36,1.96,3.64,2.35"
              />
            </g>
          </g>
        </g>
      </g>
    </svg>
  ),
  gitHub: (props: LucideProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),
  google: (props: LucideProps) => (
    <svg {...props} viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  ),
  avatar: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
}
