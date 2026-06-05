"use client";

import AppShell from "@/components/AppShell";
import LoadingState from "@/components/LoadingState";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import BrandingSettings from "./BrandingSettings";
import GeneralSettings from "./GeneralSettings";
import SecuritySettings from "./SecuritySettings";
import SMTPSettings from "./SMTPSettings";
import { useSettings, useSettingsMutations } from "./settings";

export default function SettingsView() {
  const { data = {}, isLoading } = useSettings();
  const { saveSetting } = useSettingsMutations();
  return (
    <AppShell>
      <PageHeader eyebrow="Administration" title="Settings" description="General, branding, SMTP, and security controls for the platform." action={<Button onClick={() => saveSetting.mutate({ category: "APPLICATION", key: "app_name", value: { name: "SaaS Admin" }, is_secret: false })}>Save Snapshot</Button>} />
      {isLoading ? <LoadingState label="Loading settings" /> : (
        <Card>
          <Tabs defaultValue="general">
            <TabsList><TabsTrigger value="general">General</TabsTrigger><TabsTrigger value="branding">Branding</TabsTrigger><TabsTrigger value="smtp">SMTP</TabsTrigger><TabsTrigger value="security">Security</TabsTrigger></TabsList>
            <TabsContent value="general"><GeneralSettings values={data.APPLICATION} /></TabsContent>
            <TabsContent value="branding"><BrandingSettings values={data.BRANDING} /></TabsContent>
            <TabsContent value="smtp"><SMTPSettings values={data.SMTP} /></TabsContent>
            <TabsContent value="security"><SecuritySettings values={data.SECURITY} /></TabsContent>
          </Tabs>
        </Card>
      )}
    </AppShell>
  );
}
