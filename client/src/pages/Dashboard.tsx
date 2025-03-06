import { DocsTab } from "@/components/docs/DocsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <nav className="sticky top-0 z-50 border-b backdrop-blur-xl bg-white/75 border-gray-200/20">
        <div className="max-w-6xl px-6 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl tracking-tight text-gray-900 font-extralight">
                Research Management
              </h1>
              <span className="hidden text-sm font-light text-gray-500 sm:inline">
                /
              </span>
              <span className="hidden text-sm font-light text-gray-500 sm:inline">
                Dashboard
              </span>
            </div>
          </div>
        </div>
      </nav>
      <main className="w-full px-6 py-8 mx-auto">
        <div className="space-y-8">
          <div className="flex items-center justify-center w-full p-6">
            <Tabs defaultValue="timeline" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="documents">
                <DocsTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};
