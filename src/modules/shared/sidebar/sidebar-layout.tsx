import { Separator } from "@/components/ui/separator";
import { Sidebar } from "./sidebar";

type Props = {
  children: React.ReactNode;
};

const AccountSidebarLayout = ({ children }: Props) => {
  return (
    <div className="space-y-6 pt-12 md:pt-24 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-xl font-semibold">Account</h2>
        <p className="text-muted-foreground">
          Manage your account and settings.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <Sidebar />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
};

export default AccountSidebarLayout;
