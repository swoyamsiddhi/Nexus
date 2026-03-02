import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Settings, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default async function AdminSettingsPage() {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "ADMIN") redirect("/auth/signin");

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 lg:px-8 space-y-6">
            <div>
                <h1 className="text-2xl font-display font-bold">Platform Settings</h1>
                <p className="text-sm text-muted-foreground mt-1">Configure global platform rules and integrations</p>
            </div>

            <div className="nexus-card p-6 space-y-6">
                <h2 className="text-lg font-semibold border-b pb-4">Authentication Rules</h2>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Allowed College Domains</Label>
                        <Input defaultValue="@mycollege.edu, @alumni.mycollege.edu" />
                        <p className="text-[10px] text-muted-foreground">Comma separated domains allowed for registration</p>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-xl">
                        <div>
                            <h3 className="font-medium text-sm">Auto-Approve Students</h3>
                            <p className="text-xs text-muted-foreground">Bypass manual review for @mycollege.edu student emails</p>
                        </div>
                        <div className="w-10 h-6 bg-green-500 rounded-full relative cursor-pointer">
                            <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white gap-2">
                    <Save className="w-4 h-4" /> Save Changes
                </Button>
            </div>
        </div>
    );
}
