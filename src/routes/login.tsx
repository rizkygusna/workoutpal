import { LoginForm } from '@/features/auth/components/LoginForm';
import { createFileRoute } from '@tanstack/react-router';

export default function AuthenticationPage() {
  return (
    <>
      <div className="md:hidden">
        {/* <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        /> */}
      </div>
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* <Link
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8'
          )}
        >
          Login
        </Link> */}
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            Workoutpal
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                Simplify fitness tracking with our easy-to-use workout log app. <br />
                Lift smarter, and harder.
              </p>
            </blockquote>
          </div>
        </div>
        <div className="h-full pt-[20vh] lg:p-8 lg:flex lg:flex-col lg:justify-center">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}

export const Route = createFileRoute('/login')({
  component: AuthenticationPage,
});
