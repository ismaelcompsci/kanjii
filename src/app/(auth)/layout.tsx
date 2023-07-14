interface RootLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: RootLayoutProps) {
  return <>{children}</>
}
